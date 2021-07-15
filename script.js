const calculator = document.querySelector(".container-calculator");
const keys = calculator.querySelector(".button");
const screen = document.querySelector(".screen");

function calculate(operator, a, b) {
	let result = "";
	a = parseFloat(a);
	b = parseFloat(b);

	if (operator === "add") {
		result = a + b;
	} else if (operator === "subtract") {
		result = a - b;
	} else if (operator === "multiply") {
		result = a * b;
	} else if (operator === "divide") {
		result = a / b;
	} 

	return result;
}

keys.addEventListener ("click", e => {
	if (e.target.matches ("button")) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayNumber = screen.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;
		Array.from (key.parentNode.children).forEach (k => k.classList.remove("is-depressed"));

		if (!action) {
			if (displayNumber === "0" || previousKeyType === "operator" || previousKeyType === "equal") {
				screen.textContent = keyContent;
			} else {
				screen.textContent = displayNumber + keyContent;
			}	
			calculator.dataset.previousKeyType = "number";
		}
		if (action === "add" ||
			action === "subtract" || 
			action === "multiply" || 
			action === "divide"
		) {
			let firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			let secondValue = displayNumber;

			if (firstValue && operator && previousKeyType !== "operator" && previousKeyType === "equal") {
				const calcValue = calculate(operator, firstValue, secondValue);
				calculator.dataset.firstValue = calcValue;
			} else {
				calculator.dataset.firstValue = displayNumber;
			}

			key.classList.add("is-depressed");
			calculator.dataset.previousKeyType = "operator";
			calculator.dataset.operator = action;

		}
		if (action === "clear" || action === "delete") {
			screen.textContent = 0;
			calculator.dataset.firstValue = "";
			calculator.dataset.modValue = "";
			calculator.dataset.operator = "";
			calculator.dataset.previousKeyType = "";
			calculator.dataset.previousKeyType = "clear";
		}
		if (action === "decimal") {
			if (previousKeyType === "operator" || previousKeyType === "equal") {
				screen.textContent = "0.";
			} else if (!displayNumber.includes(".")) {
				screen.textContent = displayNumber + ".";(previousKeyType === "operator")
			}
			calculator.dataset.previousKeyType = "decimal";
			console.log(previousKeyType);
		}
		if (action === "equal") {
			let firstValue = calculator.dataset.firstValue;
			let secondValue = displayNumber;
			const operator = calculator.dataset.operator;
			
			if (firstValue) {
				if (previousKeyType === "equal") {
					firstValue = displayNumber;
					secondValue = calculator.dataset.modValue;
				}

				screen.textContent = calculate(operator, firstValue, secondValue);
			}

			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = "equal";
		}


	}
});

