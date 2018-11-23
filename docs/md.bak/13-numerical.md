# 第 13 章 - 數值算法 Numerical 

# 數值表示法


## 浮點數

電腦裡的數值，通常只支援整數和浮點數，目前通常是採用 32 或 64 位元的表示法，32位元整數範圍從-2147483648到2147483647，而約略是 $$5.0 \times 10^{-324}$$ 到 $$1.7 \times 10^{308}$$ ，精確度為 15 到 16 位數。

javascript 語言裡沒有區分整數或浮點數，只有 [Number 類別](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)，Number 採用 [IEEE 754 標準的 64位元雙精度浮點數](https://zh.wikipedia.org/wiki/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8) ，由於64位元浮點數可以完整的涵蓋 $$-(2^{53} - 1)$$ 到 $$(2^{53} - 1)$$ 的安全整數範圍，換算成十進位將涵蓋從 -9007199254740992 到9007199254740992 的整數，所以大約16位數以內的整數都是可以完整表達的。

以下 JavaScript 程式印出了 number 的範圍。

檔案： number.js

```javascript
var c = console;
var N = Number;

c.log('EPSILON=', N.EPSILON);
c.log('MAX_VALUE=', N.MAX_VALUE);
c.log('MIN_VALUE=', N.MIN_VALUE);
c.log('MAX_SAFE_INTEGER=', N.MAX_SAFE_INTEGER);
c.log('MIN_SAFE_INTEGER=', N.MIN_SAFE_INTEGER);
c.log('MAX_VALUE+1=', N.MAX_VALUE*2); // 超過範圍，顯示無限大
```

執行結果

```
D:\Dropbox\gitbook\rlab\code\number>node number

EPSILON= 2.220446049250313e-16
MAX_VALUE= 1.7976931348623157e+308
MIN_VALUE= 5e-324
MAX_SAFE_INTEGER= 9007199254740991
MIN_SAFE_INTEGER= -9007199254740991
MAX_VALUE+1= Infinity
```

所以、對於有些人說 JavaScript 沒有整數型態，因此不適合作科學計算的想法，我認為是有點過度憂慮了。當然、採用64位元浮點數對整數而言是浪費了一點，但現代電腦的記憶體和速度都很快，所以這點浪費並不算太過嚴重就是了！

## 整數

如果超過整數範圍之後，得到的整數就可能會不太準確了。

檔案: intOverflow.js

```javascript
var c = console;

for (var i=1; i<10; i++) {
  var n = i*Number.MAX_SAFE_INTEGER;
  c.log(i+'*MAX_SAFE_INTEGER=', n, '=', n.toExponential()); 
}
```

執行結果

```
D:\Dropbox\gitbook\rlab\code\number>node intOverflow.js

1*MAX_SAFE_INTEGER= 9007199254740991 = 9.007199254740991e+15
2*MAX_SAFE_INTEGER= 18014398509481982 = 1.8014398509481982e+16
3*MAX_SAFE_INTEGER= 27021597764222972 = 2.7021597764222972e+16
4*MAX_SAFE_INTEGER= 36028797018963964 = 3.6028797018963964e+16
5*MAX_SAFE_INTEGER= 45035996273704950 = 4.503599627370495e+16
6*MAX_SAFE_INTEGER= 54043195528445944 = 5.4043195528445944e+16
7*MAX_SAFE_INTEGER= 63050394783186936 = 6.3050394783186936e+16
8*MAX_SAFE_INTEGER= 72057594037927930 = 7.205759403792793e+16
9*MAX_SAFE_INTEGER= 81064793292668910 = 8.106479329266891e+16
```

這種現象在所有採用浮點數系統的程式上都會出現，所以當整數到達16位數時，自然會產生誤差，請務必小心！

如果你真的想要使用精確度更高的《大整數》或任意精度的《實數》，則必須安裝對應的函式庫，像是下列套件：


* https://github.com/dtrebbien/BigDecimal.js

## 實數

電腦用浮點數來《近似的表達實數》，但還是會有些微小的誤差，雖然大部分情況下這些誤差不至於造成嚴重問題，但是在《回饋型系統》當中，就會產生像 [《蝴蝶效應》](https://zh.wikipedia.org/wiki/%E8%9D%B4%E8%9D%B6%E6%95%88%E5%BA%94) 這種《差之毫釐、失之千里》的情況，所以要小心這種誤差的放大效應，特別是經過很多次放大之後的結果。


## 有理數

所謂的《有理數》 (rational number) 就是可以寫成 p/q 這樣分數的數值，也就是可以表達成 ratio 的 number 。(若採比較口語的譯法，應該是《比例數》)。


雖然浮點數已經可以表示很大範圍的整數，而且非常接近實數，但是浮點數會把 1/3 表示為 0.33333.... 這樣的數值。

檔案： real.js

```javascript
console.log('1/3=', 1/3);
```

執行結果：

```
D:\Dropbox\gitbook\rlab\code\number>node real

1/3= 0.3333333333333333
```

這種用浮點數代表有理數的方法，對人類而言有時不夠親切，所以我們也可以自行設計用物件導向的方式，設計《有理數》型態，以下是筆者的實作。

檔案： ratio.js

```javascript
var c = console;

class Ratio {
  constructor(a,b) { this.a = a; this.b = b; }
  
  mul(r2) { return new Ratio(this.a*r2.a, this.b*r2.b); }
  
  div(r2) { return new Ratio(this.a*r2.b, this.b*r2.a); }
  
  inv() { return new Ratio(this.b, this.a); }
  
  add(r2) { return new Ratio(this.a*r2.b+this.b*r2.a, this.b*r2.b); }
  
  sub(r2) { return new Ratio(this.a*r2.b-this.b*r2.a, this.b*r2.b); }
  
  toString() { return this.a+'/'+this.b; }

  parse(s) {
    var m = s.match(/^(\d+)(\/(\d+))?$/);
    var a = parseInt(m[1]);
    var b = typeof m[3]==='undefined'?1:parseInt(m[3]);
    return new Ratio(a, b)
  } 
}

Ratio.parse = Ratio.prototype.parse;

var r0 = Ratio.parse('1/2');
c.log(r0);

r0 = Ratio.parse('1');
c.log(r0);

var r1 = new Ratio(2,3);
c.log(r1.toString());

var r2 = r1.mul(r1).add(r1);
c.log(r2.toString());
```

執行：

```
D:\Dropbox\gitbook\rlab\code\number>node ratio
Ratio { a: 1, b: 2 }
Ratio { a: 1, b: 1 }
2/3
30/27
```


## 複數

要用程式實現複數，也只需要用物件方式實作《加減乘除》等運算，就可以完成了，只是其中的《乘除法》算式比較複雜一點，特別是除法最複雜！


加法： $$(a + bi) + (c + di) = (a + c) + (b + d)i$$

减法： $$(a + bi) - (c + di) = (a - c) + (b - d)i$$

乘法： $$(a + bi) (c + di) = ac + bci + adi + bd i^2 = (ac - bd) + (bc + ad)i$$

除法： $$\frac{(a + bi)}{(c + di)} = \frac{(a+bi)(c-di)}{(c+di)(c-di)} =\frac{ac+bci-adi-bd i^2}{c^2 -(di)^2}=\frac{(ac+bd)+(bc-ad)i}{c^2+d^2}=\left({ac + bd \over c^2 + d^2}\right) + \left( {bc - ad \over c^2 + d^2} \right)i$$

以下實作了這些運算！

檔案： complex.js

```javascript
var c = console;

class Complex {
  constructor(a,b) { this.a = a; this.b = b; }
	
	conj() { return new Complex(this.a, -1*this.b);	}
	
	add(c2) {	return new Complex(this.a+c2.a, this.b+c2.b);	}
	
	sub(c2) {	return new Complex(this.a-c2.a, this.b-c2.b);	}
	
	mul(c2) {
		var a=this.a, b=this.b, c=c2.a, d=c2.b;
		return new Complex(a*c-b*d, a*d+b*c);
	}
	
	div(c2) {
		var a=this.a, b=this.b, c=c2.a, d=c2.b;
		return new Complex((a*c+b*d)/(c*c+d*d), (b*c-a*d)/(c*c+d*d));
	}
	
	toString() { return this.a+'+'+this.b+'i'; }
	
	parse(s) {
		var m = s.match(/^([^\+]*)(\+(.*))?$/);
		var a = parseFloat(m[1]);
		var b = typeof m[3]==='undefined'?1:parseFloat(m[3]);
		return new Complex(a, b)
	}
}

Complex.parse = Complex.prototype.parse;

var c0 = Complex.parse('1+2i');
c.log(c0);

var c1 = new Complex(2,3);
c.log(c1.toString());

var c2 = c1.add(c1).mul(c1).div(c1);
c.log(c2.toString());
```

執行結果：

```
D:\Dropbox\gitbook\rlab\code\number>node complex.js
Complex { a: 1, b: 2 }
2+3i
4+6i
```

尤拉公式是複數上一個很重要的公式，其中的虛數次方代表旋轉：

$$e^{ix}=cos(x) + i sin(x) $$

如果我們用半徑 r 乘上代表單位旋轉的  $$e^{ix}=cos(x) + i sin(x) $$ ，也就是採用下列表達式：

$$r e^{ix}=r (cos(x) + i sin(x)) $$

那麼就可以代表複平面上的任何一個點，其實這就是極座標形式的表示法。

如果我們把 r 寫成 $$e^w$$ ，那麼整個算式就可以被《指數化》了，形成下列的複指數形式：

$$e^{w+ix}=e^w e^{ix}=r (cos(x) + i sin(x))=a+bi $$

於是當我們對 $$a+bi$$ 取《自然對數》 ln 運算時，就會得到

$$w+ix = \ln(a+bi)$$

問題是，到底 w,x, 和 a,b 之間該如何轉換呢？

基本上 r 就是半徑，也就是 $$r=\sqrt{a^2+b^2}=e^w$$  ，所以 $$w = ln(r)=ln(\sqrt{a^2+b^2})=\frac{1}{2} ln(a^2+b^2)$$

而 x 的求法則可直接利用三角函數 $$cos(x) = a/r$$ 的關係式，得到：

$$x=cos^{-1}(a/r)=cos^{-1}(a/\sqrt{a^2+b^2})$$ 

於是我們可以得到 w, x 的轉換式如下：

$$w={1 \over 2} \ln(a^2+b^2)$$
$$x=cos^{-1}(a/\sqrt{a^2+b^2})$$ 

於是我們可以為上面的《複數》物件加入 exp 與 ln 函數，擴充程式如下：


檔案： Complex.js

```javascript
var c = console;

class Complex {
  constructor(a,b) { this.a = a; this.b = b; }
  
  conj() { return new Complex(this.a, -1*this.b); }
  
  add(c2) { return new Complex(this.a+c2.a, this.b+c2.b); }
  
  sub(c2) { return new Complex(this.a-c2.a, this.b-c2.b); }
  
  mul(c2) {
    var a=this.a, b=this.b, c=c2.a, d=c2.b;
    return new Complex(a*c-b*d, a*d+b*c);
  }
  
  div(c2) {
    var a=this.a, b=this.b, c=c2.a, d=c2.b;
    return new Complex((a*c+b*d)/(c*c+d*d), (b*c-a*d)/(c*c+d*d));
  }
  
  toString() { return this.a+'+'+this.b+'i'; }
  
  parse(s) {
    var m = s.match(/^([^\+]*)(\+(.*))?$/);
    var a = parseFloat(m[1]);
    var b = typeof m[3]==='undefined'?1:parseFloat(m[3]);
    return new Complex(a, b)
  }
  
  ln() {
    var a=this.a, b=this.b, r=a*a+b*b;
    var w = 1/2*Math.log(r);
    var x = Math.acos(a/Math.sqrt(r));
    return new Complex(w, x);
  }
  
  exp() {
    var a=this.a, b=this.b;
    var r=Math.exp(a);
    return new Complex(r*Math.cos(b), r*Math.sin(b));
  }
}

Complex.parse = Complex.prototype.parse;

var c0 = Complex.parse('1+2i');
c.log(c0);

var c1 = new Complex(2,3);
c.log(c1.toString());

var c2 = c1.add(c1).mul(c1).div(c1);
c.log(c2.toString());

c.log(c1.ln().toString());

c.log(c1.exp().ln().toString());
```

然後執行該程式，結果如下：

```
D:\Dropbox\gitbook\rlab\code\number>node complex.js
Complex { a: 1, b: 2 }
2+3i
4+6i
1.2824746787307684+0.982793723247329i
2+2.9999999999999996i
```

您可以看到 (2+3i).exp().ln() 的結果為2+2.9999999999999996i，基本上驗證的這個程式是對的，只有非常微小的誤差！

## 小結

現在我們已經認識了《整數、實數、有理數、複數》以及《浮點數這種電腦表示法》，還有這些《數值》在電腦上的實作方法。

如果就這樣結束，未免太過可惜，因為這些《數量》所形成的《群體》，是讓我們進入《代數領域》的關鍵。

所以我們將在下一章，探討《代數》這個議題，這可是數學領域中非常重要的一個分支呢？



