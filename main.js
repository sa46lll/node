var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i =0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
    i = i + 1;
  }
  list += '</ul>';
  return list
}

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
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
            ); //home에서는 update기능이 필요 없음.
          response.writeHead(200);
          response.end(template);
        })
      } else {
        fs.readdir('./data', function(arr, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            );
          response.writeHead(200);
          response.end(template);
          });
        });
      } 
  } else if(pathname === '/create'){
    fs.readdir('./data', function(arr, filelist){
      console.log(filelist)
      var title = 'Web - create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
      <form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
          <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
          <input type="submit">
      </p>
  </form>
      `,'');
      response.writeHead(200);
      response.end(template);
    })
  } else if(pathname === '/create_process'){ //파일생성과
    var body='';
    request.on('data', function(data){ //data라는 인수를 통해 수신한 정보를 줌.
      body += data;
      if (body.length > 1e6){ //data가 너무 길어지면 통신을 중단함.
        request.connection.destroy();
      }
    });
    request.on('end', function(){ //들어올 정보가 없으면 end 콜백함수가 들어옴.
      var post = qs.parse(body); //post에 body를 넣음.
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end('success');
      })
    });
  } else if(pathname === '/update'){
    fs.readdir('./data', function(arr, filelist){
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
      var title = queryData.id;
      var list = templateList(filelist);
      var template = templateHTML(title, list,
        // id는 hidden을 활용해 수정 전의 title로 배정
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p><input type="text" name="title" placeholder="title" value=${title}></p>
          <p>
              <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
        </form>
      `
        ,
        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
      response.writeHead(200);
      response.end(template);
      });
    });
  } else if(pathname === '/update_process'){ //수정한 파일이름, 내용 수정
    var body='';
    request.on('data', function(data){ //data라는 인수를 통해 수신한 정보를 줌.
      body += data;
      if (body.length > 1e6){ //data가 너무 길어지면 통신을 중단함.
        request.connection.destroy();
      }
    });
    request.on('end', function(){ //들어올 정보가 없으면 end 콜백함수가 들어옴.
      var post = qs.parse(body);
      var id = post.id; //수정 전 타이틀(파일 이름)
      var title = post.title; //수정 후 타이틀
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function(err){
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end('success');
      })
      })
      console.log(post);
    });
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }
});

app.listen(3000);