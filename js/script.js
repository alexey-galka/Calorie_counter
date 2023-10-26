"use strict";
const $countButton = document.querySelector('.form__submit-button');
const $clearButton = document.querySelector('.form__reset-button');
const $ageInput = document.forms.counter.elements
    .age;
const $heightInput = document.forms.counter.elements
    .height;
const $weightInput = document.forms.counter.elements
    .weight;
const $sex = document.forms.counter.elements
    .gender;
const $results = document.querySelector('.counter__result');
const $activity = document.forms.counter.elements
    .activity;
const $caloriesNormal = document.getElementById('calories-norm');
const $caloriesMin = document.getElementById('calories-minimal');
const $caloriesMax = document.getElementById('calories-maximal');
const ACTIVITY = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9,
};

// Start of inputs validation
function checkInput() {
    if (!isNaN(Number($ageInput.value)) &&
        !isNaN(Number($heightInput.value)) &&
        !isNaN(Number($weightInput.value))) {
        if ($ageInput.value !== '' &&
            $heightInput.value !== '' &&
            $weightInput.value !== '') {
            $countButton.removeAttribute('disabled');
        }
        else {
            $countButton.setAttribute('disabled', 'true');
        }
    }
}
$ageInput.addEventListener('input', checkInput);
$heightInput.addEventListener('input', checkInput);
$weightInput.addEventListener('input', checkInput);
// End of inputs validation

// Start of clear fields
function checkClearInputs() {
    if ($ageInput.value !== '' ||
        $heightInput.value !== '' ||
        $weightInput.value !== '') {
        $clearButton.removeAttribute('disabled');
    }
    else {
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
function getActivity(level) {
    return ACTIVITY[level] || null;
}
// End of get activity level

// Start of weight maintenance
function calcNormalWeight(sex) {
    const COUNT = 10 * Number($weightInput.value) +
        6.25 * Number($heightInput.value) -
        5 * Number($ageInput.value);
    const activityLevel = $activity.value;
    if (sex === 'female') {
        return ((COUNT - 161) * getActivity(activityLevel)).toFixed();
    }
    return ((COUNT + 5) * getActivity(activityLevel)).toFixed();
}
// End of weight maintenance

// Start of gain and lose weight funcs
function getGainWight(func) {
    return (parseFloat(func) * 1.15).toFixed();
}

function getLoseWeight(func) {
    return (parseFloat(func) * 0.85).toFixed();
}
// End of gain and lose weight funcs
