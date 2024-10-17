const display = document.querySelector('#display');
const numericBtns = document.querySelectorAll('.numbers');
const operatorBtns = document.querySelectorAll('.operators');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');
const resultBtn = document.querySelector('#equals');
const decimalBtn = document.querySelector('#decimal');

let firstOperand = 'na', secondOperand = 'na',  operator = 'na';
let intermediateResult = 'na', result = 'na';

// Event listener callback function
function takeInputFromNumbers(value) {
    // If intermediate result is displayed, remove it
    if (display.style.opacity) {
        display.textContent = '';
        display.style.opacity = null;
        enableOperators();
    }

    display.textContent += value;
}

// Event listener callback function
function takeInputFromOperators(value) {
    convertTextToOperand();
    updateDisplay();
    operator = value;
}

function convertTextToOperand(fromEqualEvent = false) {
    // If no operand available
    if (firstOperand === 'na') {
        firstOperand = Number(display.textContent);
        intermediateResult = firstOperand;
        console.log(firstOperand);
    }
    else {
        firstOperand = intermediateResult;
        secondOperand = Number(display.textContent);
        console.log(secondOperand);
        // Calculate intermediate result to display on screen
        if (firstOperand !== 'na' && secondOperand !== 'na' && operator !== 'na' && !fromEqualEvent) {
            if (calculateResult()) {
                intermediateResult = result;
                console.log('Intermediate Result: ' + intermediateResult);
            }
            else {
                clearMemory();
            }
        }
    }
}

// To show intermediate display
function updateDisplay() {
    if (intermediateResult !== 'na') {
        display.textContent = intermediateResult;
        display.style.opacity = '0.5';
        disableOperators();
    }
    else {
        display.textContent = '';
    }
}

// Runs when equals button is pressed
function showResult() {
    let fromEqualEvent = true;
    convertTextToOperand(fromEqualEvent);
    if (calculateResult()) {
        display.textContent = result;
        disableOperators();
        numericBtns.forEach((number) => {
            number.setAttribute('disabled', '');
        });
    }
    else {
        clearMemory();
    }
}

function add() {
    result = firstOperand + secondOperand;
    formatResult();
}

function subtract() {
    result = firstOperand - secondOperand;
    formatResult();
}

function multiply() {
    result = firstOperand * secondOperand;
    formatResult();
}

function division() {
    if (secondOperand) {
        result = firstOperand / secondOperand;
        formatResult();
        return true;
    }
    else {
        alert('Division by zero not allowed');
        return false;
    }
}

const formatResult = function() {
    if (Math.round(result) === result)
        return;
    result = Number(Number(result).toFixed(5));
}

function calculateResult() {
    let success = true;
    if (firstOperand === 'na' || secondOperand === 'na')
        result = display.textContent;
    else {
        switch(operator) {
            case '+':
                add();
                break;
            case '-':
                subtract();
                break;
            case 'x':
                multiply();
                break;
            case '/':
                success = division();
                break;
        }
    }
    return success
}

// Runs when AC button is pressed
function clearMemory() {
    display.textContent = '';  // Clear display
    
    /* Clear all variables */
    result = 'na';
    firstOperand = 'na';
    secondOperand = 'na';
    operator = 'na';
    intermediateResult = 'na';

    // Enable all buttons
    enableOperators();
    numericBtns.forEach((number) => {
        number.removeAttribute('disabled');
    });
}


// Event listeners start here

numericBtns.forEach((number) => {
    number.addEventListener('click', () => {
        takeInputFromNumbers(number.textContent);
    });
});

operatorBtns.forEach((operatorBtn) => {
    if (operatorBtn.id === 'percent') {
        operatorBtn.addEventListener('click', () => {
            display.textContent = String(Number(display.textContent)/100);
        });
    }
    else {
        operatorBtn.addEventListener('click', () => {
            if (operatorBtn.id === 'add' || operatorBtn.id === 'subtract') {
                if (display.textContent === '') {
                    display.textContent += operatorBtn.textContent;
                    return;
                }
            }
            takeInputFromOperators(operatorBtn.textContent);
        });
    }
});

clearBtn.addEventListener('click', clearMemory);
resultBtn.addEventListener('click', showResult);

backspaceBtn.addEventListener('click', () => {
    if (display.textContent.length > 1)
        display.textContent = display.textContent.slice(0, display.textContent.length-1);
});

decimalBtn.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});
// Event listeners end here

// To disable operators when showing intermediate result
function disableOperators() {
    operatorBtns.forEach((operator) => {
        operator.setAttribute('disabled', '');
    });
    resultBtn.setAttribute('disabled', '');
    backspaceBtn.setAttribute('disabled', '');
    decimalBtn.setAttribute('disabled', '');
}

// Enable operators
function enableOperators() {
    operatorBtns.forEach((operator) => {
        operator.removeAttribute('disabled');
    });
    resultBtn.removeAttribute('disabled');
    backspaceBtn.removeAttribute('disabled');
    decimalBtn.removeAttribute('disabled');
}