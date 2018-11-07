function f (x) {
  return -1 * Math.abs(x * x - 4 * x + 1)
}

var dx = 0.01

function hillClimbing (f, x) {
  while (true) {
    if (f(x + dx) >= f(x)) {
      x = x + dx
    } else if (f(x - dx) >= f(x)) {
      x = x - dx
    } else {
      return x
    }
  }
}

var x = hillClimbing(f, 0.0)
console.log('x=', x, 'f(x)=', f(x))
