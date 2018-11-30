const P = require('./prob')

const rnd = Math.random
function mcmc(s) { // Monte Carlo Markov Chain
  if (rnd() > P[s[0]]) return 0
  for (let i=1; i<s.length; i++) {
    let key = s[i-1]+'=>'+s[i]
    if (rnd() > P[key]) return 0
  }
  return 1
}

function markov(s, n) {
  let pass = 0
  for (let i=0; i<n; i++) {
    pass += mcmc(s)
  }
  return pass/n;
}

const seq = ['b', 'a', 'b', 'b']

console.log('P(%j)=%d', seq, markov(seq, 100000))
