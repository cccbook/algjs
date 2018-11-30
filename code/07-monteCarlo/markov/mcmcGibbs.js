const P = require('./prob')

const rnd = Math.random
function mcmc() { // Monte Carlo Markov Chain
  let s1 = (rnd() < P['a']) ? 'a' : 'b'
  let s2 = (rnd() < P[s1+'=>'+'a']) ? 'a' : 'b'
  if (s1 == s2) return
  P[s1] -= 0.0001
  P[s2] += 0.0001
}

function gibbs(n) {
  for (let i=0; i<n; i++) {
    mcmc()
  }
}

console.log("P=%j", P)
gibbs(1000000)
console.log('P=%j', P)

