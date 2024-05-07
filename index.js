/** Grab buttons for later */
const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const plus = document.getElementById('plus');
const minus = document.getElementById('minus');
const times = document.getElementById('times');
const over = document.getElementById('over');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const display = document.getElementById('display');

let displayVal = '5318008';

display.textContent = displayVal;

/** Arithmetic helpers */
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

/** Identify requested operation and call helper */
const operate = (operator, num1, num2) => {
  switch (operator) {
    case ('+'):
      return add(num1, num2);
    case ('-'):
      return subtract(num1, num2);
    case ('x'):
      return multiply(num1, num2);
    case ('÷'):
      return divide(num1, num2);
    default:
      console.log('OOPS');
  }
};