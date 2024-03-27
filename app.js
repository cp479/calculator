let currentValue = ''
let previousValue = ''
let operator = null
let screenReset = false

const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const equalButton = document.querySelector(".equal")
const decimalButton = document.querySelector(".decimal")
const clearButton = document.querySelector(".clear")
const previousScreen = document.querySelector("#previous")
const currentScreen = document.querySelector("#current")

function clear() {
    currentScreen.textContent = '0'
    previousScreen.textContent = ''
    previousValue = ''
    currentValue = ''
    operator = null
}

function resetScreen() {
    currentScreen.textContent = ''
    screenReset = false
}

numberButtons.forEach((number) => number.addEventListener('click', function (e) {
    if (currentScreen.textContent === '0' || screenReset)
        resetScreen()
    currentScreen.textContent += e.target.textContent
}))

operatorButtons.forEach((button) => button.addEventListener('click', function (e) {
    setOperator(e.target.textContent)
}))

clearButton.addEventListener('click', clear)

decimalButton.addEventListener('click', addDecimal)

equalButton.addEventListener('click', evaluate)

function setOperator(op) {
    if (operator !== null) evaluate()
    previousValue = currentScreen.textContent
    operator = op
    previousScreen.textContent = `${previousValue} ${operator}`
    screenReset = true
}

function evaluate() {
    if (operator === null || screenReset) return
    if (operator === '/' && currentScreen.textContent === '0') {
        alert("Impossible to divide by 0.")
        return
    }
    currentValue = currentScreen.textContent
    currentScreen.textContent = roundNumber(
        operate(operator, previousValue, currentValue)
    )
    previousScreen.textContent = `${previousValue} ${operator} ${currentValue}`
    operator = null
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(op, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal() {
    if (screenReset) resetScreen()
    if (currentScreen.textContent === '')
        currentScreen.textContent = '0'
    if (currentScreen.textContent.includes('.')) return
    currentScreen.textContent += '.'
}