# 第 17 章 - 對局搜尋法 Game Search

## 電腦下棋

自從有了電腦之後，人們就一直想讓電腦「學會」下棋的能力。事實上、遠在 1952 年，那時的電腦雖然還不具備下棋的能力，但是資訊領域的理論派大師圖靈 (Alan Turing) 就已經在構思如何寫「電腦下棋」的程式了，以下是節錄自維基百科的一段描述：

> 1952年，圖靈寫了一個西洋棋程式。可是，當時沒有一台電腦有足夠的運算能力去執行這個程式，他就模仿電腦，每走一步要用半小時。他與一位同事下了一盤，結果程式輸了。
> 
> 後來美國新墨西哥州洛斯阿拉莫斯國家實驗室的研究群根據圖靈的理論，在ENIAC上設計出世界上第一個電腦程式的象棋－洛斯阿拉莫斯象棋。

世界上有很多種棋類遊戲，對於台灣人而言，最常下的幾種棋類，大至上包含「圍棋、象棋、五子棋、西洋棋」等等。

圍棋的英文名稱為 GO，起源於中國，推測起源時間為大約公元前6世紀。傳說堯的兒子丹朱頑劣，堯發明圍棋以教育丹朱，陶冶其性情。目前圍棋的最早可靠記載見於春秋時期的《左傳》，戰國時期的弈秋是見於史籍的第一位棋手，最早的圍棋文物可以追溯到戰國時期。漢朝時棋盤為17路，南北朝時候，棋盤定型為現在的19道棋盤，傳入朝鮮半島，並且出現了評定棋手水平的圍棋九品制。圍棋逐漸成為中國古代知識階層修身養性的一項必修課目，為「琴棋書畫」四藝之一。

圍棋在公元7世紀傳入日本，很快就流行於宮廷和貴族之中。戰國末期，豐臣秀吉設立棋所。德川幕府時代，出現了在天皇或將軍面前對弈的「御城棋」，日本圍棋逐漸興盛，出現了本因坊、安井、井上、林等圍棋世家。其中坊門尤其人才輩出，先後出現了道策、丈和、秀和、秀策、秀甫、秀榮等傑出棋士。日本圍棋由於廢除了中國古代圍棋的座子制（古代中國圍棋是放四個座子，就是兩黑兩白放在對角星的位置上，雙方在這個基礎上開始布局），布局理論得以極大發展。

明治維新以後，棋手失去幕府支援，開始謀求新的謀生手段，導致了新聞棋戰和現代段位制的出現，並創立了全國性的日本棋院。昭和時代，吳清源和木谷實共同掀起了「新布局」的潮流，開始了現代圍棋的時代。其後日本棋界一流棋手輩出，如坂田榮男，藤澤秀行，高川格，及後來的大竹英雄，武宮正樹，小林光一，石田芳夫等。

![](https://cccbook.github.io/algjs/docs/img/ChineseChess.jpg)

五子棋的英文名稱為 GOMOKU，在日本平安時代就有，是日本人頗受歡迎的棋類。自1899年日本棋士黒岩涙香證明了原始規則的五子棋先下必勝後，五子棋邁入一條不斷改良的道路，經過數十年的修改、驗證、再修改，最終發展出加入禁手的五子棋，並經過公開徵名，稱為連珠（RENJU），因此規則在日本成型，又稱為日式規則或連珠規則。

西洋棋的英文就是 chess，又稱歐洲象棋或國際象棋，一般被認爲源自一種印度的遊戲——恰圖蘭卡，7世紀時流傳至波斯成為波斯象棋。穆斯林統治波斯後，它被帶到伊斯蘭的國家。九世紀傳入南歐，10世紀時傳到西班牙，11世紀傳到英國。15世紀末，現代西洋棋的規則逐漸成形。現代的玩法與19世紀時的大致相同。由於流傳已久，因此在各地與各時期產生不少的西洋棋變體規則。

![](https://cccbook.github.io/algjs/docs/img/EuropeanChess.jpg)

相信大部分的人對以上棋類都相當熟悉，也都知曉這些棋類的遊戲規則了，現在、就讓我們大致介紹一下如何撰寫「電腦下棋」的程式好了。

要寫下棋程式，大致有三個關鍵技巧，第一個是盤面的表達，第二個是評估函數，第三個是搜尋技巧。

* 盤面表達：通常我們可以用一個陣列代表盤面。舉例而言、在支援 Unicode 的系統中，我們可以用字元陣列代表棋盤，對於圍棋或五子棋而言，我們可以用 O 代表白子、 X 代表黑子，然後用空白字元代表該位置還沒有任何子。同樣的、我們可以用中文字的「將士象車馬砲卒」與「帥仕相俥傌炮兵」來代表象棋的子，對於西洋棋也可以如法炮製，只要對每個棋子都取一個中文名字或代號就行了。
* 評估函數：接著我們可以寫一個函數來評估某個盤面的分數，舉例而言、對於五子棋而言，我方連五子得 100 分，對方連五子則扣 100 分，我方連四子得 30 分，對方連四子則扣 30 分， ......，我方連兩子得 2 分，對方連兩子則扣兩分。而對象棋而言，則可以對每一子的重要性計分，例如將算 100 分，車算 50 分，砲算 30 分等等。
* 搜尋策略：對於比較複雜的棋類，我們通常需要事先設想後面好幾步的情況，能夠想得越周全且越遠的人，通常就會越厲害。電腦下棋也是如此，由於現在電腦的速度非常快，因此往往可以利用 Min-Max 演算法搜尋兩三層，甚至到五六層。而且、只要加上 Alpha-Beta Cut 修剪法，有時甚至可以搜尋到十幾層，這樣的能力往往可以超過人類，因此現在電腦在「象棋、西洋棋、五子棋」上的棋力通常很強，即使職業的棋手也未必能夠打贏電腦。(原本筆者在此註記電腦圍棋還無法下贏人類高手，但自從 2016 年 AlphaGo 打敗了李世石之後，又再度以 Master 連續打敗數十位世界高手，因此電腦也已經可以說完勝人類了)。

在 1997 年的時候，IBM 曾經用他的「深藍」(Deep Blue) 電腦與當時的世界西洋棋王「卡斯巴羅夫」公開對戰，結果「卡斯巴羅夫」在第一盤勝利之後，卻連續輸了兩盤，於是敗給了「深藍電腦」。雖然這場棋賽引起了一些爭議，但是電腦在西洋棋上的棋力，應該已經確定不亞於職業棋手，甚至是有過之而無不及了。

我們將在以下的幾篇文章中，進一步討論電腦下棋的方法，並且實作出一個「五子棋」的「電腦自動下棋」程式。

## 實作：五子棋程式

### 簡介

在本文中，我們設計了一個完全只是依賴「盤面評估函數」的五子棋程式，這個程式並沒有採用「Min-Max 對局搜尋法」，更沒有採用「Alpha-Beta 修剪法」，但是已經能夠與一般人對戰，有時候還可以贏得棋局。

以下是這個程式執行的一個畫面，我們採用命令列的設計方式，使用者下子時必須輸入格子的座標，該座標由兩個 16 進位字母組成，例如圖中的 62 代表下在第六列第二行的位置。

![圖、五子棋程式的一個對局畫面](https://cccbook.github.io/algjs/docs/img/chess.jpg)

### 程式實作

整個程式的實作只包含以下這個 gomoku.js 檔案，完整原始碼如下。

檔案： gomoku.js

```javascript
// 五子棋遊戲，單機命令列版
//   人對人下：node chess P2P
//   人對電腦：node chess P2C
// 作者：陳鍾誠
var util = require("util");
var log = console.log;
var r = require('readline').createInterface(process.stdin, process.stdout);

// 印出訊息，並取得輸入。
var prompt = function(turn) {
  var msg = format('將 %s 下在 :    ', turn);
  r.setPrompt(msg);
  r.prompt();
}

var format = function() { // 字串格式化 
  return util.format.apply(null, arguments);
}

// 棋盤物件
var Board = function() {
  this.m = [];
  for (var r=0; r<16; r++) {
    this.m[r] = [];
    for (var c=0; c<16; c++)
      this.m[r][c] = '-';
  }
}

// 將棋盤格式化成字串
Board.prototype.toString = function() {
  var str = "  0 1 2 3 4 5 6 7 8 9 a b c d e f\n";
  for (var r=0; r<16; r++) {
    str += r.toString(16)+" "+this.m[r].join(" ")+" "+r.toString(16)+"\n";
  }
  str += "  0 1 2 3 4 5 6 7 8 9 a b c d e f\n";
  return str;
}

// 顯示棋盤
Board.prototype.show = function() {
  log(this.toString());
}

// 以下為遊戲相關資料與函數
// var zero = [ 0, 0, 0, 0, 0];
// var inc  = [-2,-1, 0, 1, 2];
// var dec  = [ 2, 1, 0,-1,-2];
var z9   = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
var i9   = [-4,-3,-2,-1, 0, 1, 2, 3, 4];
var d9   = [ 4, 3, 2, 1, 0,-1,-2,-3,-4];
var z5   = [ 0, 0, 0, 0, 0];
var i2   = i9.slice(2,-2);
var d2   = d9.slice(2,-2);

// 檢查在 (r, c) 這一格，規則樣式 (dr, dc) 是否被滿足
// dr, dc 的組合可用來代表「垂直 | , 水平 - , 下斜 \ , 上斜 /」。
var patternCheck=function(board, turn, r, c, dr, dc) {
  for (var i = 0; i < dr.length; i++) {
    var tr = Math.round(r+dr[i]);
    var tc = Math.round(c+dc[i]);
    if (tr<0 ||tr > 15 || tc<0 || tc>15)
      return false;
    var v = board.m[tr][tc];
    if (v != turn) return false;
  }
  return true;
}

// 檢查是否下 turn 這個子的人贏了。
var winCheck = function(board, turn) {
  var win = false;
  for (var r=0; r<16; r++) {
    for (var c=0; c<16; c++) {
      if (patternCheck(board, turn, r, c, z5, i2)) // 垂直 | ;
        win = true;
      if (patternCheck(board, turn, r, c, i2, z5)) // 水平 - ;
        win = true;
      if (patternCheck(board, turn, r, c, i2, i2)) // 下斜 \ ;
        win = true;
      if (patternCheck(board, turn, r, c, i2, d2)) // 上斜 / ;
        win = true;
    }
  }
  if (win) {
    log("%s 贏了！", turn);  // 如果贏了就印出贏了
    process.exit(0); // 然後離開。
  }
  return win;
}

var peopleTurn = function(board, turn, line) {
  var r = parseInt(line[0], 16); // 取得下子的列 r (row)
  var c = parseInt(line[1], 16); // 取得下子的行 c (column)
  if (r<0 || r>15 || c<0 || c>15) // 檢查是否超出範圍
    throw "(row, col) 超出範圍!"; // 若超出範圍就丟出例外，下一輪重新輸入。
  if (board.m[r][c] != '-') // 檢查該位置是否已被佔據
    throw format("(%s%s) 已經被佔領了!", line[0], line[1]); // 若被佔據就丟出例外，下一輪重新輸入。
  board.m[r][c] = turn; // 否則、將子下在使用者輸入的 (r,c) 位置
}

var P2P=function(b, turn, line) {
  peopleTurn(b, turn, line);
  b.show();         // 顯示棋盤現況
  winCheck(b, turn);
  return (turn == 'o')?'x':'o'; // 換對方下了。
}

var attackScores = [ 0, 3, 10, 30, 100, 500 ];
var guardScores  = [ 0, 2,  9, 25,  90, 400 ];
var attack=1, guard=2;

var getScore = function(board, r, c, turn, mode) {
  var score = 0;
  var mScores = (mode === attack)?attackScores:guardScores;
  board.m[r][c] = turn;
  for (var start = 0; start <= 4; start++) {
    for (var len = 5; len >= 1; len--) {
      var end = start+len;
      var zero = z9.slice(start, start+len);
      var inc  = i9.slice(start, start+len);
      var dec  = d9.slice(start, start+len);
      if (patternCheck(board, turn, r, c, zero, inc)) // 攻擊：垂直 | ;
        score += mScores[len];
      if (patternCheck(board, turn, r, c, inc, zero)) // 攻擊：水平 - ;
        score += mScores[len];
      if (patternCheck(board, turn, r, c, inc, inc)) // 攻擊：下斜 \ ;
        score += mScores[len];
      if (patternCheck(board, turn, r, c, inc, dec)) // 攻擊：上斜 / ;
        score += mScores[len];
    }
  }
  board.m[r][c] = '-';  
  return score;
}

var computerTurn = function(board, turn) {
  var best = { r:0, c:0, score:-1 };
  for (var r=0; r<=15; r++) {
    for (var c=0; c<=15; c++) {
      if (board.m[r][c] !== '-') 
        continue;
      var attackScore = getScore(board, r, c, 'x', attack);  // 攻擊分數
      var guardScore  = getScore(board, r, c, 'o', guard);   // 防守分數
      var score = attackScore+guardScore;
      if (score > best.score) {
        best.r = r;
        best.c = c;
        best.score = score;
      }
    }
  }
  log("best=%j", best);
  board.m[best.r][best.c] = turn; // 否則、將子下在使用者輸入的 (r,c) 位置
}

var P2C=function(b, turn, line) {
  peopleTurn(b, 'o', line);
  b.show();         // 顯示棋盤現況
  winCheck(b, 'o'); // 檢查下了這子之後是否贏了！
  computerTurn(b, 'x', line);
  b.show();
  winCheck(b, 'x');
  return 'o';
}

var chess=function(doLine) {
  // 主程式開始
  var b = new Board(); // 建立棋盤
  b.show();            // 顯示棋盤
  var turn = 'o';      // o 先下
  prompt(turn);        // 提示要求下子訊息，並接受輸入。
  r.on('line', function(line) { // 每當讀到一個字串時。
    try {
      turn = doLine(b, turn, line);
    } catch (err) { // 若有丟出例外
      log(err); // 則印出錯誤訊息。
    }
    prompt(turn); // 提示要求下子訊息，並接受輸入。
  }).on('close', function() { // 輸入結束了
    process.exit(0); // 程式結束。
  });
}

if (process.argv[2] === "P2P") // 人對人下
  chess(P2P);
else if (process.argv[2] === "P2C") // 人對電腦下
  chess(P2C);
else { // 命令下錯，提示訊息！
  log("人對人下：node chess P2P\n人對電腦：node chess P2C");
  process.exit(0);
}
```

### 執行結果

以下是一場對局的過程片段，您可以看到最後是 x 贏了，也就是人類贏了。

```
$ node gomoku P2C
  0 1 2 3 4 5 6 7 8 9 a b c d e f
0 - - - - - - - - - - - - - - - - 0
1 - - - - - - - - - - - - - - - - 1
2 - - - - - - - - - - - - - - - - 2
3 - - - - - - - - - - - - - - - - 3
4 - - - - - - - - - - - - - - - - 4
5 - - - - - - - - - - - - - - - - 5
6 - - - - - - - - - - - - - - - - 6
7 - - - - - - - - - - - - - - - - 7
8 - - - - - - - - - - - - - - - - 8
9 - - - - - - - - - - - - - - - - 9
a - - - - - - - - - - - - - - - - a
b - - - - - - - - - - - - - - - - b
c - - - - - - - - - - - - - - - - c
d - - - - - - - - - - - - - - - - d
e - - - - - - - - - - - - - - - - e
f - - - - - - - - - - - - - - - - f
  0 1 2 3 4 5 6 7 8 9 a b c d e f

將 o 下在 : 66
  0 1 2 3 4 5 6 7 8 9 a b c d e f
0 - - - - - - - - - - - - - - - - 0
1 - - - - - - - - - - - - - - - - 1
2 - - - - - - - - - - - - - - - - 2
3 - - - - - - - - - - - - - - - - 3
4 - - - - - - - - - - - - - - - - 4
5 - - - - - - - - - - - - - - - - 5
6 - - - - - - o - - - - - - - - - 6
7 - - - - - - - - - - - - - - - - 7
8 - - - - - - - - - - - - - - - - 8
9 - - - - - - - - - - - - - - - - 9
a - - - - - - - - - - - - - - - - a
b - - - - - - - - - - - - - - - - b
c - - - - - - - - - - - - - - - - c
d - - - - - - - - - - - - - - - - d
e - - - - - - - - - - - - - - - - e
f - - - - - - - - - - - - - - - - f
  0 1 2 3 4 5 6 7 8 9 a b c d e f

best={"r":6,"c":7,"score":31}
  0 1 2 3 4 5 6 7 8 9 a b c d e f
0 - - - - - - - - - - - - - - - - 0
1 - - - - - - - - - - - - - - - - 1
2 - - - - - - - - - - - - - - - - 2
3 - - - - - - - - - - - - - - - - 3
4 - - - - - - - - - - - - - - - - 4
5 - - - - - - - - - - - - - - - - 5
6 - - - - - - o x - - - - - - - - 6
7 - - - - - - - - - - - - - - - - 7
8 - - - - - - - - - - - - - - - - 8
9 - - - - - - - - - - - - - - - - 9
a - - - - - - - - - - - - - - - - a
b - - - - - - - - - - - - - - - - b
c - - - - - - - - - - - - - - - - c
d - - - - - - - - - - - - - - - - d
e - - - - - - - - - - - - - - - - e
f - - - - - - - - - - - - - - - - f
  0 1 2 3 4 5 6 7 8 9 a b c d e f

...

best={"r":6,"c":3,"score":144}
  0 1 2 3 4 5 6 7 8 9 a b c d e f
0 - - - - - - - - - - - - - - - - 0
1 - - - - - - - - - - - - - - - - 1
2 - - - - - - - - - - - - - - - - 2
3 - - - - - - - - - - - - - - - - 3
4 - - - - x - - - - - - - - - - - 4
5 - - - - - o - - - - - - - - - - 5
6 - - - x o o o x - - - - - - - - 6
7 - - - - - - - o - - - - - - - - 7
8 - - - - - - - - x - - - - - - - 8
9 - - - - - - - - - x - - - - - - 9
a - - - - - - - - - - - - - - - - a
b - - - - - - - - - - - - - - - - b
c - - - - - - - - - - - - - - - - c
d - - - - - - - - - - - - - - - - d
e - - - - - - - - - - - - - - - - e
f - - - - - - - - - - - - - - - - f
  0 1 2 3 4 5 6 7 8 9 a b c d e f
...

  0 1 2 3 4 5 6 7 8 9 a b c d e f
0 - - - - - - - - - - - - - - - - 0
1 - - - - - - - - - - - - - - - - 1
2 - - - - - - - - - - - - - - - - 2
3 - - - - - - - - - - - - - - - - 3
4 - - - - x - - - - - - - - - - - 4
5 - - o - - o - - - - - - - - - - 5
6 - - o x o o o x - - - - - - - - 6
7 - - - - x o o o - - - - - - - - 7
8 - - - - - x - - x - - - - - - - 8
9 - - - - - - x - - x - - - - - - 9
a - - - - - - - x - - - - - - - - a
b - - - - - - - - - - - - - - - - b
c - - - - - - - - - - - - - - - - c
d - - - - - - - - - - - - - - - - d
e - - - - - - - - - - - - - - - - e
f - - - - - - - - - - - - - - - - f
  0 1 2 3 4 5 6 7 8 9 a b c d e f

x 贏了！
```

### 參考文獻
* Wikipedia:[Computer chess](http://en.wikipedia.org/wiki/Computer_chess)
* 維基百科:[電腦象棋](http://zh.wikipedia.org/wiki/%E7%94%B5%E8%84%91%E8%B1%A1%E6%A3%8B)
* Wikipedia:[Deep Blue]
* 維基百科:[深藍]
* 維基百科:[西洋棋](http://zh.wikipedia.org/wiki/%E5%9C%8B%E9%9A%9B%E8%B1%A1%E6%A3%8B)
* 維基百科:[圍棋](http://zh.wikipedia.org/zh-tw/%E5%9B%B4%E6%A3%8B)
* <http://chessprogramming.wikispaces.com/Learning>
* [維基百科：五子棋](http://zh.wikipedia.org/zh-tw/%E4%BA%94%E5%AD%90%E6%A3%8B)

[Deep Blue]:http://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)
[深藍]:http://zh.wikipedia.org/wiki/%E6%B7%B1%E8%97%8D_(%E9%9B%BB%E8%85%A6)
