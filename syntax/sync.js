var fs = require('fs');

//동기적
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');

//비동기적(선호해야 함.)
console.log('A');
var result = fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
}); //파일을 읽고 function 실행
console.log('C');