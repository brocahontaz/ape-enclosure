const router = require('koa-router')
const _ = new router({
  prefix: '/'
})

_.get('/', (ctx) => home(ctx))

async function home(ctx){
  console.log('yaya')
  ctx.body = 'hej'
}

module.exports = _.routes()