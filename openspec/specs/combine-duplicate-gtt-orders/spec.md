# Capability: combine-duplicate-gtt-orders

## Purpose
TBD

## Requirements

### Requirement: Consolidate Identical GTT Orders
The system SHALL aggregate multiple GTT orders for the same instrument into a single combined order if they share the exact same trigger conditions (prices) and order type. The combined order MUST display the sum of the quantities of the individual orders.

#### Scenario: Multiple GTT orders with identical triggers
- **WHEN** the system receives multiple GTT orders for the same `tradingsymbol` that have identical `type` (e.g., two-leg) and identical `trigger_values`
- **THEN** it must combine them into a single GTT order representation
- **AND** the quantity of this combined order must be the sum of the quantities of the original matching orders.

#### Scenario: GTT orders with different triggers
- **WHEN** the system receives multiple GTT orders for the same `tradingsymbol` but they have different `trigger_values` or `type`
- **THEN** they MUST NOT be combined and should remain as separate orders.
