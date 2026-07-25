## 1. UI Components Updates

- [x] 1.1 Add progress bar logic to calculate percentage distance to Target or Stop-Loss in the Trade Table Component
- [x] 1.2 Render the progress bar visually with Tailwind (green for Target, red for Stop-Loss)

## 2. Sabotage Warning and Override

- [x] 2.1 Update Trade Table row styles to pulse and turn red if `isSabotaged` is true
- [x] 2.2 Add an "Override" button to the trade row that shows only when `isSabotaged` is true
- [x] 2.3 Implement the state management to dismiss the warning when "Override" is clicked
