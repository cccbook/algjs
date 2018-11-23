# 第 19 章 - 遞迴下降法 Recursive Descendent 

* <https://pdos.csail.mit.edu/archive/scigen/>

接著請想想，這種程式該怎麼做呢？

讓我們用一個更簡單的例子示範，那就是自動產生數學運算式。

檔案： @[[genexp]](code/genexp.js)

```
// === BNF Grammar =====
// E = T [+-*/] E | T
// T = [0-9] | (E)

function print(s) {
	process.stdout.write(s);
}

// 用法:randInt(3,7) 會傳回 3,4,5,6,7 其中之一
function randInt(a, b) { // 隨機傳回一個介於 (a,b) 間的整數 (包含 a, b)
	return Math.floor((Math.random() * (b-a+1)) + a);
}

function randChar(str) {
  var len = str.length;
  var i = randInt(0, len-1);
  return str[i];
}

function E() {
	if (randInt(1,10) <= 5) {
		T(); print(randChar("+-*/")); E();
	} else {
		T();
	}
}

function T() {
	if (randInt(1,10) < 7) {
		print(randChar("0123456789"));
	} else {
		print("("); E(); print(")");
	}
}

for (var i=0; i<10; i++) {
	E();
	print("\n");
}
```

執行結果

```
nqu-192-168-61-142:code mac020$ node genexp
4
0/0+(2)*9
4-(9)*((((3*(4))-(8))+(0)+8/(8)+2)+2/6)
3/(((((1*8+6)))))*((6/4/3))/(((2+9))+(((2))+8/((4*(5))*2))/4)
(1+(1))-((7))
(2+(((4))))+(5)
((1/(((3+(7)-(4-1)/9*8/7-6)/(4)-3+3)-6-9*(((2+(((6*4/4)))*(8/3))))-9-0-1+5*8*((5)/(3)-1/(1)-9)+(5+5*5))))*5/2
8
1
(0)*7
```

## 剖析數學運算式

檔案： parseExp.js

```javascript
/* 語法
E = T ([+-/*] E)*
T = N | (E)

範例：3+(5*4)-2
*/

var c = console;

var tagMap={
  N : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  OP: ["+", "-", "*", "-"]
};

var wi = 0;

function isNext(tag) {
    if (words[wi] === tag) return true;
    var tagWords=tagMap[tag];
    if (typeof tagWords === "undefined") 
        return false;
    else
        return (tagWords.indexOf(words[wi])>=0);
}

function next(tag) {
     c.log("tag="+tag+" word="+words[wi]);
    if (isNext(tag)) {
      return words[wi++];
    }
    throw Error("Error !");
}

// E = T ([+-/*] E)*
function E() {
    T();
    while (isNext("OP")) {
        next("OP");
        E();        
    }
}

// T = N | (E)
function T() {
    if (isNext("N")) {
        next("N");
    } else {
        next("(");
        E();
        next(")");
    }
}

var words="3+(5*4)-2";
c.log("%j", words);
E(words);
```

執行

```
NQU-192-168-60-101:js csienqu$ node parseExp
"3+(5*4)-2"
tag=N word=3
tag=OP word=+
tag=( word=(
tag=N word=5
tag=OP word=*
tag=N word=4
tag=) word=)
tag=OP word=-
tag=N word=2

```

## 編譯數學運算式為中間碼

檔案： parseExp2.js

```
/* 語法
E = T ([+-/*] E)*
T = N | (E)

範例：3+(5*4)-2
*/

var c = console;

var tagMap={
  N : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  OP: ["+", "-", "*", "-"]
};

var wi = 0;

function isNext(tag) {
    if (words[wi] === tag) return true;
    var tagWords=tagMap[tag];
    if (typeof tagWords === "undefined") 
        return false;
    else
        return (tagWords.indexOf(words[wi])>=0);
}

function next(tag) {
     c.log("tag="+tag+" word="+words[wi]);
    if (isNext(tag)) {
      return words[wi++];
    }
    throw Error("Error !");
}

var tempIdx = 0;
var getTemp=function() {
    return tempIdx++;
}
// E = T ([+-/*] E)*
function E() {
    var t = T();
    while (isNext("OP")) {
        var op = next("OP");
        var e = E();
        var result = getTemp();
        console.log(" T%d=T%d%sT%d", result, t, op, e);
        t = result;
    }
    return t;
}

// T = N | (E)
function T() {
    if (isNext("N")) {
        var t = getTemp();
        var number = next("N");
        console.log(" T%d=%d", t, number);
        return t;
    } else {
        next("(");
        var e = E();
        next(")");
        return e;
    }
}

var words="3+(5*4)-2";
c.log("%j", words);
E(words);
```

執行

```
NQU-192-168-60-101:js csienqu$ node parseExp2
"3+(5*4)-2"
tag=N word=3
 T0=3
tag=OP word=+
tag=( word=(
tag=N word=5
 T1=5
tag=OP word=*
tag=N word=4
 T2=4
 T3=T1*T2
tag=) word=)
tag=OP word=-
tag=N word=2
 T4=2
 T5=T3-T4
 T6=T0+T5

```
