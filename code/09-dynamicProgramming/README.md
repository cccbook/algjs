# HMM

## viterbi.js

問題：尋找產生某『表現序列』最可能的『隱狀態序列』

範例：根據下列規則，請問『喵 喵 汪』中每個詞彙最可能的詞性會是什麼？

轉移機率與規則

```
N 0.6 => 喵 0.4 | 汪 0.6
V 0.4 => 喵 0.5 | 汪 0.5

    N   V
 N  0.3 0.7
 V  0.8 0.2
```

執行結果

```
$ node viterbi
t=1 path={"N":["V","N"],"V":["N","V"]}
t=2 path={"N":["N","V","N"],"V":["V","N","V"]}
T=[{"N":0.24,"V":0.2},{"N":0.06400000000000002,"V":0.08399999999999999},{"N":0.040319999999999995,"V":0.022400000000000003}]
prob=0.040319999999999995 path=["N","V","N"]
```

## 觀念

* [維基百科:維特比演算法](https://zh.wikipedia.org/wiki/%E7%BB%B4%E7%89%B9%E6%AF%94%E7%AE%97%E6%B3%95)
* [自然語言處理 -- Hidden Markov Model](https://ckmarkoh.github.io/blog/2014/04/03/natural-language-processing-hidden-markov-models/)
* [自然語言處理 -- Viterbi Algorithm](https://ckmarkoh.github.io/blog/2014/04/06/natural-language-processing-viterbi-algorithm/)

## 實作

* https://github.com/miguelmota/hidden-markov-model
* https://github.com/123jimin/hmm.js/blob/master/hmm.js
* https://github.com/123jimin/hmm.js/tree/master