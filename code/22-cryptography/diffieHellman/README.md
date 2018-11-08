# Diffie Hallman Key Exchange

## 執行

```
$ node .\diffieHellman.js
Alice.K = 2
Bob.K   = 2
```

## 原理

* [維基百科:迪菲-赫爾曼密鑰交換](https://zh.wikipedia.org/wiki/%E8%BF%AA%E8%8F%B2-%E8%B5%AB%E7%88%BE%E6%9B%BC%E5%AF%86%E9%91%B0%E4%BA%A4%E6%8F%9B) (讚！)
* [Public key cryptography: What is it?](https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt/v/diffie-hellman-key-exchange-part-1)
* [Diffie-hellman key exchange](https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt/v/diffie-hellman-key-exchange-part-2)


## 數學

定理： <img src="https://latex.codecogs.com/gif.latex?(g%5Ea)%5Eb%20%3D%20g%5E%7Bab%7D%20%3D%20(g%5Eb)%5Ea%20(mod%5C%3Bp)"/>


<img src="http://plantuml.rado0x54.com/png?uml=%40startuml%0D%0AAlice%20-%3E%20Alice%3A%20choose%20g%2C%20p%2C%20a%0D%0AAlice%20-%3E%20Alice%3A%20A%3Dg%5Ea%25p%0D%0AAlice%20-%3E%20Bob%3A%20g%2C%20p%2C%20A%0D%0ABob%20-%3E%20Bob%3A%20choose%20b%0D%0ABob%20-%3E%20Bob%3A%20B%20%3D%20g%5Eb%20%25p%0D%0ABob%20-%3E%20Bob%3A%20K%20%3D%20A%5Eb%20%25p%20%3D%20g%5Eab%20%25p%0D%0ABob%20-%3E%20Alice%3A%20B%0D%0AAlice%20-%3E%20Alice%3A%20K%3DB%5Ea%20%25%20p%20%3D%20g%5Eab%20%25%20p%0D%0A%40enduml"/>

<!--
(g^a %p)^b %p = g^{ab} %p = (g^b %p)^a %p

```
Alice                       Bob
a, g, p                     b
A = g^a % p    =(g,p,A)=>   B = g^b % p
K = B^a % p     <=(B)=      K = A^b % p
  = g^ab %p                   = g^ab %p
```
-->

