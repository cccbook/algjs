var C = []

function c(n, k) {
  if (k < 0 || k > n) return 0
  if (k > n-k) k = n - k
  if (C[n] == null) C[n] = []
  if (C[n][k] != null) return C[n][k]
  if (k==0 || n <= 1)
    C[n][k] = 1
  else 
    C[n][k] = c(n-1,k) + c(n-1, k-1)
  return C[n][k]
}

console.log("c(5,2)=", c(5,2))
console.log("C=%j", C);
console.log("c(7,3)=", c(7,3))
console.log("c(12,5)=", c(12,5))
console.log("c(60,30)=", c(60,30))

/*

https://en.wikipedia.org/wiki/Binomial_coefficient

def binomialCoefficient(n, k):
    if k < 0 or k > n:
        return 0
    if k > n - k: # take advantage of symmetry
        k = n - k
    if k == 0 or n <= 1:
    	return 1
    return binomialCoefficient(n-1, k) + binomialCoefficient(n-1, k-1)
*/