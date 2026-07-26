import unittest
from .dev_adapter import DevModeKiteAdapter

class TestDevModeKiteAdapterSchema(unittest.TestCase):
    def setUp(self):
        self.adapter = DevModeKiteAdapter()

    def test_holdings_schema(self):
        holdings = self.adapter.holdings()
        self.assertIsInstance(holdings, list)
        self.assertGreater(len(holdings), 0)
        
        expected_keys = {
            "tradingsymbol", "exchange", "instrument_token", "isin", "product",
            "price", "quantity", "t1_quantity", "realised_quantity",
            "authorised_quantity", "opening_quantity", "short_quantity",
            "collateral_quantity", "collateral_type", "discrepancy",
            "average_price", "last_price", "close_price", "pnl",
            "day_change", "day_change_percentage"
        }
        
        for item in holdings:
            self.assertTrue(expected_keys.issubset(item.keys()), f"Missing keys in holding: {expected_keys - item.keys()}")

    def test_positions_schema(self):
        positions = self.adapter.positions()
        self.assertIsInstance(positions, dict)
        self.assertIn("net", positions)
        self.assertIn("day", positions)
        self.assertIsInstance(positions["net"], list)
        self.assertIsInstance(positions["day"], list)

    def test_gtts_schema(self):
        gtts = self.adapter.get_gtts()
        self.assertIsInstance(gtts, list)
        self.assertGreater(len(gtts), 0)
        
        expected_keys = {"id", "condition", "type", "status", "orders"}
        for item in gtts:
            self.assertTrue(expected_keys.issubset(item.keys()), f"Missing keys in gtt: {expected_keys - item.keys()}")
            
            # check condition
            condition_keys = {"exchange", "tradingsymbol", "trigger_values", "last_price"}
            self.assertTrue(condition_keys.issubset(item["condition"].keys()))
            
            # check orders
            self.assertIsInstance(item["orders"], list)
            if item["orders"]:
                order_keys = {"exchange", "tradingsymbol", "product", "order_type", "transaction_type", "quantity", "price"}
                self.assertTrue(order_keys.issubset(item["orders"][0].keys()))

    def test_historical_data_schema(self):
        # We pass dummy data for arguments as it's a mock
        data = self.adapter.historical_data(12345, "2023-10-01", "2023-10-15", "day")
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        
        expected_keys = {"date", "open", "high", "low", "close", "volume"}
        for item in data:
            self.assertTrue(expected_keys.issubset(item.keys()), f"Missing keys in historical data: {expected_keys - item.keys()}")

if __name__ == '__main__':
    unittest.main()
