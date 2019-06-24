var Matrix   = require("./matrix");
var Solution = require("./solution");         // 引入抽象的解答類別

/*
// A X = B ，求 X 是多少？  
// A=[[1,1],[1,-1]] B=[[5][1]]，也就是求：
//   x1+x2=5
//   x1-x2=1
// 的解答
var A = new Matrix([[1,1],[1,-1]]);
var B = new Matrix([[5,1]]).transpose();
*/
/*
var A = new Matrix([[1,1,1],[1,-1,1],[1,1,-1]]);
var B = new Matrix([[3,1,1]]).transpose();
*/

// 題目來源: http://mail.im.tku.edu.tw/~idliaw/LinTup/99ie/99IEntu.pdf

var A = new Matrix([[4,3,6],[1,1,2],[2,1,3]]);
var B = new Matrix([[1,2,-1]]).transpose();

var log = console.log;

Solution.zero = function() {
  // return new Solution(Matrix.create(2,1,0));
  return new Solution(Matrix.create(3,1,0));
}

Solution.prototype.neighbor = function() {    // 多變數解答的鄰居函數。
  var nx = new Matrix(this.v.m);              // 複製目前解的矩陣
  // 修改了這裡：最多改變 n 個維度(只是某些 n 維的例子可以，無法確定一定可以，除非能證明能量函數只有一個低點)
  for (let d = 0; d < nx.rows(); d++) {         // 原本只改一維，會找不到！
    var i = Math.floor(Math.random()*nx.rows());// 隨機選取一個變數
    if (Math.random() > 0.5)                    // 擲骰子決定要往左或往右移
      nx.m[i][0] += this.step * Math.random();  // 原本是 nx.m[i][0] += this.step 
    else
      nx.m[i][0] -= this.step * Math.random();  // 原本是 nx.m[i][0] -= this.step 
  }
  return new Solution(nx);                    // 傳回新建的鄰居解答。
}

Solution.prototype.energy = function() {      // 能量函數:計算 ||AX-B||，也就是 ||Y-B||
  var X = this.v;
  var Y = A.mul(X);
  return Y.sub(B).norm();
}

Solution.prototype.toString = function() {    // 將解答轉為字串的函數，以供列印用。
  return "energy("+this.v.transpose().toString().replace("\n", "")+")="+this.energy().toFixed(3);
}

module.exports = Solution;                    // 將解答類別匯出。