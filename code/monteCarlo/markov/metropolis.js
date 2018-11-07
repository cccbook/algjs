// Metropolis Hasting 的範例
// 問題：機率式有限狀態機，P(a)=0.2, P(b)=0.3, P(c)=0.1
// 目標：尋找「轉移矩陣」的穩態，也就是 Q(x→y)=? 時系統會達到細緻平衡 (每條連線都平衡了)。

const P = {
  'a': 0.2, 'b': 0.7, 'c': 0.1,
  'a=>a': 0.5, 'a=>b':0.3, 'a=>c':0.2, 
  'b=>a': 0.1, 'b=>b':0.2, 'b=>c':0.7,
  'c=>a': 0.3, 'c=>b':0.3, 'c=>c':0.4,
}

function MetropolisHasting (P, S) {
  var Q = P // 初始機率分佈
  var A = {} // 入出比 = 流入/流出
  do {
    console.log('Q = %j', Q)
    var Qn = {}
    for (let x of S) { // 計算 A 矩陣 = 入出比 = 流入/流出
      for (let y of S) {
        Qn[x+'=>'+y] = Q[x+'=>'+y]
        A[x+'=>'+y] = (P[y] * Q[y+'=>'+x]) / (P[x] * Q[x+'=>'+y]) // 入出比 = 流入/流出
        console.log('x=%s y=%s, A[x=>y]=%d P[y]*Q[y=>x]=%d P(x)*Q[x=>y]=%d', x, y, A[x+'=>'+y], P[x]*Q[x+'=>'+y], P[y]*Q[y+'=>'+x])
      }
    }
    console.log('A = %j', A)
    var diff = 0
    for (let x of S) {
      for (let y of S) { // 計算下一代 Qn 矩陣
        if (A[x+'=>'+y] < 1) {  // 入出比 < 1 ，代表流入太少，流出太多
          Qn[x+'=>'+y] = Q[x+'=>'+y] * A[x+'=>'+y] // 降低流出量
          Qn[x+'=>'+x] = Qn[x+'=>'+x] + Q[x+'=>'+y] * (1 - A[x+'=>'+y]) // 『規一化』調整
          diff += Math.abs(Qn[x+'=>'+y] - Q[x+'=>'+y]) // 計算新舊矩陣差異
        }
      }
    }
    Q = Qn
    console.log('diff = %d', diff)
  } while (diff > 0.001)  // 假如差異夠小的時候，就可以停止了。
}

MetropolisHasting(P, ['a', 'b', 'c'])
