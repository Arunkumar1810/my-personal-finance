def calculate_discrepancy(gtt_orders, holdings):
    holdings_qty_map = {h["tradingsymbol"]: h["quantity"] for h in holdings} if holdings else {}
    holdings_ltp_map = {h["tradingsymbol"]: h.get("last_price", 0) for h in holdings} if holdings else {}
    holdings_avg_price_map = {h["tradingsymbol"]: h.get("average_price", 0) for h in holdings} if holdings else {}
    
    enriched_gtts = []
    if not gtt_orders:
        return enriched_gtts

    for gtt in gtt_orders:
        condition = gtt.get("condition", {})
        tradingsymbol = condition.get("tradingsymbol", "")
        
        # Calculate total trigger quantity for SELL orders in this GTT
        trigger_qty = 0
        orders = gtt.get("orders", [])
        sell_quantities = [order.get("quantity", 0) for order in orders if order.get("transaction_type") == "SELL"]
        
        if len(sell_quantities) > 1:
            trigger_qty = max(sell_quantities)
        else:
            trigger_qty = sum(sell_quantities)
        
        # Discrepancy = max(0, trigger_qty - actual holding)
        actual_holding = holdings_qty_map.get(tradingsymbol, 0)
        missing_units = max(0, trigger_qty - actual_holding)
        
        enriched_gtt = dict(gtt)
        enriched_gtt["discrepancy"] = {
            "trigger_quantity": trigger_qty,
            "actual_holding": actual_holding,
            "missing_units": missing_units
        }
        
        # Closest trigger calculation
        closest_trigger = None
        market_price = holdings_ltp_map.get(tradingsymbol, 0)
        if not market_price:
            # Fallback to last_price in the condition if market_price from holdings is missing
            market_price = condition.get("last_price", 0)

        enriched_gtt["last_price"] = market_price
        enriched_gtt["average_price"] = holdings_avg_price_map.get(tradingsymbol, 0)

        if market_price > 0 and gtt.get("type") == "two-leg":
            trigger_values = condition.get("trigger_values", [])
            if len(trigger_values) >= 2:
                val1, val2 = trigger_values[0], trigger_values[1]
                stop_loss = min(val1, val2)
                target = max(val1, val2)
                
                dist_sl = abs(market_price - stop_loss)
                dist_target = abs(market_price - target)
                
                if dist_sl < dist_target:
                    closest_trigger = "STOP_LOSS"
                    distance = dist_sl
                elif dist_target < dist_sl:
                    closest_trigger = "TARGET"
                    distance = dist_target
                    
        enriched_gtt["closestTrigger"] = closest_trigger
        
        # Calculate ETA
        from atr_cache import get_cached_atr
        atr = get_cached_atr(tradingsymbol)
        if closest_trigger and atr and atr > 0 and 'distance' in locals() and distance is not None:
            # Distance is points. ATR is points/day.
            # ETA in days = distance / atr
            eta_days = distance / atr
            enriched_gtt["eta"] = eta_days
        else:
            enriched_gtt["eta"] = None

        enriched_gtts.append(enriched_gtt)
        
    return enriched_gtts

def merge_holdings_and_positions(holdings, positions):
    unified = {}
    
    for item in (holdings or []):
        ts = item.get("tradingsymbol")
        if not ts:
            continue
        unified[ts] = dict(item)
    
    for item in (positions or []):
        ts = item.get("tradingsymbol")
        if not ts:
            continue
        if ts in unified:
            existing = unified[ts]
            old_qty = existing.get("quantity", 0)
            old_pnl = existing.get("pnl", 0)
            old_avg = existing.get("average_price", 0)
            
            new_qty = item.get("quantity", 0)
            new_pnl = item.get("pnl", 0)
            new_avg = item.get("average_price", 0)
            
            tot_qty = old_qty + new_qty
            if tot_qty != 0:
                tot_avg = ((old_qty * old_avg) + (new_qty * new_avg)) / tot_qty
            else:
                tot_avg = 0
            
            existing["quantity"] = tot_qty
            existing["pnl"] = old_pnl + new_pnl
            existing["average_price"] = tot_avg
        else:
            unified[ts] = dict(item)
            
    return list(unified.values())

def construct_unified_payload(gtt_orders, holdings, positions=None):
    merged_holdings = merge_holdings_and_positions(holdings, positions)
    enriched_gtts = calculate_discrepancy(gtt_orders, merged_holdings)
    return {
        "holdings": merged_holdings,
        "gtt_orders": enriched_gtts
    }
