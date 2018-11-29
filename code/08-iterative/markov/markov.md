# 馬可夫鏈

## 簡介

「馬可夫鏈」是一種具有狀態的隨機過程，有點像是「有限狀態機」，但是「從目前狀態轉移 s 到下一個狀態 s' 的機率」由 $$Q(s \to s')$$ 所表示，這個狀態之轉移機率並不會受到狀態以外的因素所影響，因此與時間無關。

隨機漫步就是馬可夫鏈的例子。隨機漫步中每一步的狀態是在圖形中的點，每一步可以移動到任何一個相鄰的點，在這裡移動到每一個點的概率都是相同的(無論之前漫步路徑是如何的)。

假如我們不斷的觀察某種隨機現象，會看到許多一連串的觀察值 $$x_1, x_2,..., x_n$$ ，這些觀察值會形成整個隨機現象空間 $$X_1, X_2,..., X_n$$。

假如這些觀察值之間有某種因果關係，那麼我們就有可能透過馬可夫過程描述此因果關係，舉例而言，如果每個事件只受到前一個事件的影響，那麼就可以用 $$P(X_{n+1} | X_n)$$ 表示此隨機現象，這種隨機過程稱為時間無關的馬可夫鏈 (Time-homogeneous Markov chains,  或稱為穩定型馬可夫鏈 stationary Markov chains)。

假如下一個觀察值可能受前 m 個觀察值所影響，那麼此種隨機過程可由機率分布 $$P(X_{n+1} | X_n, ..., X_{n-m+1})$$ 表示，因此稱為 m 階的馬可夫過程。

### 馬可夫系統的範例

對於一個具有「馬可夫特性」的「機率式有限狀態機」，我們可以用「機率轉移矩陣」進行描述，舉例而言：下圖顯示了一個只有兩個狀態的「馬可夫隨機系統」。

![圖、只有兩個狀態的馬可夫隨機系統](markov2state.jpg)

若要用機率模型描述上述兩個狀態的馬可夫系統，我們需要給定兩組機率值，第一組是狀態本身的機率 P(s0)、P(s1)。第二組是狀態轉移的機率 Q(s0→s0)、Q(s0→s1)、Q(s1→s0)、Q(s1→s1)。

長期來看、馬可夫系統通常最後會達到一個穩定平衡，在平衡的情況之下，每個節點的輸出將會等於該節點的輸入，這就是所謂的「一般平衡條件」。

### 馬可夫語言產生器

檔案： @[[genMarkov.js]](jscode/genMarkov.js)

```javascript
/* N    V     P
N  0.3  0.5   0.2
V  0.7  0.1   0.2
P  0.6  0.1   0.3 */

var Q = [
	[0.3, 0.5, 0.2],
	[0.7, 0.1, 0.2],
	[0.6, 0.1, 0.3]
];

var states = ["N", "V", "P"];

function genState(state) {
	var r = Math.random();
	var psum = 0;
	for (var toState=0; toState<Q[state].length; toState++) {
		psum += Q[state][toState];
		if (r < psum) {
			return toState;
		}
	}
}

function markov(state, max) {
	var sequence=[];
	for (var t=0; t<max; t++) {
		sequence.push(states[state]);
        var state = genState(state);
	}
	return sequence;
}

console.log(markov(0, 100).join(''));
```

執行結果

```
nqu-192-168-61-142:jscode mac020$ node genMarkov
NVNVNVPPNVVNNVNNVNNNVNVNNNVNVNVPNVNVNVNNVNVNNVNPNVNVNPVNPVNVNNPNVNNNNVNVNPPNNNVNPNVPNNNNNNNNNVNNVNVP
```



## 生成語法＋馬可夫語言產生器 (人貓魚的世界)

名詞："人", "貓", "魚"
動詞："養", "吃", "追", "餵"
量詞："隻", "位", "條"
定詞："這", "那", "一" 

### 生成語法

```
// VN 無法連上的問題

var R=require("./randomLib");

var WordsMap = {
  "N":["人", "貓", "魚"],
  "V":["吃", "追", "餵"],
  "Q":["隻", "個", "條"],
  "D":["這", "那", "一" ]
};

var QMap = {
  "QN":[
  [0.05, 0.90, 0.05],  // 隻
  [0.90, 0.05, 0.05],  // 個
  [0.05, 0.05, 0.90]], // 條
//  人     貓    魚 
  "VN":[
  [0.05, 0.05, 0.90],  // 吃
  [0.40, 0.50, 0.10],  // 追
  [0.20, 0.40, 0.40]], // 餵
//  人     貓    魚 
  "NV":[
  [0.30, 0.30, 0.40],  // 人
  [0.50, 0.45, 0.05],  // 貓
  [0.50, 0.45, 0.05]]  // 魚
//  吃     追    餵
};

function genState(state, Q) {
  var r = Math.random();
  var psum = 0;
  for (var toState=0; toState<Q[state].length; toState++) {
    psum += Q[state][toState];
    if (r < psum) {
      return toState;
    }
  }
}

var _tags  = [ "" ];
var _words = [ "" ];

function S() {
  NP(); VP();
}

function NP() {
  D(); Q(); N();
}

function VP() {
  V(); NP();
}

function genWord(tag) {
  var words     = WordsMap[tag];
  var lastTag   = _tags[_tags.length-1];
  var lastWord  = _words[_words.length-1];
    var tag2      = lastTag+tag;
    var Qt        = QMap[tag2];
//  console.log("tag2=", tag2, "Qt=", Qt);
    var word;
    if (typeof Qt !== 'undefined') {
      var lastWords = WordsMap[lastTag];
      var lastState = lastWords.indexOf(lastWord);
      state = genState(lastState, Qt)
      word = words[state];
//      console.log(tag2, "=>", lastWord, word);
    } else {
        word = R.sample(words);
    }
  _tags.push(tag);
  _words.push(word);
}

function N() { return genWord("N"); }

function V() { return genWord("V"); }

function Q() { return genWord("Q"); }

function D() { return genWord("D"); }

S();

console.log(_words.join(''));
```

執行結果

```
那條魚追那條人
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
那隻貓吃一條魚
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
一條魚吃這條魚
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
一個人餵這條魚
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
一條魚追一條魚
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
一條魚吃這隻貓
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
那條貓吃這條魚
nqu-192-168-61-142:jscode mac020$ node genGrammarMarkov2
一隻貓吃那條魚

```

### 馬可夫系統的一般平衡條件

讓我們用下圖的範例來說明「馬可夫系統」達到穩定平衡時的狀況。

![圖、只有兩個狀態的馬可夫隨機系統，何時會達到平衡呢？](markov2state_gibbs.jpg)

對於上述有「馬可夫隨機系統」，我們可以用「二元一次聯立方程式」求解 P(s0) 與 P(s1)，假如我們將 P(s0) 寫為 P0，P(s1) 寫為 P1，那麼整個系統達到平衡時，應該會有下列狀況。

```
P0*0.3 = P1*0.5 ; P0 的流出量 = P0 的流入量
P0+P1 = 1       ; 狀態不是 s0 就是 s1
```

如果我們求解上述方程式，就可以得到 (P0=5/8, P1=3/8)，此時整個系統會達到平衡。

假如我們模擬機率性粒子在馬可夫鏈中的移動行為，最後這些移動將達到一個平衡。在達到平衡後，從 x 狀態流出去的粒子數，將會等於流回該狀態的粒子數，也就是必須滿足下列『平衡條件』的要求。

$$\sum_y P(x) Q(x \to y)  = \sum_y P(y) Q(y \to x)$$

當隨機的粒子移動時，如果從 x 流出的粒子較多，自然會讓 P(x) 下降，最後仍然達到平衡，如果流入 x 的粒子比流出的多，那麼 P(x) 自然就會上升，只要我們能模擬流出流入的程序，最後整個馬可夫系統將會達到平衡。

![圖、已經達到平衡的馬可夫系統之範例](markov2state_balance.jpg)

上圖顯示了上述馬可夫系統處於「一般平衡狀態」時的狀況，您可以發現其中的「節點 s0 的總流出」為 $$(5/8*0.3 = 15/80)$$ ，而「節點 s0 的總流入」$$(3/8*0.5 = 15/80)$$，其計算過程如下所示。

$$\sum_y P(x) Q(x \to y) = 5/8 * 0.3 = 15/80 = 3/8*0.5 = \sum_y P(y) Q(y \to x)$$

運用上述的「一般平衡條件」，當我們已經知道「轉移矩陣」$$Q(x \to y)$$ 的每個數值，但是卻不知道達成平衡的節點機率 P(x) 時，可以設計出一種稱為 「Gibbs 演算法」的學習程式，該算法可以尋找出每個節點達到平衡時的機率值。

### 馬可夫系統的細緻平衡條件

在上述兩個狀態的馬可夫系統中，對於 s0 與 s1 之間的兩條連線， $$s0 \to s1$$ 與 $$s1 \to s0$$ 而言，其實已經達到了所謂細緻均衡的條件，因為 

$$P(s0)*Q(s0 \to s1) = 5/8 * 0.3 = 15/80 = 3/8*0.5 = P(s1)*Q(s1 \to s0)$$

假如一個「馬可夫系統」裏的每條線都能達成這樣的平衡，那麼整個系統顯然也是處於一個穩定狀態。這種架構在「線平衡」上的均衡條件，稱為「細致平衡條件」，以下是「細致平衡條件」的數學方程式。

$$P(x) Q(x \to y)  = P(y) Q(y \to x)$$

必須注意的是，上述的「細致平衡條件」是比「一般平衡」更進一步，要求更多的條件，因此若能達到「細致平衡」，則必然已經達到了「一般平衡」狀態。

當我們知道每個狀態的機率 P(x)，卻不知道「轉移矩陣」的機率值時，就可以採用「細緻平衡的要求」，透過「Metropolis-Hasting 演算法」來學習，以便透過反覆的疊代運算找出讓 Q(x\to y) 達成平衡的數值，透過迭代的方式學會「轉移矩陣」的機率值。

![圖、尋找達成細致平衡的「狀態轉移矩陣」](markov2state_metropolis.jpg)

### 蒙地卡羅馬可夫 (MCMC) 算法

在上述的馬可夫系統中，我們若想要尋找他的穩定狀態，也就是 P(s0)=?, P(s1)=? 才能讓整個系統達到平衡的問題，我們可以採用「蒙地卡羅」 (Monte Carlo) 演算法，而採用「蒙地卡羅」型態的演算法解決馬可夫鏈問題，就稱為 MCMC (Monte Carlo Markov Chain)。

「Gibbs 演算法」與 「Metropolis Hasting 演算法」都是典型的 MCMC 算法。

其中的 「Gibbs 演算法」是在「已知轉移矩陣」時可用來「求解各個節點的機率」，而 「Metropolis Hasting 演算法」 則是在「已知各個節點的機率」時，可以用來學習「求解轉移矩陣的機率」。

## Gibbs 演算法 -- 馬可夫鏈的狀態機率學習

如前所述、我們可以用 Gibbs 演算法，在已知「轉移矩陣」的情況下求解「每個狀態的平衡機率值」，我們將用下圖這個只有兩個狀態的馬可夫系統為例，將「Gibbs 演算法」轉換為實際的 JavaScript 程式，讓讀者透過程式實際體會 Gibbs 演算法的原理。

![圖、只有兩個狀態的馬可夫隨機系統，何時會達到平衡呢？](markov2state_gibbs.jpg)

### 程式範例

現在、我們希望用 Gibbs 演算法來尋找上述問題的穩態，一開始我們可以隨意設定一個初始的隨機分布，例如 (P0, P1) = (0.5, 0.5)。

接著我們就可以用疊代的方法，計算該系統的穩態，以下的 JavaScript 程式就模擬了這種過程。

檔案： gibbs.js

```javascript
// Gibbs Algorithm 的範例
// 問題：機率式有限狀態機，P(s0=>s1)=0.3, P(s1=>s0)=0.5 ; P(s0=>s0)=0.7, P(s1=>s1)=0.5
// 目標：尋找該「機率式有限狀態機」的穩態，也就是 P(s0) = ?, P(s1)=? 時系統會達到平衡。

function rand(a, b) {
  return (b-a)*Math.random() + a;
}

function gibbs() {
  var P = [ 0.5, 0.5 ]; // 初始機率分佈，隨意設定。
  var Q = [ [0.7, 0.3], [0.5, 0.5] ];
  do {
	console.log("P = %j", P);
    var Pn = [ P[0]*Q[0][0]+P[1]*Q[1][0], P[0]*Q[0][1]+P[1]*Q[1][1] ];    // 下一輪的機率分布。
	var diff = [ Pn[0]-P[0], Pn[1]-P[1] ];                // 兩輪間的差異。
	var step = Math.sqrt(diff[0]*diff[0]+diff[1]*diff[1]);// 差異的大小
	P = Pn;
  } while (step > 0.001);  // 假如差異夠小的時候，就可以停止了。
  console.log("5/8=%d 3/8=%d", 5/8, 3/8); // 印出標準答案，以便看看我們找到的答案是否夠接近。
}

gibbs();
```

執行結果：

```
D:\Dropbox\Public\web\ml\code\Gibbs>node gibbs.js
P = [0.5,0.5]
P = [0.6,0.4]
P = [0.62,0.38]
P = [0.624,0.376]
P = [0.6248,0.3752]
5/8=0.625 3/8=0.375
```

您可以看到上述程式所找到的答案 [0.6248,0.3752] 與我們用「聯立方程式」求出來的答案 [5/8, 3/8] 之間非常接近，這代表上述的 Gibbs 程式可以求出系統的穩態。

當然、上述的算法只是一個極度簡化的範例，還不能完全代表 Gibbs Algorithm，現在讓我們用比較抽象但通用的講法來說明 Gibbs 演算法。

### 數學描述

Gibbs 取樣程序的使用時機是在聯合分布 P(X,Y) 未知，但是單一變數的條件機率 $Q(X \to Y), Q(Y|X), P(X), P(Y) 已知的情況。在此種情況下，我們可以利用亂數產生的樣本，統計聯合機率分布。

該程序首先取得一個分布 Y0 作為初始值，然後利用蒙地卡羅法透過 (X, Y0) 產生 X1 分布，接著再利用 (X1, Y)  產生 Y1 分布。於是我們得到下列這個疊代程序 

```
Algorithm GibbsSampling(X, Y)
　Y[0] = random initialize a distribution
　for i = 1 to N
　　generate X[i] from Y[i-1] and Q(Y[i-1]→X)
　　generate Y[i] from X[i] and Q(X[i]→Y) 
　return {X[N], Y[N]}
End Algorithm
```

以上疊代程序是針對兩個隨機變數的情況，假如我們希望延伸到 k 個隨機變數的情況，可以修改演算法如下。

```
Algorithm GibbsSampling(X[1...k])
　X = random initialize a distribution
　for i = 1 to N
　　generate X'[1] from X and Q(X[2], ..., X[k] → X[1])
    ...
　　generate X'[j] from X and Q(X[1], ..., X[j-1], X[j+1],...,X[k] → X[i])
    ...
　　generate X'[k] from X and Q(X[1], ..., X[k-1] → X[k])
    X = X'
  end
　return X
End Algorithm
```

Gibbs 取樣程序是『蒙地卡羅馬可夫算法』(MCMC) 的一個案例，也是 Metropolis-Hasting 取樣程序的一個特例，我們可以利用 Gibbs 或 Metropolis-Hasting 取樣程序計算貝氏網路的聯合機率分布。

## Metropolis-Hasting 演算法

「Metropolis-Hasting 演算法」(以下簡稱 MH 算法) 的設計，是建構在「馬可夫系統的細緻平衡條件」之上的，因此在說明「MH 算法」之前，必須先理解上述的「細緻平衡條件」，也就是對於圖中的每一條連線都必須達到「流入=流出」的均衡狀態。換句話說，就是符合下列條件。

$$P(x) Q(x  \to  y) = P(y) Q(y  \to  x)$$

Metropolis-Hasting 演算法 (MH 程序) 是一個不斷調整 Q(x→y) 的演算法，該算法所關注的焦點在於 (x, y) 通道上。

假如目前 x 的機率過高，而且從 x 流向 y 的粒子較多，那麼就應當讓粒子全部從 x 流向 y，也就是 Q(x→y) 的流量均可順利流出。但是如果從 y 流向 x 的粒子較多時，那麼我們就讓某些粒子卡住，不要流入 x。

但是究竟要流出多少粒子，卡住多少粒子呢？MH 方法利用下列的 A(x→y) 比例進行調節，以便能透過堵塞通道 Q(y→x) 的方法，讓系統趨向平衡。

$$A(x \to y) = \frac{P(x) Q(x \to y)}{P(y) Q(y \to x)}$$

因此，Metropolis 設計出了下列通道流量的調整公式，以便用疊代的方式調整狀態轉移機率矩陣 P(x \to y)。

$$Q_{t+1}(x \to y) = \begin{cases} Q_t(x \to y) & \;\;\; \text{if x} \neq y  , A(x \to y) \geq 1;\\Q_t(x \to y) A(x \to y) & \;\;\;\text{if x} \neq y , A(x \to y) < 1;\\ Q_t(x \to y) + \sum_{z:A(x \to z) < 1} Q_t(x \to z) (1 - A(x \to z)) & \;\;\;\text{if x = y.} \end{cases}$$

### Metropolis-Hasting 算法

在理解了平衡條件與 MH 程序的想法後，我們就可以正式撰寫出 Metropolis-Hasting 程序的演算法。

```
Algorithm Metropolis-Hasting(P(S)) output Q(S→S)
  foreach (x,y) in (S, S)
    Q(x→y) = 1/|S|
　while not converge
　　　foreach (x,y) in (S, S) // 計算 A 矩陣
　　　　　A(x→y) = (P(y) Q(y→x)) / (P(x) Q(x→y))

　　　foreach (x,y) in (S, S) // 計算下一代的轉移矩陣 Q
　　　　　if x = y
　　　　　　　Q'(x→y) = Q(x→y) + \sum_{z:A(x \to z) < 1} Q_t(x \to z) (1 - A(x \to z))
　　　　　else
　　　　　　　if A(x→y) >= 1
　　　　　　　　Q'(x→y) = Q(x→y)
　　　　　　　else
　　　　　　　　Q'(x→y) = Q(x→y) A(x→y)
　　　Q = Q'
　end while
End Algorithm
```

### MH 算法的進一步簡化

在上述的 MH 程序中，算式 `\sum_{z:A(x \to z) < 1} Q_t(x \to z) (1 - A(x \to z))` 是 $$\sum_{z:A(x \to z) < 1} Q_t(x \to z) (1 - A(x \to z))$$ 的 tex 數學式，該式的計算較為複雜，事實上，這個值就是為了讓 $$Q(x \to y)$$ 能夠『歸一化』的條件，也就是讓 $$\sum_y Q(x \to y)=1$$ 的差額補償值。因此我們也可以將上述演算法改寫如下。

```
Algorithm Metropolis-Hasting(P(S)) output Q(S,S)
  foreach (x,y) in (S, S)
    Q(x→y) = 1/|S|
　while not converge
　　　foreach (x,y) in (S, S) // 計算 A 矩陣
　　　　　Q'(x→y) = Q(x→y)
　　　　　A(x→y) = (P(y) Q(y→x)) / (P(x) Q(x→y))

　　　foreach (x,y) in (S, S) // 計算下一代的轉移矩陣 Q
　　　　　if A(x,y) < 1
　　　　　　　Q'(x→y) = Q(x→y) A(x→y)
　　　　　　　Q'(x→x) = Q(x→x) + Q(x→y) (1-A(x→y))

　　　Q = Q';
　end while
End Algorithm
```

### MH 算法的程式範例

檔案：metropolis.js

```javascript
// Metropolis Hasting 的範例
// 問題：機率式有限狀態機，P(s0)=0.3, P(s1)=0.5
// 目標：尋找「轉移矩陣」的穩態，也就是 Q(x→y)=? 時系統會達到平衡。

function rand(a, b) {
  return (b-a)*Math.random() + a;
}

function MetropolisHasting() {
  var P = [ 5.0/8, 3.0/8 ]; // 初始機率分佈，隨意設定。
  var Q = [ [0.5, 0.5], [0.5, 0.5] ]; // 初始機率分佈，隨意設定。
  var A = [ [0, 0], [0, 0]];
  do {
	console.log("Q = %j", Q);
    var Qn= [ [0,0], [0,0]];
	for (var x in Q) // 計算 A 矩陣
	  for (var y in Q[x]) {
	    Qn[x][y] = Q[x][y];
	    A[x][y] = (P[y]*Q[y][x]) / (P[x]*Q[x][y]); // 入出比 = 流入/流出
	  }
	
	console.log("A = %j", A);
	var diff = 0;
	for (var x in Q) 
	  for (var y in Q[x]) { // 計算下一代 Qn 矩陣
	    if (A[x][y] < 1) {  // 入出比 < 1 ，代表流入太少，流出太多
		  Qn[x][y] = Q[x][y] * A[x][y]; // 降低流出量
		  Qn[x][x] = Qn[x][x]+Q[x][y]*(1-A[x][y]); // 『規一化』調整
		  diff += Math.abs(Qn[x][y]-Q[x][y]); // 計算新舊矩陣差異
		}
	  }
	Q = Qn;
	console.log("diff = %d", diff);
  } while (diff > 0.001);  // 假如差異夠小的時候，就可以停止了。
}

MetropolisHasting();
```

執行結果

```
D:\Dropbox\Public\web\ml\code\Gibbs>node metropolis.js
Q = [[0.5,0.5],[0.5,0.5]]
A = [[1,0.6],[1.6666666666666667,1]]
diff = 0.2
Q = [[0.7,0.3],[0.5,0.5]]
A = [[1,1],[1,1]]
diff = 0
```

Metropolis-Hasting 程序可以用來學習具有『細緻平衡』特性的狀態轉移機率 Q(x→y)，一但取得了狀態轉移機率，整個系統的機率行為就確定下來了，透過這樣的程序，我們可以學習到一個馬可夫模型，然後再利用這個模型進行『預測』，以便讓程式的行為模擬該馬可夫系統的行為。Metropolis-Hasting 程序對這些可用隨機系統描述的行為而言，是一個重要的學習程序，因此被廣泛應用在機器翻譯、文件分類、分群或貝氏網路的學習等領域上，這是數學領域在電腦上應用的一個優良方法。

### 結語

在本章中我們看到了兩種「馬可夫模型」的學習方法，Gibbs Algorithm 可以在已知「狀態轉移矩陣」 P(x→y) 的情況下，學習每個狀態的機率 P(x)。

而 Metropolis-Hasting 程序則可以在已知每個狀態的機率 P(x) 的情況下，學習「狀態轉移矩陣」 P(x→y) 的機率值。

當然、這是在沒有隱變數情況下的學習，如果有隱變數的時候，我們就必須採用「隱馬可夫模型」的學習方法才行。

### 參考文獻

* [Wikipedia:Gibbs Sampling](http://en.wikipedia.org/wiki/Gibbs_sampling)
* 3.4 The Gibbs Sampling Algorithm, <http://sfb649.wiwi.hu-berlin.de/fedc_homepage/xplore/ebooks/html/csa/node28.html>
* Handbook of Computational Statistics - <http://sfb649.wiwi.hu-berlin.de/fedc_homepage/xplore/ebooks/html/csa/csahtml.html>




