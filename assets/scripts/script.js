const operationsDisplay = document.getElementById('operations-display');
const inputOutputDisplay = document.getElementById('input-output-display');
const percentage = document.getElementById('percentage');
const clearEntry = document.getElementById('clear-entry');
const clear = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const oneDividedBy = document.getElementById('one-divided-by');
const xSquared = document.getElementById('x-squared');
const squareRootOfX = document.getElementById('square-root-of-x');
const divide = document.getElementById('divide');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const multiply = document.getElementById('multiply');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const minus = document.getElementById('minus');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const plus = document.getElementById('plus');
const negate = document.getElementById('negate');
const zero = document.getElementById('zero');
const comma = document.getElementById('comma');
const equal = document.getElementById('equal');
const operationsObj = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num2 !== 0 ? num1 / num2 : 'e'
}
let operationCompleted = false;
let operationHappening = false;
let newInput = true;
let currentOperation = '';
let num1 = -1;
let num2 = 0;

const deleteNumber = () => {
    inputOutputDisplay.textContent = inputOutputDisplay.textContent.slice(0, -1);
    if(inputOutputDisplay.textContent === '') {
        inputOutputDisplay.textContent = 0;
    }
}

const negateDisplay = () => {
    console.log('negate display');
    inputOutputDisplay.textContent = Number(inputOutputDisplay.textContent) * (-1)
}

const resetDisplay = () => {
    inputOutputDisplay.textContent = '';
    operationsDisplay.textContent = '';
}

const displayNumber = (event) => {
    const dataValue = event.target.dataset.value;
    if(operationCompleted) {
        resetDisplay()
        operationCompleted = false;
    }

    if(inputOutputDisplay.textContent === '0' || newInput) {
        inputOutputDisplay.textContent = dataValue;
        newInput = false;
    } else {
        if(inputOutputDisplay.textContent.includes(',') && dataValue === ','){
            return;
        }
        inputOutputDisplay.textContent += dataValue;
    }
}

const updateOperationDisplay = (text) => {
    operationsDisplay.textContent = text;
}

const startOperation = (event) => {
    const dataValue = event.target.dataset.value;
    currentOperation = dataValue;
    num1 = Number(inputOutputDisplay.textContent);
    updateOperationDisplay(`${num1} ${dataValue}`);
    operationCompleted = false;
    operationHappening = true;
    newInput = true;
}

const restartOperationVariables = () => {
    operationCompleted = true;
    operationHappening = false;
    newInput = true;
    currentOperation = ''
    num1 = 0;
    num2 = 0;
}

const equalOperation = () => {
    if(operationHappening) {
        num2 = Number(inputOutputDisplay.textContent);
        const result = operationsObj[currentOperation](num1, num2);

        if(result === 'e') {
            return;
        }
    
        updateOperationDisplay(`${operationsDisplay.textContent} ${num2}`)
        inputOutputDisplay.textContent = result;
        restartOperationVariables()
    }
}