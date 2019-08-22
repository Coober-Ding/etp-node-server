var http = require("http")
var SimpleWebpack = require("./simple-webpack/simple-webpack.js")
var webpack = new SimpleWebpack()
http.createServer(function (request, response) {
  request.setEncoding('utf8');
  let data = ''
  request.on('data', function (chunk) {
    data = data + chunk
  })
  request.on('end', function () {
    data = JSON.parse(data)
    let name = data.name
    let code = data.code
    let constextPath = data.constextPath
    compile(name, code, constextPath).then(function (compilation) {
      doSuccess(compilation, response)
    }, function (err) {
      doError(err, response)
    })
  })
}).listen(8889);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8889/')

function compile (name, code, constextPath) {
  return webpack.compile({
    name,
    constextPath,
    fileBuffer: code
  })
}

function doSuccess (compilation, response) {
  let body = JSON.stringify({
    code: compilation.module.source.content,
    depence: compilation.module.depence
  })
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.end(body)
  console.log(compilation.useTime)
}
function doError (err, response) {
  let body = JSON.stringify({
    err: err.toString()
  })
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.end(body)
}