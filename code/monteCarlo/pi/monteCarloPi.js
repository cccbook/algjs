function monteCarloPi(n) {
  let hits = 0
  for (let i=0;i<n; i++) {
    let x = Math.random()
    let y = Math.random()
    if (x*x+y*y <= 1) hits++
  }
  return 4*(hits/n)
}

console.log('MonteCarloPi(100000)=', monteCarloPi(100000))