# 通用的爬山演算法架構

* [hillClimbing.js](hillClimbing.js)

## 實作：通用的爬山演算法架構

* [hillClimbingNumber.js](hillClimbingNumber.js)
  * [solutionNumber.js](../solution/solutionNumber.js)

```
$ node .\hillClimbingNumber
s=energy(0.000)=4.000
0: energy(0.010)=4.000
1: energy(0.020)=4.000
4: energy(0.030)=3.999
6: energy(0.040)=3.998
9: energy(0.050)=3.998
...
409: energy(1.960)=0.158
410: energy(1.970)=0.119
412: energy(1.980)=0.080
414: energy(1.990)=0.040
415: energy(2.000)=0.000
solution: energy(2.000)=0.000
```

## 實例 2 ：多變數函數的最佳化

* [hillClimbingArray.js](hillClimbingArray.js)
  * [solutionArray.js](../solution/solutionArray.js)

```
$ node .\hillClimbingArray
s=energy( 1.000  1.000  1.000 )=1.000
1: energy( 1.000  0.990  1.000 )=0.970
3: energy( 1.010  0.990  1.000 )=0.950
4: energy( 1.010  0.990  1.010 )=0.921
5: energy( 1.020  0.990  1.010 )=0.901
6: energy( 1.030  0.990  1.010 )=0.881
...
710: energy( 2.000  0.500  2.450 )=-2.998
716: energy( 2.000  0.500  2.460 )=-2.998
726: energy( 2.000  0.500  2.470 )=-2.999
728: energy( 2.000  0.500  2.480 )=-3.000
729: energy( 2.000  0.500  2.490 )=-3.000
732: energy( 2.000  0.500  2.500 )=-3.000
solution: energy( 2.000  0.500  2.500 )=-3.000
```

## 實例 3 ：線性聯立方程組求解

注意：

1. 原本算法只會調一個軸，所以如果傾斜的方向才有更低點，就會因找不到更低而停止了。
2. 後來調成能改 n 個軸，所以如果45度的方向有更低點，就不會停止了。(但是如果不是 45度，那還是有可能找不到)
3. 也可以改成調整方向是任意的，但這樣會嘗試更多狀況。

(問題是：聯立方程式的能量函數 ( ()^2 + ()^2 ....+ ()^2 ) 會不會有多個低點呢?)


* [hillClimbingEquation.js](hillClimbingEquation.js)
  * [solutionEquations.js](../solution/solutionEquations.js)

```
$ node .\hillClimbingEquation
s=energy([0.000 0.000])=26.000
1: energy([0.000 0.010])=25.920
4: energy([0.000 0.020])=25.841
6: energy([0.000 0.030])=25.762
9: energy([0.010 0.030])=25.642
...
1190: energy([2.950 2.000])=0.005
1196: energy([2.960 2.000])=0.003
1197: energy([2.970 2.000])=0.002
1225: energy([2.980 2.000])=0.001
1231: energy([2.990 2.000])=0.000
1235: energy([3.000 2.000])=0.000
solution: energy([3.000 2.000])=0.000
```
