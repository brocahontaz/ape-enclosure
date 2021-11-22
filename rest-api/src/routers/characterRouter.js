const router = require('koa-router')
const _ = new router({
  prefix: '/'
})

_.get('/', (ctx) => character(ctx))

async function character(ctx){
  console.log('yaya')
  ctx.body = 'chalalala'
}

module.exports = _.routes()