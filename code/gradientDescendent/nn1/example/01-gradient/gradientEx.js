const G = require('../../lib/grad')
const f = require('./f')

console.log('df(f(x:1,y:1), x) = ', G.df(f, {x:1, y:1}, 'x'))

console.log('grad(f(x:1,y:1))=', G.grad(f, {x:1, y:1}))
