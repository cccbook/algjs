# 第 1 章 - 查表法 Table Lookup

### 翻譯系統 (簡易英翻中)

執行結果

```
$ node e2c a dog chase a cat
[ '一隻', '狗', '追', '一隻', '貓' ]
```

程式碼

```javascript
var e2c = { dog:"狗", cat:"貓", a: "一隻", chase:"追", eat:"吃" };

function mt(e) {
  var c = [];
  for (i in e) {
    var eword = e[i];
    var cword = e2c[eword];
    c.push(cword);
  }
  return c;
}

var c = mt(process.argv.slice(2));
console.log(c);
```

執行結果：

```
$ node e2c.js a dog
[ '一隻', '狗' ]
$ node e2c.js a dog chase a cat
[ '一隻', '狗', '追', '一隻', '貓' ]
$ node e2c.js a dog chase a car
[ '一隻', '狗', '追', '一隻', undefined ]
```

補充說明：請注意上面的 e2c[eword] 這一行不能改用 e2c.eword, 原因是 e2c.eword 是在查詢 eword 這個詞，也就是 e2c['eword'] 的意思，上面範例中e2c['eword']  會是 undefined。

e2c[eword] 才是在查詢像 e2c['dog'] 這樣的內容。

請看下列的示範：

```
> var e2c = { dog:"狗", cat:"貓", a: "一隻", chase:"追", eat:"吃" };
undefined
> e2c
{ dog: '狗', cat: '貓', a: '一隻', chase: '追', eat: '吃' }
> e2c.eword
undefined
> var eword='dog'
undefined
> eword
'dog'
> e2c.eword
undefined
> e2c['dog']
'狗'
> e2c[eword]
'狗'
```


## 用查表加速 -- 以費氏數列為例

傳統用遞迴方式的費氏數列算法，會耗費很久的時間：

```js
function fibonacci (n) {
  if (n < 0) throw Error('fibonacci:n < 0')
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

var startTime = Date.now()
console.log('fibonacci(43)=', fibonacci(43))
var endTime = Date.now()
var milliSeconds = endTime - startTime
console.log('time:%dms', milliSeconds)

```

執行結果:

```
$ node .\fiboanacci.js
fibonacci(43)= 433494437
time:25530ms
```

加入查表，讓已經算過的就不需要算第二次，第二次之後改用查的！

```js
var fib = [0, 1]

function fibonacci (n) {
  if (n < 0) throw Error('fibonacci:n < 0')
  if (fib[n] != null) return fib[n]
  fib[n] = fibonacci(n - 1) + fibonacci(n - 2)
  return fib[n]
}

var startTime = Date.now()
console.log('fibonacci(43)=', fibonacci(43))
var endTime = Date.now()
var milliSeconds = endTime - startTime
console.log('time:%dms', milliSeconds)

```

執行結果

```
$ node .\fiboanacci_lookup.js
fibonacci(43)= 433494437
time:14ms
```
