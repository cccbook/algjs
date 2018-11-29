var f1 = (x) => 3 / x
var f2 = (x) => x - 1 / 4 * (x * x - 3)
var f3 = (x) => 1 / 2 * (x + 3 / x)

var x1, x2, x3
x1 = x2 = x3 = 1
for (var i = 0; i < 20; i++) {
  x1 = f1(x1);  x2 = f2(x2); x3 = f3(x3)
  console.log('x1:', x1, 'x2', x2, 'x3', x3)
}
