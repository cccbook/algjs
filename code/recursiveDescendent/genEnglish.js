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
  return R.randSelect(["dog", "cat"]);
}

function V() {
  return R.randSelect(["chase", "eat"]);
}

function DET() {
  return R.randSelect(["a", "the"]);
}

console.log(S());