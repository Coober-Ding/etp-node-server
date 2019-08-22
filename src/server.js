const Koa = require('koa')
const {SimpleWebpack} = require('./externals.js')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')()

const webpack = new SimpleWebpack()
const app = new Koa();
// webpack服务
router.post('/webpack', (ctx, next) => {
  const reqData = ctx.request.body
  return webpack.compile({
    name: reqData.name,
    contextPath: reqData.contextPath,
    fileBuffer: reqData.code
  }).then(compilation => {
    ctx.response.body = JSON.stringify({
      code: compilation.module.source.content,
      depence: compilation.module.depence
    })
    ctx.response.status = 200
    ctx.response.headers['Content-Type'] = 'application/json'
  }, (err) => {
    ctx.response.body = JSON.stringify({
      err: err.toString()
    })
    ctx.response.status = 200
    ctx.response.headers['Content-Type'] = 'application/json'
  })
})

app.use(bodyParser)
app.use(router.routes())
app.listen(8889)
