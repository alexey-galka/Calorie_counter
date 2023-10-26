const $countButton: HTMLElement = document.querySelector(
  '.form__submit-button'
) as HTMLElement;
const $clearButton: HTMLElement = document.querySelector(
  '.form__reset-button'
) as HTMLElement;
const $ageInput: HTMLInputElement = document.forms.counter.elements
  .age as HTMLInputElement;
const $heightInput: HTMLInputElement = document.forms.counter.elements
  .height as HTMLInputElement;
const $weightInput: HTMLInputElement = document.forms.counter.elements
  .weight as HTMLInputElement;
const $sex: HTMLSelectElement = document.forms.counter.elements
  .gender as HTMLSelectElement;
const $results: HTMLElement = document.querySelector(
  '.counter__result'
) as HTMLElement;
const $activity: HTMLSelectElement = document.forms.counter.elements
  .activity as HTMLSelectElement;
const $caloriesNormal: HTMLElement = document.getElementById(
  'calories-norm'
) as HTMLElement;
const $caloriesMin: HTMLElement = document.getElementById(
  'calories-minimal'
) as HTMLElement;
const $caloriesMax: HTMLElement = document.getElementById(
  'calories-maximal'
) as HTMLElement;

interface Activity {
  [key: string]: number;
}

const ACTIVITY: Activity = {
  min: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.725,
  max: 1.9,
};

// Start of inputs validation
function checkInput(): void {
  if (
    !isNaN(Number($ageInput.value)) &&
    !isNaN(Number($heightInput.value)) &&
    !isNaN(Number($weightInput.value))
  ) {
    if (
      $ageInput.value !== '' &&
      $heightInput.value !== '' &&
      $weightInput.value !== ''
    ) {
      $countButton.removeAttribute('disabled');
    } else {
      $countButton.setAttribute('disabled', 'true');
    }
  }
}

$ageInput.addEventListener('input', checkInput);
$heightInput.addEventListener('input', checkInput);
$weightInput.addEventListener('input', checkInput);
// End of inputs validation

// Start of clear fields
function checkClearInputs(): void {
  if (
    $ageInput.value !== '' ||
    $heightInput.value !== '' ||
    $weightInput.value !== ''
  ) {
    $clearButton.removeAttribute('disabled');
  } else {
    $clearButton.setAttribute('disabled', 'true');
  }
}

$ageInput.addEventListener('input', checkClearInputs);
$heightInput.addEventListener('input', checkClearInputs);
$weightInput.addEventListener('input', checkClearInputs);
$clearButton.addEventListener('click', () => {
  $clearButton.setAttribute('disabled', 'true');
  $countButton.setAttribute('disabled', 'true');
  $results.classList.add('counter__result--hidden');
  $heightInput.value = '';
  $weightInput.value = '';
  $ageInput.value = '';
  $sex.value = 'male';
  $activity.value = 'min';
});
// End of clear fields

// Start of displaying of results
$countButton.addEventListener('click', () => {
  $results.classList.remove('counter__result--hidden');
  $caloriesNormal.textContent = calcNormalWeight($sex.value);
  $caloriesMin.textContent = getLoseWeight(calcNormalWeight($sex.value));
  $caloriesMax.textContent = getGainWight(calcNormalWeight($sex.value));
});
// End of displaying of results

// Start of get activity level
function getActivity(level: string): number | null {
  return ACTIVITY[level] || null;
}
// End of get activity level

// Start of weight maintenance
function calcNormalWeight(sex: string): string {
  const COUNT: number =
    10 * Number($weightInput.value) +
    6.25 * Number($heightInput.value) -
    5 * Number($ageInput.value);
  const activityLevel = $activity.value;

  if (sex === 'female') {
    return ((COUNT - 161) * getActivity(activityLevel)!).toFixed();
  }
  return ((COUNT + 5) * getActivity(activityLevel)!).toFixed();
}
// End of weight maintenance

// Start of gain and lose weight funcs
function getGainWight(func: string): string {
  return (parseFloat(func) * 1.15).toFixed();
}

function getLoseWeight(func: string): string {
  return (parseFloat(func) * 0.85).toFixed();
}
// End of gain and lose weight funcs
