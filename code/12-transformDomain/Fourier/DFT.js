var Complex = require('./complex')
var p = Complex.parse

var DFT = function (f) {
  let N = f.length
  let F = []
  for (let n=0; n<N; n++) F[n] = Complex.parse('0+0i')
  for (let x=0; x<N; x++) {
    for (let n=0; n<N; n++) {
      let exp = Complex.expi((-2.0*Math.PI*x)/N*n)
      let fexp = f[x].mul(exp)
      F[n] = F[n].add(fexp)
    }
  }
  return F
}

var iDFT = function (F) {
  let N = F.length
  let f = []
  for (let x=0; x<N; x++) f[x] = Complex.parse('0+0i')
  for (let n=0; n<N; n++) {
    for (let x=0; x<N; x++) {
      let exp = Complex.expi((2.0*Math.PI*x)/N*n)
      let Fexp = F[n].mul(exp)
      Fexp.r /= N; Fexp.i /= N;
      f[x] = f[x].add(Fexp)
    }
  }
  return f
}

var steps = function(from, to, step = 1) {
	var a=[];
	for (var t=from; t<=to; t+=step)
		a.push(t);
	return a;
}

var x = steps(0, 10*Math.PI, Math.PI/8)
var f = x.map(Complex.expi)

console.log('f=%s', f)
F = DFT(f)
console.log('F=DFT(f)=%s', F)
f2 = iDFT(F)
console.log('f2=iDFT(F)=%s', f2)
