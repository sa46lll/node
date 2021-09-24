var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

module.exports = M; //EXPORT: m이 가리키는 객체를 바깥에서도 사용할 수 있게 함.