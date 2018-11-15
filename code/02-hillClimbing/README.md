# 爬山演算法 -- 最簡單的優化算法

## 爬山演算法

```
Algorithm HillClimbing(f, x)
  x = 隨意設定一個解
  while (x 有鄰居 x1 比 x 更高)
    x = x1
  end
  return x
end
```

## 實作：以爬山演算法尋找函數最高點

```
$ node .\hillClimbingSimple.js
f(0.0000)=-5.0000
f(-0.0100)=-4.9701
f(-0.0200)=-4.9404
f(-0.0300)=-4.9109
f(-0.0400)=-4.8816
f(-0.0500)=-4.8525
f(-0.0600)=-4.8236
f(-0.0700)=-4.7949
f(-0.0800)=-4.7664
f(-0.0900)=-4.7381
...
f(-1.4600)=-2.7516
f(-1.4700)=-2.7509
f(-1.4800)=-2.7504
f(-1.4900)=-2.7501
f(-1.5000)=-2.7500
```

## 通用爬山演算法框架

請看 [hillClimbingFramework](hillClimbingFramework) !

## 模擬退火法

```js
# 模擬退火法 (Simulated-Annealing)

## 演算法

```
Algorithm SimulatedAnnealing(s)
  while (溫度還不夠低，或還可以找到比 s 更好的解 s' 的時候)
    根據能量差與溫度，用機率的方式決定是否要移動到新解 s'。
    將溫度降低一些
  end
end
```

## 通用模擬退火法框架

請看 [simulatedAnnealing](hillClimbingFramework) !

