var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    // console.log(url.parse(_url, true));

    if(pathname === '/'){ //homepath 에 있을때
      if(queryData.id === undefined){ //접근하지 못하는 id로 접근할 때 Not Found
        fs.readdir('./data', function(arr, filelist){
          console.log(filelist)
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          // 목차 리스트
          var list = '<ul>';
          var i =0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i + 1;
          }
          list += '</ul>';
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        })
      } else {
        fs.readdir('./data', function(arr, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          // 목차 리스트
          var list = '<ul>';
          var i =0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i + 1;
          }
          list += '</ul>';
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
          });
        });
      } 
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});
app.listen(3000);