const koa = require('koa')
const app = new koa()

const router = require('koa-router')
const _ = new router()

const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const PORT = process.env.PORT || 8000;

_.get('/', (ctx) => home(ctx))

async function home(ctx){
  console.log('yaya')
  ctx.body = 'hej'
}

app
  .use(logger())
  .use(bodyParser())
  .use(_.allowedMethods())
  .use(_.routes())
  .listen(PORT, '0.0.0.0', () => console.log(`Server listening on http://localhost:${PORT}..`))
