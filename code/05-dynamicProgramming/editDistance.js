function editDistance (b, a){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var m = [];
  for (let i = 0; i <= b.length; i++) m[i] = [i]
  for(let j = 0; j <= a.length; j++) m[0][j] = j

  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        m[i][j] = m[i-1][j-1]
      } else {
        m[i][j] = Math.min(m[i-1][j-1] + 1, // 取代
                           Math.min(m[i][j-1] + 1, // 插入
                                    m[i-1][j] + 1)); // 刪除
      }
    }
  }

  return {d:m[b.length][a.length], m:m};
}

function align(b, a, m) {
  let i = b.length, j = a.length
  let bx = '', ax = ''
  while (i > 0 && j > 0) {
    if (m[i][j] === m[i-1][j] + 1) { // 插入 b[i]
      i--
      ax = ' '  + ax
      bx = b[i] + bx
    } else if (m[i][j] === m[i][j-1] + 1) { // 插入 a[j]
      j--
      ax = a[j] + ax
      bx = ' '  + bx
    } else if ((m[i][j] === m[i-1][j-1] + 1) // 取代
    || (m[i][j] === m[i-1][j-1])) { // 相同
     i--
     j--
     bx = b[i] + bx
     ax = a[j] + ax
    } 
  }
  while (i> 0) {
    i--
    bx = b[i] + bx
    ax = ' ' + ax
  }
  while (j > 0) {
    j--
    ax = a[j] + ax
    bx = ' ' + bx
  }
  console.log('bx=', bx)
  console.log('ax=', ax)
}

var a, b
/*
a = "010100001"
b = "010100010"
console.log("dist(%s,%s) = %s", a, b, editDistance(a,b))
*/
//b = "ATG  ATCCG"
a   = "ATGCAATCCC"
b   = "ATGATCCG"
//b = "  TCCGAA"
// a   = "ATCCCAAA"
// b   = "TCCGAA"
let e = editDistance(b, a)
console.log("dist(%s,%s) = %s", b, a, e.d)
console.log('======m=========\n', e.m)
align(b, a, e.m)
