// array, object

//함수 => 값이 될수 있다.
var f = function(){
    console.log(1+1);
    console.log(1+2);
}
console.log(f);
f(); //2 3

//배열의 원소로서 함수가 존재
var a = [f];
a[0](); //2 3

//객체의 원소로서 함수가 존재
var o = {
    func:f
}
o.func(); //2 3



//if문 != 값
// var i = if(true){console.log(1)};

//while문 != 값
// var w = while(true){console.log(1)};

