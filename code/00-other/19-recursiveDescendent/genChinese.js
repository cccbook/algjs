var R = require('./random')
/*
for (var i=0; i<10; i++) {
  var animal = randSelect(['dog', 'cat']);
  console.log("%s", animal);
}
*/
/*
S = NP VP
NP = DET N
VP = V NP
N = dog | cat
V = chase | eat
DET = a | the
*/

function S() {
  return NP()+" "+VP();
}

function NP() {
  return DET()+" "+N();
}

function VP() {
  return V()+" "+NP();
}

function N() {
  return R.randSelect(["狗", "貓"]);
}

function V() {
  return R.randSelect(["追", "吃"]);
}

function DET() {
  return R.randSelect(["一隻", "這隻"]);
}

console.log(S());