function editDistance (a, b){
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

  return m[b.length][a.length];
}

var a, b

a = "010100001"
b = "010100010"
console.log("dist(%s,%s) = %s", a, b, editDistance(a,b))

a = "ATGCAATCCC"
b = "ATGATCC"
console.log("dist(%s,%s) = %s", a, b, editDistance(a,b))
