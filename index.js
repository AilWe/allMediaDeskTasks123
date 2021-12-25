const express = require('express');
const bodyParser = require('body-parser');
let task2 = require(__dirname+ "/task2.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let task1Output;
let task2Output;
let task3Output;
//task1:


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


app.get("/", (req, res) => {

    res.render("root",{ task1Result: task1Output, task2Result: task2Output, task3Result: task3Output });
})
app.post("/", (req, res) => {
    const task1String = req.body.task1;
    // console.log(req.body.task1);

    const task2Num= parseInt(req.body.task2);
    // console.log(req.body.task2);

    const task3String = req.body.task3;


    if(task1String)
        task1Output = calculate(task1String);
    if(task2Num)
        task2Output = task2.task2(task2Num);
    if(task3String) {
        task3Output = task3String;
        // console.log(task3String);
    }
    res.redirect("/");

});

app.listen(3000, ()=>{
    console.log("server started on 3000 port successfully");
})



