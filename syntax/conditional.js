var args = process.argv;
console.log(args); // 3번째 입력값부터 주도록 고정되어 있음.
console.log('A');
console.log('B');

if(args[2] === '1') {
    console.log('C1');
} else {
    console.log('C2');
}

console.log('D')