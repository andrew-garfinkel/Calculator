const calculator = {
	displayValue: '0',
	firstOperand: null,
	operator: null,
	waitingForSecondOperand: false,
};

function updateDisplay() {
	const display = document.getElementById('display');
	display.textContent = calculator.displayValue;
}

updateDisplay();

// event delegation may be the way to go
const calculatorKeys = document.getElementById('calculator-keys');
calculatorKeys.addEventListener('click', (e) => {
	// descructuring
	const { target } = e;
	if (!target.matches('button')) {
		return;
	}
	if (target.classList.contains('operator')) {
		console.log(target.textContent, target.className);
		handleOperator(target.textContent);
		updateDisplay();
		return;
	}

	if (target.classList.contains('decimal')) {
		console.log(target.textContent, target.className);
		addDecimal(target.textContent);
		updateDisplay();
		return;
	}

	if (target.classList.contains('ac')) {
		console.log(target.textContent, target.className);
		clearCalculator();
		updateDisplay();
		return;
	}

	if (target.classList.contains('number')) {
		console.log(target.textContent, target.className);
		addDigit(target.textContent);
		updateDisplay();
		return;
	}
});

function addDigit(digit) {
	// if the display value is 0...make it the digit...if not, do string concat
	const { displayValue, waitingForSecondOperand } = calculator;
	if (!waitingForSecondOperand) {
		calculator.displayValue = displayValue === '0' ? digit : calculator.displayValue + digit;
	} else {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	}
}

function addDecimal(decimal) {
	// can add 1 and only 1 decimal place
	let decimalCount = calculator.displayValue.split('.').length - 1;
	if (decimalCount < 1) {
		calculator.displayValue += decimal;
		return;
	}
	alert('too many decimals');
}

function handleOperator(nextOperator) {
	// descructuring
	// first scenario
	const { firstOperand, displayValue, operator } = calculator;
	// why check for NaN
	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		return;
	}

	if (firstOperand === null) {
		calculator.firstOperand = parseFloat(displayValue);
	} else if (operator) {
		const result = calculate(firstOperand, parseFloat(displayValue), operator);
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	}

	calculator.operator = nextOperator;
	calculator.waitingForSecondOperand = true;
}

function calculate(firstOperand, secondOperand, operator) {
	if (operator === '+') {
		return firstOperand + secondOperand;
	} else if (operator === '-') {
		return firstOperand - secondOperand;
	} else if (operator === 'x') {
		return firstOperand * secondOperand;
	} else if (operator === '/') {
		return firstOperand / secondOperand;
	} else if (operator === '=') {
		return secondOperand;
	}
}

function clearCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.operator = null;
	calculator.waitingForSecondOperand = false;
}
