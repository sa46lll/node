var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log(queryData.id);
    // console.log(_url);
    
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    // response.end(queryData.id) //id string 을 출력함.
    response.end(fs.readFileSync(__dirname + url)); //사용자가 접속한 url에 따라 일치하는 url을 로드해줌.
 
});
app.listen(3000);