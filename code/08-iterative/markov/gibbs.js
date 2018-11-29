// Gibbs Algorithm 的範例
// 問題：機率式有限狀態機，P(a=>b)=0.3, P(b=>a)=0.5 ; P(a=>b)=0.7, P(b=>b)=0.5
// 目標：尋找該「機率式有限狀態機」的穩態，也就是 P(a) = ?, P(b)=? 時系統會達到平衡。
const P = require('./prob')
function gibbs (P) {
  var P0 = {'a': P['a'], 'b': P['b'] }
  do {
    var P1 = { // 下一輪的機率分布。
      'a': P0['a'] * P['a=>a'] + P0['b'] * P['b=>a'], 
      'b': P0['a'] * P['a=>b'] + P0['b'] * P['b=>b']
    }
    console.log('P1 = %j', P1)
    var da = P1['a'] - P0['a'], db = P1['b'] - P0['b'] // 兩輪間的差異。
    var step = Math.sqrt(da * da + db * db) // 差異的大小
    P0 = P1
  } while (step > 0.001)  // 假如差異夠小的時候，就可以停止了。
  console.log('標準答案:P(a)=5/8=%d P(b)=3/8=%d', 5 / 8, 3 / 8) // 印出標準答案，以便看看我們找到的答案是否夠接近。
}

gibbs(P)
