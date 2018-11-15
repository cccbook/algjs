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

