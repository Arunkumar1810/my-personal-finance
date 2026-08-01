## ADDED Requirements

### Requirement: GttProgressBar Component
The system SHALL display a read-only GttProgressBar component for Sell GTT orders. It MUST include a horizontal track, fixed vertical markers for Stoploss, Buy Price, and Target, and a dynamic fill representing the Current Price.

#### Scenario: Visualizing a trade in profit
- **WHEN** the Current Price is strictly greater than the Buy Price
- **THEN** the dynamic fill crosses to the right of the Buy Price marker
- **AND** the fill color is Success (Green).

#### Scenario: Visualizing a trade in loss
- **WHEN** the Current Price is less than the Buy Price
- **THEN** the dynamic fill is to the left of the Buy Price marker
- **AND** the fill color is Danger (Red).

### Requirement: Colorblind-First Accessibility
The system SHALL ensure the GttProgressBar is accessible to colorblind users by not relying solely on Red/Green color coding.

#### Scenario: Accessible data representation
- **WHEN** the GttProgressBar is rendered
- **THEN** it must use textures (e.g., hatched for loss, solid for profit) or clear directional arrows
- **AND** the actual price numbers must be explicitly visible alongside or above the visual bar.

### Requirement: Hover Interaction
The system SHALL display a subtle progress bar by default that expands into a rich, detailed visualization showing specific prices on hover.

#### Scenario: User hovers over the progress bar
- **WHEN** the user hovers the cursor over the GttProgressBar
- **THEN** a tooltip or expanded detailed view appears, displaying the exact Stoploss, Buy, Target, and Current Prices.
