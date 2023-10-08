# CalorieCounter

# Calorie Calculator Project Technical Specification

## Default State

- Male gender is selected.
- All input fields are set to 0.
- "Minimum" physical activity is selected.
- The "Calculate" button is inactive.
- The button to reset input fields is inactive.
- The calorie information display block is hidden.

## "Calculate" Button

- Becomes active only when all input fields are filled.
- Clicking the button displays a block with calorie information if it hasn't been shown before. If the block is already on the page, clicking the button updates the calculations and displays up-to-date information.

## "Clear Fields and Calculation" Button

- Becomes active when at least one numerical field is filled.
- When clicked, all elements of the application are reset to the default state: numerical fields are cleared (placeholders set to 0), gender is set to male, physical activity is set to "minimum," and the calorie information block is hidden.

## Formulas

### Weight Maintenance

- For women:
  N = (10 × weight in kilograms) + (6.25 × height in centimeters) - (5 × age in years) - 161

- For men:
  N = (10 × weight in kilograms) + (6.25 × height in centimeters) - (5 × age in years) + 5

- The obtained value (N) is multiplied by the activity coefficient, and the result is the calorie norm for weight maintenance.

### Activity Coefficients

- Minimum: 1.2.
- Low: 1.375.
- Moderate: 1.55.
- High: 1.725.
- Very high: 1.9.

### Formulas for Weight Gain and Loss

- Weight gain: add 15% of the norm to this norm.
- Weight loss: subtract 15% of the norm from this norm.
