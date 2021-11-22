const koa = require('koa')
const app = new koa()

const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const PORT = process.env.PORT || 8000;

const home = require('./routers/homeRouter')
const character = require('./routers/characterRouter')
const apiRouter = require('./routers/index')


app
  .use(logger())
  .use(bodyParser())
  .use(apiRouter.allowedMethods())
  .use(apiRouter.routes())
  .listen(PORT, '0.0.0.0', () => console.log(`Server listening on http://localhost:${PORT}..`))
