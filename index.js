/** Grab buttons for later */

const nums = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.op');
const dot = document.querySelector('.dot');
const enter = document.querySelector('.enter');
const clear = document.getElementById('clear');
const back = document.getElementById('back');
const display = document.getElementById('display');
const numDisplay = document.getElementById('numDisplay');
const opDisplay = document.createElement('div');
opDisplay.setAttribute('id', 'opDisplay');

/** Initialize global variables */
let operand1 = '0';
let operand2 = '';
let operator = '';

numDisplay.textContent = operand1;

/** Arithmetic helpers */
const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => Number(num1) - Number(num2);
const multiply = (num1, num2) => Number(num1) * Number(num2);
const divide = (num1, num2) => Number(num1) / Number(num2);

/** Identify requested operation and call helper */
const operate = (op, num1, num2) => {
  switch (op) {
    case '+':
      return add(num1, num2);
    case '—':
      return subtract(num1, num2);
    case 'x':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
    default:
      console.log('OOPS');
  }
};

/** Handle logic when number buttons are pressed */
nums.forEach(num => num.addEventListener('click', () => {
  if (!operator) {
    if (operand1 !== '0') {
      operand1 = operand1 + num.textContent;
    } else {
      operand1 = num.textContent;
    }
    numDisplay.textContent = operand1;
  } else {
    if (operand2 !== '0') {
      operand2 = operand2 + num.textContent;
    } else {
      operand2 = num.textContent;
    }
    opDisplay.remove();
    display.style.justifyContent = 'end';
    numDisplay.textContent = operand2;
  }
}));

/** Handle logic for inserting decimal points */
dot.addEventListener('click', () => {
  if (!operator && !operand1.includes('.')) {
    operand1 = operand1 + dot.textContent;
    numDisplay.textContent = operand1;
  } else if (operator) {
    operand2 = '0' + dot.textContent;
    numDisplay.textContent = operand2;
  }
})

/** Handle logic for operator buttons */
ops.forEach(op => op.addEventListener('click', () => {
  if (!operator && !operand2) {
    operator = op.textContent;
    opDisplay.textContent = operator;
    display.insertBefore(opDisplay, numDisplay);
    display.style.justifyContent = 'space-between';
  } else if (operand2) {
    operand1 = operate(operator, operand1, operand2);
    numDisplay.textContent = operand1;
    operator = op.textContent;
    opDisplay.textContent = operator;
    operand2 = ''; 
  } else {
    operator = op.textContent;
    opDisplay.textContent = operator;
  }
}))

/** Clear the calculator */
clear.addEventListener('click', () => {
  if (operator) {
    operator = '';
    opDisplay.remove();
    display.style.justifyContent = 'end';
  }
  operand1 = '0';
  operand2 = '';
  numDisplay.textContent = operand1;
});