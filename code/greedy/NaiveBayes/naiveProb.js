// P(x,y,z) = P(x) * P(y) * P(z)
function naiveProb(prob, list) {
  let p = 1
  for (let e of list) p = p*prob[e]
  return p
}

const prob = {
  x: 0.5,
  y: 0.2,
  z: 0.3
}

console.log('P(x,y,z) = ', naiveProb(prob, ['x','y','z']))
