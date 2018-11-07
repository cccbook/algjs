const nn = require('../../nn')
const net = new nn.Net()

let x = net.variable(2)
let y = net.variable(1)
let x2 = net.mul(x, x)
let y2 = net.mul(y, y)
let o  = net.add(x2, y2)

net.watch({x,y,x2,y2,o})

module.exports = new nn.FNet(net, {x:x, y:y})
