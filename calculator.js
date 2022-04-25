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
    } else if (operator == "*") {
        return mult(a,b);
    } else if (operator == "/") {
        return div(a,b);
    } else {
        return undefined;
    }
}

// Global variable that stores the actual operation
let displayValue = "";

// Write the value of 'displayValue' in the display 
function refreshDisplay() {
    const data = document.querySelector('#data');
    data.textContent = displayValue;
}

// Add a listener associated to each numbered button that refresh variable 'displayValue' and write it on the 'display'
const digits = document.querySelectorAll(".digit");
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        displayValue = displayValue + digit.textContent;
        refreshDisplay();
    });
});