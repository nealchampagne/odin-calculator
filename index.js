/** Grab buttons for later */

const nums = document.querySelectorAll('.num');
const ops = document.querySelectorAll('.op');
const dot = document.querySelector('.dot');
const enter = document.querySelector('.enter');
const clear = document.getElementById('Delete');
const back = document.getElementById('Backspace');
const display = document.getElementById('display');
const numDisplay = document.getElementById('numDisplay');
const opDisplay = document.createElement('div');
opDisplay.setAttribute('id', 'opDisplay');

/** Initialize global variables */
let operator = '';
let operand1 = '0';
let operand2 = '';
let result = '';
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
      if (num2 == 0) {
        return 'Nice try'
      }
      return divide(num1, num2);
    default:
      alert('OOPS');
  }
};

/** Handle logic when number buttons are pressed */
nums.forEach(num => num.addEventListener('click', () => {
  if (!operator) {
    if (operand1 !== '0' && operand1.length < 17) {
      operand1 = operand1 + num.textContent;
    } else if (operand1 === '0') {
      result = '';
      operand1 = num.textContent;
    }
    numDisplay.textContent = operand1;
    } else {
    if (result) {
      operand1 = result;
      result = '';
      operand2 = num.textContent;
    } else if (operand2 !== '0' && operand2.length < 17) {
      operand2 = operand2 + num.textContent;
    } else if (operand2 === '' || operand2 === '0') {
      operand2 = num.textContent;
    }
    opDisplay.remove();
    display.style.justifyContent = 'end';
    numDisplay.textContent = operand2;
  }
}));

/** Handle logic for inserting decimal points */
dot.addEventListener('click', () => {
  if (!result) {
  if (!operator && !operand1.includes('.')) {
    operand1 = operand1 + '.';
    numDisplay.textContent = operand1;
  } else if (operator && !operand2) {
    operand2 = '0.';
    opDisplay.remove();
    display.style.justifyContent = 'end';
    numDisplay.textContent = operand2;
  } else if (operand2 && !operand2.includes('.')){
    operand2 = operand2 + '.';
    numDisplay.textContent = operand2;
  }} else if (!operator) {
    result = '';
    operand1 = operand1 + '.';
    numDisplay.textContent = operand1;
  } else {
    operand1 = result;
    result = '';
    operand2 = '0.';
    opDisplay.remove();
    display.style.justifyContent = 'end';
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
    result = operate(operator, operand1, operand2);
    numDisplay.textContent = result;
    operator = op.textContent;
    operand1 = result;
    opDisplay.textContent = operator;
    display.insertBefore(opDisplay, numDisplay);
    display.style.justifyContent = 'space-between';
    operand2 = '';
  } else {
    operator = op.textContent;
    opDisplay.textContent = operator;
  }
}))

/** Handle logic for equals button */
enter.addEventListener('click', () => {
  if (operator && operand2) {
    result = operate(operator, operand1, operand2);
    numDisplay.textContent = result;
    operator = '';
    operand1 = '0';
    operand2 = '';
    opDisplay.remove();
    display.style.justifyContent = 'end';
  } else if (operator) {
    if (result) {
      result = operate(operator, result, result);
      numDisplay.textContent = result;
      operator = '';
      opDisplay.remove();
      display.style.justifyContent = 'end';
    } else {
    result = operate(operator, operand1, operand1);
    numDisplay.textContent = result;
    operator = '';
    operand1 = '0';
    opDisplay.remove();
    display.style.justifyContent = 'end';
  }} else if (!result) {
    operand1 = Number(operand1).toString();
    numDisplay.textContent = operand1;
  }
})

/** Handle logic for delete button */
back.addEventListener('click', () => {
  if (!result && (!operator || (operator && operand2))) {
  if (operand2 && operand2.length === 1) {
    operand2 = '0';
    numDisplay.textContent = operand2;
  } else if (operand2) {
    operand2 = operand2.substring(0, operand2.length - 1);
    numDisplay.textContent = operand2;
  } else if (operand1.length === 1) {
    operand1 = '0';
    numDisplay.textContent = operand1;
  } else {
    operand1 = operand1.substring(0, operand1.length - 1);
    numDisplay.textContent = operand1;
  }
}})

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

/** Map keypresses to button clicks */
document.addEventListener("keydown", (e) => {
  if (e.key === '.' || (e.key >= 0 && e.key <= 9)
    || e.key === 'Backspace' || e.key === 'Delete'
    || e.key === '+' || e.key === '-' || e.key === '*'
    || e.key === '/') {
    document.getElementById(e.key).click();
  } else if (e.key === 'Enter' || e.key === '=') {
    document.getElementById('Enter').click();
}});