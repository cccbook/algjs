// 參考： 自然語言處理 -- Hidden Markov Model http://cpmarkchang.logdown.com/posts/192352
const P = require('./prob')
function markov(s) {
  let p = P[s[0]]
  for (let i=1; i<s.length; i++) {
    let key = s[i-1]+'=>'+s[i]
    p = p * P[key]
  }
  return p
}

const seq = ['b', 'a', 'b', 'b']

console.log('P(%j)=%d', seq, markov(seq))