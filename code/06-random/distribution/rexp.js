/*

定理： 對任一連續分佈 F, 隨機變量 $X = F^{-1}(U)$ 的分佈為 F

參考： https://zh.wikipedia.org/wiki/%E9%80%86%E5%8F%98%E6%8D%A2%E9%87%87%E6%A0%B7

範例： 指數分佈的密度函數為 $f(x) = \lambda e^{-lambda x}$ 

其累積密度函數為 ＄F(x) = 1-e^{-\lambda} x$ ， 

Ｆ的逆變換為 $invF = -1/{\lambda} log(1-U)$

因此我們可以用 invF 來產生該分佈的樣本。

*/

function rexp(lambda) {
  return (-1/lambda) * Math.log(1-Math.random())
}

for (let i=0; i<100; i++) {
  console.log('rexp(20)=', rexp(20))
}
