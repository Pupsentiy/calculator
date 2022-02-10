let display2 = document.querySelector('#display2')
let buttons = document.querySelectorAll('.op_btn')
const result_btn = document.querySelector('#result')
const reset_btn = document.querySelector('#reset')
const clear_btn = document.querySelector('#clear_btn')

function sum(resultText) {
    let resText = resultText.split('')
    let operation = [];
    let longNumber = '';
    let arr = []

    for (let i = 0; i < resText.length; i++) {
        if (!['+', '-', '*', '/'].includes(resText[i])) {
            longNumber += resText[i];
        } else {
            arr.push(longNumber)
            longNumber = ''
            if (['-', '*', '/'].includes(operation[operation.length - 1])) {
                const minus = operation.pop()
                arr.push(minus)
            }
            operation.push(resText[i])
        }
    }
    if (longNumber.length > 0) {
        arr.push(longNumber)
        if (['-', '*', '/'].includes(operation[operation.length - 1])) {
            const minus = operation.pop()
            arr.push(minus)
        }
    }
    const polishArr = [...arr, ...operation];
    const stack = []

    for (let i = 0; i < polishArr.length; i++) {
        if (Number(polishArr[i])) {
            stack.push(polishArr[i])
        } else {
            let tmp1 = stack.pop()
            let tmp2 = stack.pop()
            let operator = polishArr[i]
            switch (operator) {
                case '+':
                    stack.push(Number(tmp1) + Number(tmp2))
                    break;

                case '-':
                    stack.push(Number(tmp2) - Number(tmp1))
                    break;

                case '*':
                    stack.push(Number(tmp1) * Number(tmp2)).toFixed(2)
                    break;

                case '/':
                    stack.push((Number(tmp2) / Number(tmp1)).toFixed(2))
                    break;
            }
        }
    }
    return stack;
}

function setInputValue(button) {
    if (button.value !== '=') {
        const number = button.value
        const result = document.querySelector('#display2')
        result.value = String(result.value) + String(number)
    }
}

result_btn.addEventListener('click', () => {
    const result = document.querySelector('#display2')
    result.value = sum(result.value)
})

buttons.forEach(op => {
    op.addEventListener('click', (event) => {
        setInputValue(event.target)
    })
})

reset_btn.addEventListener('click', () => {
    const result = document.querySelector('#display2')
    result.value = ''
})

clear_btn.addEventListener('click', () => {
    const result = document.querySelector('#display2')
    result.value = result.value.slice(0, -1)
})