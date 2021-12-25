var calculate = function(str, ind=0) {
    if (!str.length) return 0;
    let stack = [];
    let curr = 0;
    let symbol = '+';

    str = str.trim();
    while (ind < str.length) {
        if (str[ind] === '(') {
            ind++;
            let [number, index] = calculate(str, ind);
            update(stack, number, symbol);
            ind = index++;
            symbol = str[ind++];
            continue;
        } else if (str[ind] === ')') {
            update(stack, curr, symbol);
            return [get(stack), ind];
        } else {
            if (!isNaN(str[ind])) curr = curr * 10 + str[ind].charCodeAt(0) - '0'.charCodeAt(0);
            if (isNaN(str[ind]) || ind === str.length - 1) {
                update(stack, curr, symbol);
                symbol = str[ind];
                curr = 0;
            }
        }
        ind++;
    }
    return get(stack);
};

const update = function (stack, curr, symbol) {
    switch (symbol) {
        case '+':
            stack.push(curr);
            break;
        case '-':
            stack.push(-curr);
            break;
        case '*':
            stack.push(stack.pop() * curr);
            break;
        case '/':
            stack.push(Math.trunc(stack.pop() / curr));
            break;
    }
}

const get = function (stack) {
    return stack.reduce((a, b) => a + b);
}
