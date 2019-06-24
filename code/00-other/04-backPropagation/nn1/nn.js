const G = require('./lib/grad')

const nn = module.exports = Object.assign(G, {
  pv: require('./lib/pvector'),
  Node: require('./lib/node'),
  Gate: require('./lib/gate'),
  Net: require('./lib/net'),
  FNet: require('./lib/fnet')
})

nn.optimize = nn.gd = nn.gradientDescendent
