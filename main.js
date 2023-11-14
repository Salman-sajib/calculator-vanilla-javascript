import { initModeToggle } from "./modeToggle";

initModeToggle();

const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

updateDisplay("0");

keys.addEventListener("click", handleKeyClick);

function handleKeyClick(event) {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === "number" || type === "decimal") {
    handleNumberClick(keyValue, displayValue, previousKeyType);
  }

  if (type === "operator") {
    handleOperatorClick(key, displayValue);
  }

  if (type === "equal") {
    handleEqualClick(displayValue);
  }

  if (type === "clear") {
    handleClearClick();
  }

  calculator.dataset.previousKeyType = type;
}

function updateDisplay(value) {
  // Limit the display to 10 digits.
  value = value.slice(0, 10);
  display.textContent = value;
}

function handleNumberClick(keyValue, displayValue, previousKeyType) {
  if (
    displayValue === "0" ||
    previousKeyType === "equal" ||
    previousKeyType === "operator"
  ) {
    updateDisplay(keyValue);
  } else {
    if (keyValue === "." && displayValue.includes(".")) {
      return;
    }
    updateDisplay(displayValue + keyValue);
  }
}

function handleOperatorClick(key, displayValue) {
  clearStateFromOperator();
  key.dataset.state = "selected";

  calculator.dataset.firstNumber = displayValue;
  calculator.dataset.operator = key.dataset.key;
}

function handleEqualClick(displayValue) {
  const firstNumber = calculator.dataset.firstNumber;
  const operator = calculator.dataset.operator;
  const secondNumber = displayValue;

  if (firstNumber && operator) {
    const result = calculate(firstNumber, operator, secondNumber);
    updateDisplay(result);
    calculator.dataset.firstNumber = result;
    calculator.dataset.operator = "";
  }
  clearStateFromOperator();
}

function handleClearClick() {
  updateDisplay("0");
  calculator.dataset.firstNumber = "";
  calculator.dataset.operator = "";
  clearStateFromOperator();
}

function clearStateFromOperator() {
  const operatorKeys = keys.querySelectorAll(`[data-type="operator"]`);
  operatorKeys.forEach((el) => {
    el.dataset.state = "";
  });
}

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  let result = 0;
  if (operator === "plus") result = firstNumber + secondNumber;
  if (operator === "minus") result = firstNumber - secondNumber;
  if (operator === "times") result = firstNumber * secondNumber;
  if (operator === "divide") result = firstNumber / secondNumber;

  // Limit the result to 10 digits and remove trailing zeros.
  result = result.toFixed(10).replace(/\.?0+$/, "");

  return result;
}
