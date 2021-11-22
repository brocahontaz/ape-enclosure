const router = require('koa-router')
const _ = new router({
  prefix: '/'
})

_.get('signin', (ctx) => signin(ctx))

async function signin(ctx){
  console.log('yaya')
  ctx.body = 'hej'
}

module.exports = _.routes()