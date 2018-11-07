const argmax = require('../lib/argmax')
// 參考： https://zh.wikipedia.org/wiki/%E7%BB%B4%E7%89%B9%E6%AF%94%E7%AE%97%E6%B3%95

// N 0.6 => 喵 0.4 | 汪 0.6
// V 0.4 => 喵 0.5 | 汪 0.5
//    N   V
// N  0.3 0.7
// V  0.8 0.2
const P = {
  'N': 0.6,
  'V': 0.4,
  'N=>N': 0.3,
  'N=>V': 0.7,
  'V=>N': 0.8,
  'V=>V': 0.2,
  'N=>喵': 0.4,
  'N=>汪': 0.6,
  'V=>喵': 0.5,
  'V=>汪': 0.5,
}

function viterbi(obs, states, P) {
  console.log('觀察到的序列=', obs)
  const T = [{}] // Viterbi Table
  let path = {}  // path[state] = 從 0 到 t 到達 state 機率最大的 path
  for (let y of states) { // # Initialize base cases (t == 0)
    T[0][y] = P[y] * P[y+'=>'+obs[0]]
    path[y] = [y]
  }
  // console.log('T=%j path=%j', T, path)
  for (let t=1; t<obs.length; t++) { // # Run Viterbi for t > 0
    T[t] = {}
    let newpath = {}
    for (let y of states) {
      let {max:prob, index:si} = argmax(states.map((y0)=>T[t-1][y0] * P[y0+'=>'+y] * P[y+'=>'+obs[t]]))
      let state = states[si]
      // console.log('y=%s prob=%d state=%s', y, prob, state)
      T[t][y] = prob
      newpath[y] = path[state].concat(y)
    }
    // console.log('t=%d T=%j', t, T)
    path = newpath
    console.log('t=%d path=%j', t, path)
  }
  let {max:prob, index:si} = argmax(states.map((y)=>T[obs.length - 1][y]))
  console.log('T=%j', T)
  return {prob, path:path[states[si]]}
}

let {prob, path} = viterbi('喵 喵 汪'.split(' '), ['N', 'V'], P)
console.log('prob=%d path=%j＝最可能的隱序列', prob, path)