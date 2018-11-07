const pv = require('./lib/pvector')
const nn = module.exports = {
  pv: pv
}

nn.step = 0.01

nn.clone = function (o) {
  return {...o}
}

// 函數 f 對變數 k 的偏微分: df(p) / dk
nn.df = function (f, p, k, h=nn.step) {
  let p1 = nn.clone(p)
  p1[k] += h
  return (f(p1) - f(p)) / h
}

// 函數 f 在點 p 上的梯度	∇f(p)
nn.grad = function (f, p) {
  let gp = {}
  for (let k in p) {
    gp[k] = nn.df(f, p, k) // 對變數 k 取偏導數後，放入梯度向量 gp 中
  }
  return gp
}

// 使用梯度下降法尋找函數最低點
nn.optimize = function (f, p0) {
  let p = nn.clone(p0)
  while (true) {
    console.log('p=', pv.str(p), 'f(p)=', f(p))
    let gp = nn.grad(f, p) // 計算梯度 gp
    let norm = pv.norm(gp) // norm = 梯度的長度 (步伐大小)
    if (norm < 0.00001) {  // 如果步伐已經很小了，那麼就停止吧！
      break
    }
    let gstep = pv.mul(gp, -1 * nn.step) // gstep = 逆梯度方向的一小步
    p = pv.add(p, gstep) // 向 gstep 方向走一小步
  }
  return p // 傳回最低點！
}
