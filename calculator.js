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

// Testing operate func
console.log(operate("+","6","3"));
console.log(operate("-","6","3"));
console.log(operate("*","6","3"));
console.log(operate("/","6","3"));
console.log(operate("8","6","3"));