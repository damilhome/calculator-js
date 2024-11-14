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
const add = document.getElementById('add');
const negate = document.getElementById('negate');
const zero = document.getElementById('zero');
const comma = document.getElementById('comma');
const equal = document.getElementById('equal');

const displayNumber = (event) => {
    dataValue = event.target.dataset.value;
    if(inputOutputDisplay.textContent === '0') {
        inputOutputDisplay.textContent = dataValue;
    } else {
        if(inputOutputDisplay.textContent.includes(',') && dataValue === ','){
            return;
        }
        inputOutputDisplay.textContent += dataValue;
    }
}