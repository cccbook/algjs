# 隨機分佈

## 0-1 之間的均等分布之亂數產生



## 


## 非均等分佈之亂數產生 -- 逆變換法

定理： 對任一連續分佈 F, 隨機變量 <img src="https://latex.codecogs.com/gif.latex?X%20%3D%20F%5E%7B-1%7D(U)"/> 的分佈為 F

參考： https://zh.wikipedia.org/wiki/%E9%80%86%E5%8F%98%E6%8D%A2%E9%87%87%E6%A0%B7

範例： 指數分佈的密度函數為 <img src="https://latex.codecogs.com/gif.latex?f(x)%20%3D%20%5Clambda%20e%5E%7B-%5Clambda%20x%7D"/> 

其累積密度函數為 <img src="https://latex.codecogs.com/gif.latex?F(x)%20%3D%201-e%5E%7B-%5Clambda%7D%20x"/> ， 

Ｆ的逆變換為 <img src="https://latex.codecogs.com/gif.latex?F%5E%7B-1%7D%20%3D%20%5Cfrac%7B-1%7D%7B%5Clambda%7D%20log(1-U)"/>

因此我們可以用 <img src="https://latex.codecogs.com/gif.latex?F%5E%7B-1%7D"/> 來產生該分佈的樣本。

