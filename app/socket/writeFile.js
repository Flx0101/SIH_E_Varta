const fs = require('fs');

function writeData(val1, val2) {
    let val = String(val1) + " hello " + String(val2);
    fs.writeFile('./data.txt', val, function(err) {
        if (err) {
            return console.log(err);
        } else {
            console.log("val: " + val);
        }
    });
}