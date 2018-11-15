# 第 10 章 - 分割擊破法 Divide & Conquer

## 二分搜尋法

如果你曾經學過《演算法》， 應該曾經使用過《二分搜尋法》

對於一個《連續函數》而言， 假如我們知道兩個點 (a,b) ，其值 f(a)>0 且 f(b)<0 ，這樣的話勢必有一個介於 (a,b) 之間的 c 值使得 f(c)=0， 假如我們每次都取 ，然後判斷要繼續搜 尋哪一半的話，這樣我們就得到了一個《二分搜 尋法》，可以較快速的找出 f(x)=0 的解答！

其想法圖示如下：

![](img/binarySearch.png)

二分搜尋法求根的程式如下：

檔案： binarySearch.js

```javascript
function f(x) {
  return x*x-4*x+1;
}

function bsolve(f,a,b) {
  var c = (a+b)/2;
  if (Math.abs(a-b) < 0.00001)
    return c;
  if (f(c)*f(a)>=0)
    return bsolve(f, c, b);
  else
    return bsolve(f, a, c);
}

var x=bsolve(f, 0, 1);
console.log("x=", x, " f(x)=", f(x));
```

執行結果：

```
D:\Dropbox\gitbook\rlab\code\solveEquation>node binarySearch.js
x= 0.2679481506347656  f(x)= 0.0000036088895285502076
```

當然， 我們也可以改用另一種中間值的取法，像是用《線性內插法》在某些狀況下會更好！

![](img/linearInterpolation.png)


以上的這種搜尋法，不管是二分搜尋法，或者是線性內插法，速度通常都不會太慢！

如果您學過演算法中的 Big O 的複雜度概念，就會知道二分搜尋法的複雜度為 O(log n)，只是在此問題中 n 應該改為兩個邊界值之間的差，也就是 (b-a)，所以複雜度是 O(log b-a)。

但是、二分搜尋法求根的一個小問題，是必須要先找出一組 (a,b)，滿足 f(a) 和 f(b) 兩者正負號相反。

而且二分搜尋法並不是找出所有的根，而是只找出一個根，這和暴力法找範圍內全部的根有所不同！

現在、我們已經學過兩個方法了， 而且這兩個方法都要先鎖定一個範圍，這種鎖定範圍的方法，稱為《界定法》 (Bracketing Method) 。

接著， 讓我們看看另外一類的方法， 這種方法不需要鎖定範圍，因此稱為《開放式方法》！
