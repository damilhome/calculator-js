const operationsDisplay = document.getElementById('operations-display');
const inputOutputDisplay = document.getElementById('input-output-display');
const percentage = document.getElementById('percentage');
const clearEntry = document.getElementById('clear-entry');
const clear = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
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

let isLastOperationCompleted = false;
let operationHappening = false;
let isSecondNumberInput = true;
let currentOperation = '';
let num1 = 0;
let num2 = 0;

const updateOperationDisplay = (text) => {
    operationsDisplay.textContent = text;
}

const updateInputOutputDisplay = (text) => {
    inputOutputDisplay.textContent = text;
}

const resetInputOutputDisplay = () => {
    updateInputOutputDisplay('0');
}

const resetDisplay = () => {
    resetInputOutputDisplay();
    updateOperationDisplay();
}

const resetOperationVariables = () => {
    operationHappening = false;
    isSecondNumberInput = true;
    currentOperation = ''
    num1 = 0;
    num2 = 0;
}

const isInputOutputEmpty = () => {
    if(inputOutputDisplay.textContent === '') {
        resetInputOutputDisplay();
    }
}

const getInputNumber = () => Number(commaToPoint(inputOutputDisplay.textContent));

const deleteNumber = () => {
    updateInputOutputDisplay(inputOutputDisplay.textContent.slice(0, -1));
    isInputOutputEmpty()
}

const negateDisplay = () => {
    if(inputOutputDisplay.textContent[0] === '-') {
        updateInputOutputDisplay(inputOutputDisplay.textContent.slice(1))
    } else {
        updateInputOutputDisplay(`-${inputOutputDisplay.textContent}`);
    }
}

const checkLastOperationCompleted = () => {
    if(isLastOperationCompleted) {
        resetDisplay();
        isLastOperationCompleted = false;
    }
}

const displayNumber = (event) => {
    const dataValue = event.target.dataset.value;
    checkLastOperationCompleted();

    if(inputOutputDisplay.textContent === '0' || isSecondNumberInput) {
        updateInputOutputDisplay(dataValue);
        isSecondNumberInput = false;
    } else {
        const isAlreadyDecimalNumber = inputOutputDisplay.textContent.includes(',') && dataValue === ',';
        if(isAlreadyDecimalNumber){
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
    num1 = getInputNumber();
    updateOperationDisplay(`${pointToComma(num1)} ${dataValue}`);
    updateInputOutputDisplay(pointToComma(String(num1)));
    isLastOperationCompleted = false;
    operationHappening = true;
    isSecondNumberInput = true;
}

const equalOperation = () => {
    if(operationHappening) {
        num2 = getInputNumber();
        const result = operationsObj[currentOperation](num1, num2);

        if(result === 'e') {
            return;
        }
    
        updateOperationDisplay(`${operationsDisplay.textContent} ${pointToComma(num2)}`);
        updateInputOutputDisplay(pointToComma(result));
        resetOperationVariables();
        isLastOperationCompleted = true;
    }
}

const oneDividedBy = () => {
    num1 = 1;
    num2 = getInputNumber();

    if(num2 !== 0) {
        result = operationsObj['/'](num1, num2);
        updateOperationDisplay(`1 / ${pointToComma(num2)}`);
        updateInputOutputDisplay(result);
    }

    resetOperationVariables();
    isLastOperationCompleted = true;
}

const xSquared = () => {
    const num = getInputNumber();
    const result = operationsObj['**'](num);
    updateOperationDisplay(`sqr(${inputOutputDisplay.textContent})`);
    updateInputOutputDisplay(pointToComma(result));
    isLastOperationCompleted = true;
}

const squareRootOfX = () => {
    const num = getInputNumber();
    const result = operationsObj['///'](num);
    updateOperationDisplay(`√(${inputOutputDisplay.textContent})`);
    updateInputOutputDisplay(pointToComma(result));
    isLastOperationCompleted = true;
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