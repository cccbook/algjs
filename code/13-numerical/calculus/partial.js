// 函數 f 對變數 k 的偏微分: partial(p) / dk
let partial = function (f, p, k, h=0.01) {
  let p1 = Object.assign({}, p)
  p1[k] += h
  return (f(p1) - f(p)) / h
}

let f = function (p) {
  let x = p.x, y = p.y
  return x*x + y*y
}

console.log('df(x:3,y:2)/dx=', partial(f, {x:3, y:2}, 'x'))
console.log('df(x:3,y:2)/dy=', partial(f, {x:3, y:2}, 'y'))

