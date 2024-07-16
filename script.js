class Calculator {
    constructor(screenElement) {
        this.screenElement = screenElement;
        this.reset();
    }

    reset() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (this.currentValue.includes('.') && number === '.') return;
        this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
    }

    chooseOperation(operation) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = computation.toString();
        this.operation = undefined;
        this.previousValue = '';
    }

    updateDisplay() {
        this.screenElement.value = this.currentValue;
    }
}

const screenElement = document.querySelector('.calculator-screen');
const calculator = new Calculator(screenElement);

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            calculator.chooseOperation(value);
            break;
        case '=':
            calculator.compute();
            break;
        case 'all-clear':
            calculator.reset();
            break;
        default:
            calculator.appendNumber(value);
    }
    calculator.updateDisplay();
});