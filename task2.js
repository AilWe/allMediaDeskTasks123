module.exports.task2 = function (number){

    while (number > 0) {
        let nxt = checkMonotone(number);
        if (nxt === number)
            break;
        else
            number = nxt;
    }

    return number;

};
var checkMonotone = function(number) {
    let digits = (number + '').split('').map(element => parseInt(element));

    let count = 1, altNum = 0;
    while (digits[count] !== undefined) {
        if (digits[count - 1] > digits[count]) {
            altNum += (digits[count - 1] * Math.pow(10, digits.length - count));
            break;
        }
        altNum += (digits[count - 1] * Math.pow(10, digits.length - count));
        count++;
    }

    if (count === digits.length) {
        return number;
    }
    else {
        return altNum - 1;
    }
};
