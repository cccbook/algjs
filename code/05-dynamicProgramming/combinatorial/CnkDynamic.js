// http://mathworld.wolfram.com/PascalsFormula.html
// https://en.wikipedia.org/wiki/Pascal%27s_rule
// https://en.wikipedia.org/wiki/Pascal%27s_triangle
// https://en.wikipedia.org/wiki/Binomial_coefficient
/*
c(n, k) = 0                        , if n < k
        = 1                        , if k = 0 or k = n
        = c(n-1, k-1) + c(n-1, k)  , if k <= n-k
        = c(n, n-k)                , if k > n-k
*/

function c(N, K) {
  var C = [];
  for (let n=0; n<=N; n++) {
    C[n] = [1]
    C[0][n] = 0
  }
  for (let n=1; n<=N; n++) {
    for (let k=1; k<=N; k++) {
      let k0 = (k <= n-k) ? k : n-k
      if (n < k)
        C[n][k] = 0
      else if (n===k)
        C[n][k] = 1
      else
        C[n][k] = C[n][n-k] = C[n-1][k0-1] + C[n-1][k0]
    }
  }
  /*
  for(let n=0; n<=N; n++) {
    console.log("C[%d]=%j", n, C[n])
  }
  */
  return C[N][K];
}

console.log("c(5,2)=", c(5,2))
console.log("c(7,3)=", c(7,3))
console.log("c(12,5)=", c(12,5))
console.log("c(60,30)=", c(60,30))