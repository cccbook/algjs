const nn = require('../../nn')
const f = require('./f')

console.log('df(f(x:1,y:1), x) = ', nn.df(f, {x:1, y:1}, 'x'))

console.log('grad(f(x:1,y:1))=', nn.grad(f, {x:1, y:1}))
