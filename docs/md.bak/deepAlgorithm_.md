# 深度學習背後的算法
  
  
深度學習 (Deep Learning) 是人工智慧領域當紅的一個技術，說穿了其實就是《神經網路》(Neural Network) ，但是因為加上了一些新的模型 (像是捲積神經網路 CNN, 循環神經網路 RNN 與生成對抗網路 GAN)，還有在神經網路的層數上加深很多，從以往的 3-4 層，提升到了十幾層，甚至上百層，於是我們給這些技術一個統稱，那就是《深度學習》。
  
雖然《深度學習》的神經網路層數變多了，《網路模型》也多了一些，但是背後的學習算法和運作原理並沒有多大改變，仍然是以《梯度下降》(Gradient Descendent) 和《反傳遞算法》(Back Propagation) 為主。
  
但是《梯度下降》和《反傳遞算法》兩者，幾乎都是以數學的形式呈現，其中《梯度》的數學定義如下：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;nabla_{x} f(x) = &#x5C;left[ &#x5C;frac{&#x5C;partial }{&#x5C;partial x_1} f(x), &#x5C;frac{&#x5C;partial }{&#x5C;partial x_2} f(x),&#x5C;cdots,&#x5C;frac{&#x5C;partial }{&#x5C;partial x_n} f(x) &#x5C;right]^T=&#x5C;frac{&#x5C;partial }{&#x5C;partial{x}} f(x)"/></p>
  
若把《梯度》當成一個《巨型算子》可以寫為如下形式：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;nabla_{x} = &#x5C;left[ &#x5C;frac{&#x5C;partial }{&#x5C;partial x_1}, &#x5C;frac{&#x5C;partial }{&#x5C;partial x_2},&#x5C;cdots,&#x5C;frac{&#x5C;partial }{&#x5C;partial x_n} &#x5C;right]^T=&#x5C;frac{&#x5C;partial }{&#x5C;partial{x}}"/></p>
  
這樣的數學雖然只是《基本的偏微分》，但是卻足以嚇倒很多人，包括我在內！
  
《反傳遞算法》的運作原理，則是建築在《微積分的鏈鎖規則》上，如以下算式所示：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;frac{&#x5C;partial{f(q,z)}}{&#x5C;partial{x}} = &#x5C;frac{&#x5C;partial{q(x,y)}}{&#x5C;partial{x}} &#x5C;frac{&#x5C;partial{f(q,z)}}{&#x5C;partial{q}}"/></p>
  
根據這兩個數學式，人工智慧領域發展出了一整套《神經網路訓練算法》，稱為《反傳遞算法》，可以用來訓練《神經網路》，讓程式可以具有《函數優化》的能力。
  
有了函數優化的能力，程式就能向《一群樣本與解答》學習，優化《解答的能力》，進而解決《手寫辨識、語音辨識、影像辨識》甚至是《機器翻譯》等問題。
  
如果我們有個函數能計算《錯誤率》，那麼透過《優化算法》，我們就能找到讓錯誤率很低的函數，這個錯誤率很低的函數，就很少會在《那些學習樣本》上回答錯誤，如果這個函數還具有《通用延展性》，也就是在《非學習樣本上》也表現得同樣良好，那麼這個函數基本上就解決了該問題。
  
在本文中，我們將從《梯度下降法》開始，讓熟悉程式的人能夠輕易的透過《程式》來理解《深度學習背後的那些數學》！
  
## 梯度
  
  
如前所述，《梯度》的數學定義如下：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;nabla_{x} f(x) = &#x5C;left[ &#x5C;frac{&#x5C;partial }{&#x5C;partial x_1} f(x), &#x5C;frac{&#x5C;partial }{&#x5C;partial x_2} f(x),&#x5C;cdots,&#x5C;frac{&#x5C;partial }{&#x5C;partial x_n} f(x) &#x5C;right]^T=&#x5C;frac{&#x5C;partial }{&#x5C;partial{x}} f(x)"/></p>
  
問題是、這樣的符號對程式人有點可怕，我們怎麼改用程式來計算《梯度》呢？
  
其實、很多數學只要回到基本定義，就一點都不可怕了！
  
讓我們先回頭看看梯度中的基本元素，也就是偏微分，其定義是：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;frac{&#x5C;partial }{&#x5C;partial x_1} f(a) = &#x5C;lim_{h &#x5C;to 0} &#x5C;frac{f(a_1, ..., a_i+h, ...., a_n)-f(a_1, ..., a_i, ...., a_n)}{h}"/></p>
  
舉例而言，假如對 <img src="https://latex.codecogs.com/gif.latex?f(x,y) = x^2+y^2"/>  這個函數而言，其對 x 的偏微分就是：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;frac{&#x5C;partial }{&#x5C;partial x} f(x,y) = &#x5C;lim_{h &#x5C;to 0} &#x5C;frac{f(x+h,y)-f(x,y)}{h}"/></p>
  
而對 y 的偏微分就是：
  
<p align="center"><img src="https://latex.codecogs.com/gif.latex?&#x5C;frac{&#x5C;partial }{&#x5C;partial y} f(x,y) = &#x5C;lim_{h &#x5C;to 0} &#x5C;frac{f(x,y+h)-f(x,y)}{h}"/></p>
  
於是我們可以寫一個函數 df 來計算偏微分：
  
```js
nn.df = function (f, p, k) {
  let h = nn.step
  let p1 = nn.clone(p)
  p1[k] += h
  return (f(p1) - f(p)) / h
}
```
  
這樣我們就可以用下列指令計算出 f(x,y) 在 (1,1) 這點的偏導數：
  
```js
nn.df(f, {x:1, y:1}, 'x')
```
  
只要我們對每個變數都取偏導數，然後形成一個向量，就能計算出《梯度》了！ 其 JavaScript 程式如下：
  
```js
// 函數 f 在點 p 上的梯度
nn.grad = function (f, p) {
  let gp = {}
  for (let k in p) {
    gp[k] = nn.df(f, p, k)
  }
  return gp
}
```
  
於是我們可以用 grad() 下列程式計算 f 在 (1,1) 這點的梯度。
  
```js
nn.grad(f, {x:1, y:1})
```
  
假如我們定義函數 f 為 <img src="https://latex.codecogs.com/gif.latex?f(x,y) = x^2+y^2"/> ，那麼 f 在 (1,1) 的梯度將會是 (2x, 2y) = (2,2)。
  
讓我們用程式實作一下，並驗證看看梯度的計算是否正確：
  
先定義函數 <img src="https://latex.codecogs.com/gif.latex?f(x,y) = x^2+y^2"/>
  
```js
module.exports = function f (p) {
  let x = p.x, y = p.y
  return (x * x + y * y)
}
```
  
然後呼叫我們的示範套件 nn，看看其計算結果是否正確：
  
```js
const nn = require('../../nn')
const f = require('./f')
  
console.log('df(f(x:1,y:1), x) = ', nn.df(f, {x:1, y:1}, 'x'))
  
console.log('grad(f(x:1,y:1))=', nn.grad(f, {x:1, y:1}))
  
```
  
執行結果如下：
  
```
$ node .\gradientEx.js
df(f(x:1,y:1), x) =  2.010000000000023
grad(f(x:1,y:1))= { x: 2.010000000000023, y: 2.010000000000023 }
```
  
您可以看到《偏微分與梯度》的計算，基本上都非常接近，所以是正確的。
  
## 梯度下降法
  
  
只要能計算梯度，那麼要實作《梯度下降法》就很容易了，我們可以呼叫上述的梯度函數 nn.grad(f, p) ，輕而易舉地設計出《梯度下降法》程式如下：
  
```js
nn.optimize = function (f, p0) {
  let p = nn.clone(p0)
  while (true) {
    console.log('p=', pv.str(p), 'f(p)=', f(p))
    let gp = nn.grad(f, p)
    let norm = pv.norm(gp)
    if (norm < 0.00001) {
      break
    }
    let gstep = pv.mul(gp, -1 * nn.step)
    p = pv.add(p, gstep)
  }
  return p
}
  
```
  
然後讓我們測試看看，該算法是否能找到 <img src="https://latex.codecogs.com/gif.latex?f(x,y) = x^2+y^2"/> 的最低點。
  
```
$ node .\gradientDescendent.js
p= {x:1.0000, y:1.0000} f(p)= 2
p= {x:0.9799, y:0.9799} f(p)= 1.920408019999999
p= {x:0.9602, y:0.9602} f(p)= 1.8439757616079993
p= {x:0.9409, y:0.9409} f(p)= 1.7705779422643224
p= {x:0.9220, y:0.9220} f(p)= 1.7000942437503355
p= {x:0.9034, y:0.9034} f(p)= 1.6324091155375082
..中間省略 ...
p= {x:-0.0038, y:-0.0038} f(p)= 0.000029193378572034838
p= {x:-0.0038, y:-0.0038} f(p)= 0.00002955498084296176
p= {x:-0.0039, y:-0.0039} f(p)= 0.000029911510462712392
p= {x:-0.0039, y:-0.0039} f(p)= 0.000030262983372298253
```
  
結果果然找到 (x,y)=(0, 0) 這個最低點的區域，因此上述的方法，基本上就已經實作出《梯度下降法》了。
  
## 上述方法的缺點
  
  
以上的《梯度下降法》，是採用計算 <img src="https://latex.codecogs.com/gif.latex?&#x5C;frac{f(x+h, y) - f(x, y)}{h}"/> 這樣的方式，重複呼叫 f 兩次後達成的。
  
假如函數 f 的參數有 n 個，那麼要算出梯度，就必須重複的呼叫 n 次以上的 f 函數，因為至少要計算 f(x1+h, ....), f(x1, x2+h, ....), .... f(x1, x2, ..., xn+h)。
  
這樣當參數數量 n 很大的時候，梯度的計算就會變得很慢，因此我們必須想辦法加速《梯度的計算速度》。
  
而《反傳遞演算法》，就是用來加速《梯度計算》的一種方法，這種方法依靠的是《自動微分》功能，想辦法從後面一層的差值，計算出前面一層應該調整的方向與大小。
  