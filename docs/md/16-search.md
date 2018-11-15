# 第 16 章 - 搜尋法 Search 

## 問題一：《狼、羊、甘藍菜》過河的問題

題目:有一個人帶著一匹狼、一頭羊和一棵甘藍菜打算過河到對岸去。他的船很小, 每次只能載兩個東西:

也就是 【人 + 狼】 【人 + 羊】, 或【人 + 甘藍菜】。

困難的地方是, 如果他先載了甘藍菜過去, 狼就會趁機把羊吃掉了。而如果他先把狼送過去, 羊也會趁他離開時把甘藍菜吃掉。 

請問：他應該怎麼樣做才能夠把這二種動物和甘藍菜都送到對岸呢? 請找出運送順序！

程式：請寫一個程式搜尋出這個問題的解答！


### 解答

檔案： shipSearch.js

```js
var c = console;
var objs = ["人", "狼", "羊", "菜"];
var state= [   0,  0 ,   0,    0 ];

function neighbors(s) {
    var side = s[0];
    var next = [];
    checkAdd(next, move(s,0));
    for (var i=1; i<s.length; i++) {
        if (s[i]===side)
          checkAdd(next, move(s, i));
    }
    return next;
}

function checkAdd(next, s) {
    if (!isDead(s)) {
        next.push(s);
    }
}

function isDead(s) {
    if (s[1]===s[2] && s[1]!==s[0]) return true; // 狼吃羊
    if (s[2]===s[3] && s[2]!==s[0]) return true; // 羊吃菜
    return false;
}

// 人帶著 obj 移到另一邊
function move(s, obj) {
    var newS = s.slice(0); // 複製一份陣列
    var side = s[0];
    var anotherSide = (side===0)?1:0;
    newS[0] = anotherSide;
    newS[obj] = anotherSide;
    return newS; 
}

var visitedMap = {};

function visited(s) {
    var str = s.join('');
    return (typeof visitedMap[str] !== 'undefined');
}

function isSuccess(s) {
    for (var i=0; i<s.length; i++) {
      if (s[i]===0) return false;        
    }
    return true;
}

function state2str(s) {
    var str = "";
    for (var i=0; i<s.length; i++) {
        str += objs[i]+s[i]+" ";
    }
    return str;
}

var path = [];

function printPath(path) {
    for (var i=0; i<path.length; i++)
      c.log(state2str(path[i]));
}

function dfs(s) {
  if (visited(s)) return;
  path.push(s);
//  c.log('visit:', state2str(s));
  if (isSuccess(s)) {
      c.log("success!");
      printPath(path);
      return;
  }
  visitedMap[s.join('')] = true;
  var neighborsList = neighbors(s); 
  for (var i in neighborsList) { 
    dfs(neighborsList[i]);
  }
  path.pop();
}

dfs(state); 
```

執行結果

```
$ node shipSearch
success!
人0 狼0 羊0 菜0 
人1 狼0 羊1 菜0 
人0 狼0 羊1 菜0 
人1 狼1 羊1 菜0 
人0 狼1 羊0 菜0 
人1 狼1 羊0 菜1 
人0 狼1 羊0 菜1 
人1 狼1 羊1 菜1 
```

## 問題二：以廣度優先搜尋解決拼圖問題

以下的「拼圖問題」是將一個已經移動打亂過的拼盤，想辦法移動回原本樣子的問題。

![圖、本文程式中的拼圖問題](../img/puzzle.jpg)

在以下程式中，我們用一個 3*3 的陣列來代表拼盤，並且用數字 0 來代表其中的空格，因此將方塊 2 移動到空格，其實是用將 0 與 2 兩個數字位置交換所達成的。

透過這樣的資料結構，我們就可以用「廣度優先搜尋」(BFS) 來解決拼圖問題了，以下是我們用 JavaScript 實作，並用 node.js 進行測試的結果。

### 程式實作：拼圖問題

檔案：puzzleSearch.js

```javascript
var util = require("util");
var log = console.log;
var up = 1, right=2, down=3, left=4;

function enqueue(a, o) { a.push(o); }
function dequeue(a) { return a.shift(); }
function equal(a, b) { return JSON.stringify(a)===JSON.stringify(b); }
function board2str(b) { return b.join("\n"); }

function findXY(board, value) {
  for (var x=0; x<board.length; x++)
    for (var y=0; y<board[x].length; y++)
      if (board[x][y] === value)
        return {x:x,y:y};
  return null;
}

function boardClone(b) {
  var nb = [];
  for (var x in b)
    nb[x] = b[x].slice(0);
  return nb;
}

function swap(b,x1,y1,x2,y2) {
  x2 = Math.round(x2), y2=Math.round(y2);
  if (x2<0 || x2 > 2 || y2<0 || y2>2) 
    return false;
  var t = b[x1][y1];
  b[x1][y1]=b[x2][y2];
  b[x2][y2]=t;
  return true;
}

function move(board, dir) {
  var xy = findXY(board, 0);
  var x = xy.x, y=xy.y;
  var nboard = boardClone(board);
  var s = false;
  switch (dir) {
    case up:    s=swap(nboard,x,y,x-1,y); break;
    case right: s=swap(nboard,x,y,x,y+1); break;
    case down:  s=swap(nboard,x,y,x+1,y); break;
    case left:  s=swap(nboard,x,y,x,y-1); break;
  }
  if (s)
    return nboard;
  else
    return null;
}

function moveAdd(board, dir, neighbors) {
  var nboard = move(board, dir);
  if (nboard !== null) {
    neighbors.push(nboard);
  }
}

function getNeighbors(board) {
  var neighbors = [];
  moveAdd(board, up,    neighbors);
  moveAdd(board, down,  neighbors);
  moveAdd(board, right, neighbors);
  moveAdd(board, left,  neighbors);
  return neighbors;
}

var goal = [[1,2,3], 
            [8,0,4],
            [7,6,5]];

var start= [[1,3,4], 
            [8,2,5],
            [7,0,6]];

var queue=[start];            // BFS 用的 queue, 起始點為 1。
var visited={};
var parent={};
var level={};

function bfs(q, goal) { // 廣度優先搜尋
  while (q.length > 0) {
    var node = dequeue(q);     // 否則、取出 queue 的第一個節點。
    var nodestr = board2str(node);
//  log("q.length=%d level=%d\n===node===\n%s==parent==\n%s", q.length, level[nodestr], nodestr, parent[nodestr]); // 印出節點
    if (equal(node, goal)) return true;
    if (visited[nodestr]===undefined)        // 如果該節點尚未拜訪過。
      visited[nodestr] = true; //   標示為已拜訪
    else                       // 否則 (已訪問過)
      continue;                //   不繼續搜尋，直接返回。
    var neighbors = getNeighbors(node); // 取出鄰居。
    for (var i in neighbors) { // 對於每個鄰居
      var n = neighbors[i];
      var nstr = board2str(n);
      if (!visited[nstr]) {    // 假如該鄰居還沒被拜訪過
        parent[nstr] = nodestr;
	level[nstr] = level[nodestr] + 1;
        enqueue(q, n);         //   就放入 queue 中
      }
    }
  }
  return false;
}

function backtrace(goal) {
  log("======= backtrace =========");
  var nodestr = board2str(goal);
  while (nodestr !== undefined) {
    log("%s\n", nodestr);
    nodestr = parent[nodestr];
  }
}

level[board2str(start)]=0;
var found = bfs(queue, goal); // 呼叫廣度優先搜尋。
log("bfs:found=%s", found);
if (found)
  backtrace(goal);
```

### 執行結果

```
D:\Dropbox\Public\web\ai\code\search>node puzzleSearch.js
bfs:found=true
======= backtrace =========
1,2,3
8,0,4
7,6,5

1,0,3
8,2,4
7,6,5

1,3,0
8,2,4
7,6,5

1,3,4
8,2,0
7,6,5

1,3,4
8,2,5
7,6,0

1,3,4
8,2,5
7,0,6
```

### 結語

在上述執行結果中，我們是將盤面拼完後，才逆向追蹤印出移動過程，因此整個移動方法應該從最下面的盤面看起。換句話說，真正的順序如下：

```
1,3,4    1,3,4    1,3,4     1,3,0    1,0,3    1,2,3
8,2,5 => 8,2,5 => 8,2,0 =>  8,2,4 => 8,2,4 => 8,0,4
7,0,6    7,6,0    7,6,5     7,6,5    7,6,5    7,6,5
```

從上面過程中，您可以看出我們的程式將打亂的盤面給拼回來了。


## 實作：以深度優先搜尋解決老鼠走迷宮問題

雖然深度優先搜尋 (DFS) 與廣度優先搜尋 (BFS) 等演算法通常是用在「圖形」這種結構上的，不過「圖形」的結構倒是不一定要真實且完整的表達出來，在很多人工智慧的問題上，我們不會看到完整的「圖形結構」，只會看到某個節點有哪些鄰居節點，然後就可以用 BFS 與 DFS 進行搜尋了。

老鼠走迷宮問題，就是一個可以採用圖形搜尋來解決的經典問題，其中每個節點的鄰居，就是上下左右四個方向，只要沒有被牆給擋住，就可以走到鄰居節點去，因此我們可以採用圖形搜尋的方法來解決迷宮問題，以下是我們的程式實作。

### 程式實作：老鼠走迷宮

檔案：pathFinder.js

```javascript
var log = console.log;

function matrixPrint(m) {
  for(var i=0;i<m.length;i++)
    log(m[i]);
}

function strset(s, i, c) {
  return s.substr(0, i) + c + s.substr(i+1);
}

function findPath(m, x, y) {
  log("=========================");
  log("x="+x+" y="+y);
  matrixPrint(m);
  if (x>=6||y>=8) return false;
  if (m[x][y] == '*') return false;
  if (m[x][y] == '+') return false;
  if (m[x][y] == ' ') m[x] = strset(m[x], y, '.');
  if (m[x][y] == '.' && (x == 5 || y==7)) 
    return true;
  if (y<7&&m[x][y+1]==' ') //向右
    if (findPath(m, x,y+1)) return true;
  if(x<5&&m[x+1][y]==' ') //向下
    if (findPath(m, x+1,y)) return true;
  if(y>0&&m[x][y-1]==' ') //向左
    if (findPath(m, x,y-1)) return true;
  if(x>0&&m[x-1][y]==' ') //向上
    if (findPath(m, x-1,y)) return true;
  m[x][y]='+';
  return false;
}

var m =["********", 
        "** * ***",
        "     ***",
        "* ******",
        "*     **",
        "***** **"];
	
findPath(m, 2, 0);
log("=========================");
matrixPrint(m);
```

### 執行結果

```
D:\Dropbox\Public\web\ai\code\search>node pathFinder.js
=========================
x=2 y=0
********
** * ***
     ***
* ******
*     **
***** **
=========================
x=2 y=1
********
** * ***
.    ***
* ******
*     **
***** **
=========================
x=2 y=2
********
** * ***
..   ***
* ******
*     **
***** **
=========================
x=2 y=3
********
** * ***
...  ***
* ******
*     **
***** **
=========================
x=2 y=4
********
** * ***
.... ***
* ******
*     **
***** **
=========================
x=1 y=4
********
** * ***
.....***
* ******
*     **
***** **
=========================
x=1 y=2
********
** *.***
.....***
* ******
*     **
***** **
=========================
x=3 y=1
********
**.*.***
.....***
* ******
*     **
***** **
=========================
x=4 y=1
********
**.*.***
.....***
*.******
*     **
***** **
=========================
x=4 y=2
********
**.*.***
.....***
*.******
*.    **
***** **
=========================
x=4 y=3
********
**.*.***
.....***
*.******
*..   **
***** **
=========================
x=4 y=4
********
**.*.***
.....***
*.******
*...  **
***** **
=========================
x=4 y=5
********
**.*.***
.....***
*.******
*.... **
***** **
=========================
x=5 y=5
********
**.*.***
.....***
*.******
*.....**
***** **
=========================
********
**.*.***
.....***
*.******
*.....**
*****.**
```

在上面的輸出結果中，`*` 代表該位置是牆壁，而空格則代表是可以走的路，老鼠走過的地方會放下一個 `.` 符號，於是您可以看到在上述程式的輸出中，老鼠最後走出了迷宮，完成了任務。




