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
        return Math.round((mult(a,b) + Number.EPSILON) * 100) / 100;
    } else if (operator == "/") {
        return Math.round((div(a,b) + Number.EPSILON) * 100) / 100;
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
let hist = "0"; // Historic of all ops

// Write the value of 'displayValue' in the display 
function refreshDisplay() {
    const data = document.querySelector('#data');
    data.textContent = displayValue;
    const historic = document.querySelector('#hist');
    historic.textContent = hist;
}

// Enable or disable the '.' button of the calculator
function toggleFloat(bool) {
    const float = document.querySelector(".float");
    float.disabled = bool;
}

// Gives the calculator its initial state
function resetValues() {
    displayValue = "0";
    leftOperand = "0";
    actualOperation = "";
    rightOperand = "";
    index = 0;
    result = 0;
    hist = "0";
    toggleFloat(false); // If we had disabled '.' button, we enable it again
    refreshDisplay();
}

// After an error occurs we need to disable all buttons except the clear one
function disableButtons() {
    const divButtons = document.querySelector(".buttons");
    for (let i = 0; i < divButtons.childNodes.length; i++) {
        divButtons.childNodes[i].disabled = true;
    }
    const clear = document.querySelector(".clear");
    clear.disabled = false;
}

function enableButtons() {
    const divButtons = document.querySelector(".buttons");
    for (let i = 0; i < divButtons.childNodes.length; i++) {
        divButtons.childNodes[i].disabled = false;
    }
}

// Executing the initial state...
resetValues();

// LISTENERS

// Add a listener associated to each numbered button
const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener('click', function(){execDigitPressed(digit.textContent)});
});

// Add a listener associated to each operator
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
    operator.addEventListener('click', function(){execOpPressed(operator.textContent)});
});

// Add a listener associated to the equal symbol
const equal = document.querySelector(".equal");
equal.addEventListener('click', function(){execEqualPressed()});

// Add a listener associated to the 'clear' button
const clear = document.querySelector(".clear");
clear.addEventListener('click', function(){execClearPressed()});

// Add a listener associated to the '.' button
const float = document.querySelector(".float");
float.addEventListener('click', function(){execFloatPressed()});

// Add a listener associated to the 'DEL' button
const del = document.querySelector(".del");
del.addEventListener('click', function(){execDelPressed()});

// KEY LISTENERS
document.onkeydown = function(e) {
    const digit = /[0-9]/;
    const op = /[x/+-]/;
    if (digit.test(e.key)) {
        execDigitPressed(e.key);
    } else if (op.test(e.key)) {
        execOpPressed(e.key);
    } else if (e.keyCode == 13) {
        execEqualPressed();
    } else if (e.keyCode == 32) {
        execClearPressed();
    } else if (e.keyCode == 190) {
        execFloatPressed();
    } else if (e.keyCode == 8) {
        execDelPressed();
    }
};

// LISTENER FUNCTIONS

// Refresh variable 'displayValue' and write it on the 'display'
function execDigitPressed(digit) {
    if (displayValue == "0") {
        displayValue = digit;
    } else {
        displayValue = displayValue + digit;
    }
    hist = displayValue;
    refreshDisplay();
}

// Implement the logic of operator pressed
function execOpPressed(operator) {
    toggleFloat(false);
    if (actualOperation == "") { // There is no other operation to be solved
        leftOperand = displayValue;
        actualOperation = operator;
        index = leftOperand.length + 1;
        displayValue = displayValue + operator;
        hist = displayValue;
        refreshDisplay();
    } else {
        rightOperand = displayValue.slice(index,displayValue.length);
        // Here we need to solve current operation
        if (actualOperation == "/" && rightOperand == "0") { // Evade 0 division
            result = 0;
            displayValue = "Error";
            disableButtons();
        } else {
            result = operate(actualOperation,leftOperand,rightOperand);
        }
        leftOperand = result.toString();
        rightOperand = "";
        index = leftOperand.length + 1;
        
        // Now we can go to the next op
        actualOperation = operator;
        displayValue = leftOperand + actualOperation;
        hist += actualOperation;
        refreshDisplay();
    }
}

// Resolves the operation
function execEqualPressed() {
    rightOperand = displayValue.slice(index,displayValue.length);
    toggleFloat(false);
    if (rightOperand == "") {
        rightOperand = leftOperand;
    }
    if (actualOperation == "/" && rightOperand == "0") { // Evade 0 division
        result = 0;
        displayValue = "Error";
        disableButtons();
    } else if (actualOperation != "") { // Standard case but evading '=' click at first
        result = operate(actualOperation,leftOperand,rightOperand);
        displayValue = result.toString();
        hist += "=";  
    }
    refreshDisplay();
    actualOperation = "";
    rightOperand = "";
    leftOperand = result.toString();
}

// Executes the logic of clear function
function execClearPressed() {
    enableButtons();
    resetValues();
}

// Introduces '.' and disable the button
function execFloatPressed() {
    displayValue = displayValue + float.textContent;
    refreshDisplay();
    toggleFloat(true); //Float numbers can't have mora than one decimal part
}

// Executes the logic associated at DEL button
function execDelPressed() {
    if (displayValue.length > 1) {
        if (displayValue.charAt(displayValue.length-1) == ".") { // If '.' is deleted we need to enable the button again
            toggleFloat(false);
        }
        else if (displayValue.charAt(displayValue.length-1) == "/" || displayValue.charAt(displayValue.length-1) == "x" || 
        displayValue.charAt(displayValue.length-1) == "+" || displayValue.charAt(displayValue.length-1) == "-") {
            const arrayDisplay = displayValue.split("");
            if (arrayDisplay.includes(".")) {
                toggleFloat(true);
            }
            actualOperation = "";
        }
        displayValue = displayValue.slice(0,displayValue.length-1);
        hist = displayValue;
        refreshDisplay();
    } else {
        displayValue = "0";
        hist = displayValue;
        refreshDisplay();
    }
    if (index > 0) {
        index--;
    }
}