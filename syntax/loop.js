// loop
console.log('A');
console.log('B');

var i = 0;
while(i < 2){
    console.log('C1');
    console.log('C2');
    i = i + 1;
}
console.log('D');

// array
var arr = ['A', 'B', 'C', 'D'];
console.log(arr[1]);
console.log(arr[3]);
arr[2] = 3; //데이터 수정
console.log(arr);
console.log(arr.length);
arr.push('E'); //데이터 삽입
console.log(arr);

//array-loop
var number = [1, 400, 12, 34, 5];
var i = 0;
var total = 0;
while(i < number.length){
    total = total + number[i];
    i = i + 1;
}
console.log(`total : ${total}`);