function h(f, input) {
  let result = f(input)
  return true
}

function f1(n) {
  return n * n
}

function f2(n) {
  let s = 0
  for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      for (let k=0; k<n; k++) {
        for (let g=0; g<n; g++) {
          s = s+1
        }
      }
    }
  }
}

console.log('h(f1,3)=', h(f1, 3))
console.log('h(f2,1000)=', h(f2, 1000))

