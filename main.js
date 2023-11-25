// Initialize mode toggle functionality
import { initModeToggle } from "./modeToggle";
const body = document.querySelector("body");
const toggleButton = document.querySelector(".btn-toggle");
initModeToggle(body, toggleButton);

// Calculator elements
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

// Set initial display value
updateDisplay("0");

// Event listener for key clicks
keys.addEventListener("click", handleKeyClick);

function handleKeyClick(event) {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  // Handle number and decimal key clicks
  if (type === "number" || type === "decimal") {
    handleNumberClick(keyValue, displayValue, previousKeyType);
  }

  // Handle operator key click
  if (type === "operator") {
    handleOperatorClick(key, displayValue);
  }

  // Handle equal key click
  if (type === "equal") {
    handleEqualClick(displayValue);
  }

  // Handle clear key click
  if (type === "clear") {
    handleClearClick();
  }

  // Update the previous key type
  calculator.dataset.previousKeyType = type;
}

// Update display with a given value
function updateDisplay(value) {
  // Limit the display to 10 digits
  value = value.slice(0, 10);
  display.textContent = value;
}

// Handle number key clicks
function handleNumberClick(keyValue, displayValue, previousKeyType) {
  if (
    displayValue === "0" ||
    previousKeyType === "equal" ||
    previousKeyType === "operator"
  ) {
    updateDisplay(keyValue);
  } else {
    // Avoid appending a decimal point if it already exists
    if (keyValue === "." && displayValue.includes(".")) {
      return;
    }
    updateDisplay(displayValue + keyValue);
  }
}

// Handle operator key click
function handleOperatorClick(key, displayValue) {
  clearStateFromOperator();
  key.dataset.state = "selected";

  // Store the first number and operator in dataset attributes
  calculator.dataset.firstNumber = displayValue;
  calculator.dataset.operator = key.dataset.key;
}

// Handle equal key click
function handleEqualClick(displayValue) {
  const firstNumber = calculator.dataset.firstNumber;
  const operator = calculator.dataset.operator;
  const secondNumber = displayValue;

  if (firstNumber && operator) {
    // Perform the calculation, update display, and clear operator state
    const result = calculate(firstNumber, operator, secondNumber);
    updateDisplay(result);
    calculator.dataset.firstNumber = result;
    calculator.dataset.operator = "";
  }
  clearStateFromOperator();
}

// Handle clear key click
function handleClearClick() {
  // Reset display and clear dataset attributes and operator state
  updateDisplay("0");
  calculator.dataset.firstNumber = "";
  calculator.dataset.operator = "";
  clearStateFromOperator();
}

// Clear the selected state from operator keys
function clearStateFromOperator() {
  const operatorKeys = keys.querySelectorAll(`[data-type="operator"]`);
  operatorKeys.forEach((el) => {
    el.dataset.state = "";
  });
}

// Perform the calculation based on the operator
function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  let result = 0;
  // Perform the calculation based on the operator type
  if (operator === "plus") result = firstNumber + secondNumber;
  if (operator === "minus") result = firstNumber - secondNumber;
  if (operator === "times") result = firstNumber * secondNumber;
  if (operator === "divide") result = firstNumber / secondNumber;

  // Limit the result to 10 digits and remove trailing zeros
  result = result.toFixed(10).replace(/\.?0+$/, "");

  return result;
}
