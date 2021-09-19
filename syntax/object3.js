// var v1 = 'v1';
// // 100000 code => v1 객체 보호X
// v1 = 'sa46lll';
// var v2 = 'v2';

var p = {
    v1:'v1',
    v2:'v2',
    f1:function(){
        console.log(this.v1); //p.v1 (함수가 속해있는 객체 내의 v1)
    },
    f2:function(){
        console.log(this.v2);
    }
}

p.f1();
p.f2();

// function f1(){
//     console.log(o.v1);
// }

// function f2(){
//     console.log(o.v2);
// }