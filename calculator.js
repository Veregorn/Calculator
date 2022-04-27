// Simple operation functions
// Functions receive strings but need to operate with numbers (conversion needed)
function sum(a,b) {
    return Number(a) + Number(b);
}

function sub(a,b) {
    return Number(a) - Number(b);
}

function mult(a,b) {
    return Number(a) * Number(b);
}

function div(a,b) {
    return Number(a) / Number(b);
}

// Receives an operator (String) and two operands (Strings) and call the associated function
function operate(operator,a,b) {
    if (operator == "+") {
        return sum(a,b);
    } else if (operator == "-") {
        return sub(a,b);
    } else if (operator == "x") {
        return mult(a,b);
    } else if (operator == "/") {
        return div(a,b);
    } else {
        return undefined;
    }
}

// Global variables
let displayValue = "0"; // Stores the actual value
let leftOperand = "0";
let actualOperation = "";
let rightOperand = "";
let index = 0; // This index tell us in what position of 'displayValue' starts the right operand
let result = 0; // This is the result of the last operation

// Write the value of 'displayValue' in the display 
function refreshDisplay() {
    const data = document.querySelector('#data');
    data.textContent = displayValue;
}

// Gives the calculator its initial state
function resetValues() {
    displayValue = "0";
    leftOperand = "0";
    actualOperation = "";
    rightOperand = "";
    index = 0;
    result = 0;
    refreshDisplay();
}

// After an error occurs we need to disable all buttons except the clear one
function disableButtons() {
    const divButtons = document.querySelector(".buttons");
    for (let i = 0; i < divButtons.childNodes.length; i++) {
        divButtons.childNodes[i].disabled = true;
    }
}

function enableButtons() {
    const divButtons = document.querySelector(".buttons");
    for (let i = 0; i < divButtons.childNodes.length; i++) {
        divButtons.childNodes[i].disabled = false;
    }
}

// Executing the initial state...
resetValues();

// Add a listener associated to each numbered button that refresh variable 'displayValue' and write it on the 'display'
const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if (displayValue == "0") {
            displayValue = digit.textContent;
        } else {
            displayValue = displayValue + digit.textContent;
        }
        refreshDisplay();
    });
});

// Add a listener associated to each operator
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (actualOperation == "") { // There is no other operation to be solved
            leftOperand = displayValue;
            actualOperation = operator.textContent;
            index = leftOperand.length + 1;
            displayValue = displayValue + operator.textContent;
            refreshDisplay();
        } else {
            rightOperand = displayValue.slice(index,displayValue.length-1);
            actualOperation = operator.textContent;
            if (actualOperation == "/" && rightOperand == "0") { // Evade 0 division
                result = 0;
                displayValue = "Error";
                disableButtons();
            } else { // Standard case
                result = operate(actualOperation,leftOperand,rightOperand);
            }
            leftOperand = result.toString();
            rightOperand = "";
            index = leftOperand.length + 1;
            displayValue = result.toString() + actualOperation;
            refreshDisplay();
        }
    });
});

// Add a listener associated to the equal symbol
const equal = document.querySelector(".equal");
equal.addEventListener('click', () => {
    rightOperand = displayValue.slice(index,displayValue.length);
    if (rightOperand == "") {
        rightOperand = leftOperand;
    }
    if (actualOperation == "/" && rightOperand == "0") { // Evade 0 division
        result = 0;
        displayValue = "Error";
        disableButtons();
    } else { // Standard case
        result = operate(actualOperation,leftOperand,rightOperand);
        displayValue = result.toString();    
    }
    refreshDisplay();
    actualOperation = "";
    rightOperand = "";
    leftOperand = result.toString();
});

// Add a listener associated to the 'clear' button
const clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    enableButtons();
    resetValues();
});