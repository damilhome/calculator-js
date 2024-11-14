const operationsDisplay = document.getElementById('operations-display');
const inputOutputDisplay = document.getElementById('input-output-display');
const percentage = document.getElementById('percentage');
const clearEntry = document.getElementById('clear-entry');
const clear = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const oneDividedByBtn = document.getElementById('one-divided-by');
const xSquaredBtn = document.getElementById('x-squared');
const squareRootOfXBtn = document.getElementById('square-root-of-x');
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
const btnKeys = [percentage, clearEntry, deleteBtn, divide, multiply, plus, minus, equal, nine, eight, seven, six, five, four, three, two, one, zero, comma];
const keys = ['%', 'Delete', 'Backspace', '/', '*', '+', '-', 'Enter', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', ','];
const operationsObj = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num2 !== 0 ? num1 / num2 : 'e',
    '**': num => Math.pow(num, 2),
    '///': num => Math.sqrt(num),
};
let operationCompleted = false;
let operationHappening = false;
let newInput = true;
let currentOperation = '';
let num1 = -1;
let num2 = 0;

const resetInputOutputDisplay = () => {
    updateInputOutputDisplay('0');
}

const resetDisplay = () => {
    resetInputOutputDisplay()
    operationsDisplay.textContent = '';
}

const resetOperationVariables = () => {
    operationHappening = false;
    newInput = true;
    currentOperation = ''
    num1 = 0;
    num2 = 0;
}

const updateOperationDisplay = (text) => {
    operationsDisplay.textContent = text;
}

const updateInputOutputDisplay = (text) => {
    inputOutputDisplay.textContent = text;
}

const deleteNumber = () => {
    updateInputOutputDisplay(inputOutputDisplay.textContent.slice(0, -1));
    if(inputOutputDisplay.textContent === '') {
        resetInputOutputDisplay();
    }
}

const negateDisplay = () => {
    if(inputOutputDisplay.textContent.includes(',')) {
        const i = inputOutputDisplay.textContent.indexOf(',');
        const numberWithoutDecimal = inputOutputDisplay.textContent.slice(0, i);
        const negatedNumber = Number(numberWithoutDecimal) * (-1);
        updateInputOutputDisplay(`${negatedNumber}${inputOutputDisplay.textContent.slice(i, inputOutputDisplay.textContent.length)}`);
    } else {
        updateInputOutputDisplay(Number(inputOutputDisplay.textContent) * (-1))
    }
}

const displayNumber = (event) => {
    const dataValue = event.target.dataset.value;
    if(operationCompleted) {
        resetDisplay();
        operationCompleted = false;
    }

    if(inputOutputDisplay.textContent === '0' || newInput) {
        updateInputOutputDisplay(dataValue);
        newInput = false;
    } else {
        if(inputOutputDisplay.textContent.includes(',') && dataValue === ','){
            return;
        }
        updateInputOutputDisplay(inputOutputDisplay.textContent += dataValue);
    }
}

const commaToPoint = (text) => {
    return text.replace(',', '.');
}

const pointToComma = (num) => {
    return String(num).replace('.', ',');
}

const startOperation = (event) => {
    const dataValue = event.target.dataset.value;
    currentOperation = dataValue;
    num1 = Number(commaToPoint(inputOutputDisplay.textContent));
    updateOperationDisplay(`${pointToComma(num1)} ${dataValue}`);
    updateInputOutputDisplay(pointToComma(String(num1)));
    operationCompleted = false;
    operationHappening = true;
    newInput = true;
}

const equalOperation = () => {
    if(operationHappening) {
        num2 = Number(commaToPoint(inputOutputDisplay.textContent));
        const result = operationsObj[currentOperation](num1, num2);

        if(result === 'e') {
            return;
        }
    
        updateOperationDisplay(`${operationsDisplay.textContent} ${pointToComma(num2)}`);
        updateInputOutputDisplay(pointToComma(result));
        resetOperationVariables();
        operationCompleted = true;
    }
}

const oneDividedBy = () => {
    num1 = 1;
    num2 = Number(inputOutputDisplay.textContent)

    if(num2 !== 0) {
        result = operationsObj['/'](num1, num2);
        updateOperationDisplay(`1 / ${pointToComma(num2)}`);
        updateInputOutputDisplay(result);
    }

    resetOperationVariables();
}

const xSquared = () => {
    const num = Number(commaToPoint(inputOutputDisplay.textContent));
    const result = operationsObj['**'](num);
    updateOperationDisplay(`sqr(${inputOutputDisplay.textContent})`);
    updateInputOutputDisplay(pointToComma(result));
}

const squareRootOfX = () => {
    const num = Number(commaToPoint(inputOutputDisplay.textContent));
    const result = operationsObj['///'](num);
    updateOperationDisplay(`√(${inputOutputDisplay.textContent})`);
    updateInputOutputDisplay(pointToComma(result));
}

clear.addEventListener('click', () => {
    resetOperationVariables();
    resetDisplay();
})

clearEntry.addEventListener('click', resetInputOutputDisplay);

document.body.addEventListener('keydown', (event) => {
    if(keys.includes(event.key)) {
        btnKeys.forEach(key => {
            if(key.dataset.value === event.key) {
                key.click();
            }
        })
    }
})