# 實作：遺傳演算法

## 演算法

```js
GA.run=function(size, maxGen) {
  GA.population = GA.newPopulation(size);
  for (t = 0; t < maxGen; t++) {
    console.log("============ generation", t, "===============")
    GA.population = GA.reproduction(GA.population);
    GA.dump();
  }
}
```

## 問題

問題：尋找金鑰： key = "1010101010101010";

fitness 計算： 有多少位元和金鑰一樣就得多少分

設定：population 大小為 100, mutationRate=0.1,

結果：第 26 代就找到正確答案，總共執行一百代

```
$ node GA

============ generation 0 ===============
0 { chromosome: '0110010111100101', fitness: 5 }
1 { chromosome: '0001010101101111', fitness: 5 }
2 { chromosome: '0111001101110111', fitness: 5 }
3 { chromosome: '0110010110100101', fitness: 6 }
4 { chromosome: '1011010100001101', fitness: 6 }
5 { chromosome: '0101111100000110', fitness: 6 }
6 { chromosome: '1101000010010100', fitness: 6 }
7 { chromosome: '1001001101110001', fitness: 6 }
8 { chromosome: '1001011111000001', fitness: 6 }
9 { chromosome: '0101011110100110', fitness: 7 }
10 { chromosome: '1001111001110111', fitness: 7 }
11 { chromosome: '0111001100001100', fitness: 7 }
12 { chromosome: '1001111111000100', fitness: 7 }
13 { chromosome: '0110000101101111', fitness: 7 }
14 { chromosome: '0001100101101100', fitness: 7 }
15 { chromosome: '1100010100001011', fitness: 7 }
16 { chromosome: '0101011011101111', fitness: 7 }
17 { chromosome: '1110000101001100', fitness: 7 }
18 { chromosome: '0101011110101001', fitness: 7 }
19 { chromosome: '1101000010010011', fitness: 7 }
20 { chromosome: '0001111100001100', fitness: 7 }
21 { chromosome: '0001100100110110', fitness: 7 }
22 { chromosome: '1100011001100001', fitness: 7 }
23 { chromosome: '1111001100101101', fitness: 8 }
24 { chromosome: '0011000100111000', fitness: 8 }
25 { chromosome: '0000100000000001', fitness: 8 }
26 { chromosome: '0000000000111111', fitness: 8 }
27 { chromosome: '0101100000111011', fitness: 8 }
28 { chromosome: '1100011000110011', fitness: 8 }
29 { chromosome: '1001111111000000', fitness: 8 }
30 { chromosome: '0101100000111011', fitness: 8 }
31 { chromosome: '1011110101001000', fitness: 8 }
32 { chromosome: '0000001001100001', fitness: 8 }
33 { chromosome: '1000110100000000', fitness: 8 }
34 { chromosome: '0010011000110100', fitness: 8 }
35 { chromosome: '0110001001011011', fitness: 8 }
36 { chromosome: '0011110001101111', fitness: 8 }
37 { chromosome: '1111000100101111', fitness: 8 }
38 { chromosome: '0111101011011001', fitness: 8 }
39 { chromosome: '1000000100110110', fitness: 8 }
40 { chromosome: '0001011010101101', fitness: 8 }
41 { chromosome: '0001100101101000', fitness: 8 }
42 { chromosome: '1100011000001111', fitness: 8 }
43 { chromosome: '1010000100011001', fitness: 8 }
44 { chromosome: '1101111111101111', fitness: 8 }
45 { chromosome: '0110011011001100', fitness: 8 }
46 { chromosome: '1101101110001111', fitness: 9 }
47 { chromosome: '1001111111001000', fitness: 9 }
48 { chromosome: '0000101111000011', fitness: 9 }
49 { chromosome: '1000101100001101', fitness: 9 }
50 { chromosome: '1000000101101110', fitness: 9 }
51 { chromosome: '1110000101101110', fitness: 9 }
52 { chromosome: '1100100000100001', fitness: 9 }
53 { chromosome: '1011001011000100', fitness: 9 }
54 { chromosome: '0101101111101110', fitness: 9 }
55 { chromosome: '1001100100111000', fitness: 9 }
56 { chromosome: '0111110110101000', fitness: 9 }
57 { chromosome: '1001000011100000', fitness: 9 }
58 { chromosome: '0110101001100001', fitness: 9 }
59 { chromosome: '1001111001101111', fitness: 9 }
60 { chromosome: '0101100000111010', fitness: 9 }
61 { chromosome: '1011011000111111', fitness: 9 }
62 { chromosome: '0101101110101011', fitness: 10 }
63 { chromosome: '0111101011001110', fitness: 10 }
64 { chromosome: '0110011010110010', fitness: 10 }
65 { chromosome: '0011110010101111', fitness: 10 }
66 { chromosome: '0111100010011010', fitness: 10 }
67 { chromosome: '0000100110011010', fitness: 10 }
68 { chromosome: '1011111111101111', fitness: 10 }
69 { chromosome: '0111101011011010', fitness: 10 }
70 { chromosome: '1000000100101000', fitness: 10 }
71 { chromosome: '1110101100111001', fitness: 10 }
72 { chromosome: '0011001110001011', fitness: 10 }
73 { chromosome: '1111001100101110', fitness: 10 }
74 { chromosome: '1111011110101110', fitness: 10 }
75 { chromosome: '0000001111101110', fitness: 10 }
76 { chromosome: '0000100110000010', fitness: 10 }
77 { chromosome: '1111011110101110', fitness: 10 }
78 { chromosome: '0011110010111010', fitness: 11 }
79 { chromosome: '1111111011101000', fitness: 11 }
80 { chromosome: '0000110010111010', fitness: 11 }
81 { chromosome: '1110101101111010', fitness: 11 }
82 { chromosome: '1111001011101110', fitness: 11 }
83 { chromosome: '1011100010110000', fitness: 11 }
84 { chromosome: '1011101010000100', fitness: 11 }
85 { chromosome: '1010101100111001', fitness: 11 }
86 { chromosome: '1001101111001010', fitness: 11 }
87 { chromosome: '1111001011101000', fitness: 11 }
88 { chromosome: '0110101001101011', fitness: 11 }
89 { chromosome: '1001111110101110', fitness: 11 }
90 { chromosome: '1011100010110000', fitness: 11 }
91 { chromosome: '0000001000101000', fitness: 11 }
92 { chromosome: '1011001010111000', fitness: 12 }
93 { chromosome: '1110101111001010', fitness: 12 }
94 { chromosome: '0110101010001011', fitness: 12 }
95 { chromosome: '1011001000101000', fitness: 12 }
96 { chromosome: '1111101010100000', fitness: 12 }
97 { chromosome: '0000101110101011', fitness: 12 }
98 { chromosome: '1011001010111000', fitness: 12 }
99 { chromosome: '0000101110101000', fitness: 12 }
============ generation 1 ===============
0 { chromosome: '0100000100110110', fitness: 6 }
1 { chromosome: '0001011111011010', fitness: 7 }
2 { chromosome: '0001100101101111', fitness: 7 }
3 { chromosome: '0110000101101001', fitness: 7 }
4 { chromosome: '0001100101101001', fitness: 7 }
5 { chromosome: '0110000101101111', fitness: 7 }
6 { chromosome: '0111100100110110', fitness: 7 }
7 { chromosome: '0001100100110110', fitness: 7 }
8 { chromosome: '0001100100111111', fitness: 7 }

...
============ generation 5 ===============
0 { chromosome: '1101101100101110', fitness: 10 }
1 { chromosome: '0110101100101100', fitness: 10 }
2 { chromosome: '0000101100101110', fitness: 11 }
3 { chromosome: '1111101100001010', fitness: 11 }
4 { chromosome: '0000101100101000', fitness: 11 }
5 { chromosome: '1101101111101010', fitness: 11 }
6 { chromosome: '1011101101101110', fitness: 11 }
7 { chromosome: '0111101000101110', fitness: 11 }
8 { chromosome: '1110101111101110', fitness: 12 }
9 { chromosome: '1011001010001011', fitness: 12 }
10 { chromosome: '1010100000111110', fitness: 12 }
11 { chromosome: '0000101011101000', fitness: 12 }
12 { chromosome: '1010101101101110', fitness: 12 }
13 { chromosome: '1110101011001000', fitness: 12 }
14 { chromosome: '1111001010101110', fitness: 12 }
15 { chromosome: '1111111110101010', fitness: 12 }
16 { chromosome: '0001101010101000', fitness: 12 }
17 { chromosome: '1010101101101110', fitness: 12 }
18 { chromosome: '1011001000101000', fitness: 12 }
19 { chromosome: '1110101111101011', fitness: 12 }
20 { chromosome: '1010101111111110', fitness: 12 }
21 { chromosome: '1111101010001000', fitness: 12 }
22 { chromosome: '1111101010001011', fitness: 12 }
23 { chromosome: '1110101110001000', fitness: 12 }
24 { chromosome: '1011101111101000', fitness: 12 }
25 { chromosome: '1001111011101010', fitness: 12 }
26 { chromosome: '1110101100001010', fitness: 12 }
27 { chromosome: '1110101111101000', fitness: 12 }
28 { chromosome: '1010101100001110', fitness: 12 }
============ generation 6 ===============
0 { chromosome: '1001111000101110', fitness: 11 }
1 { chromosome: '1011111111101000', fitness: 11 }
2 { chromosome: '0001101000101110', fitness: 11 }
...
============ generation 99 ===============
0 { chromosome: '1000101010101010', fitness: 15 }
1 { chromosome: '1010101010001010', fitness: 15 }
2 { chromosome: '1010101010001010', fitness: 15 }
3 { chromosome: '1010101010100010', fitness: 15 }
4 { chromosome: '1011101010101010', fitness: 15 }
5 { chromosome: '1010101010101011', fitness: 15 }
6 { chromosome: '1010101010101010', fitness: 16 }
7 { chromosome: '1010101010101010', fitness: 16 }
8 { chromosome: '1010101010101010', fitness: 16 }
9 { chromosome: '1010101010101010', fitness: 16 }
10 { chromosome: '1010101010101010', fitness: 16 }
11 { chromosome: '1010101010101010', fitness: 16 }
12 { chromosome: '1010101010101010', fitness: 16 }
13 { chromosome: '1010101010101010', fitness: 16 }
14 { chromosome: '1010101010101010', fitness: 16 }
15 { chromosome: '1010101010101010', fitness: 16 }
16 { chromosome: '1010101010101010', fitness: 16 }
17 { chromosome: '1010101010101010', fitness: 16 }
18 { chromosome: '1010101010101010', fitness: 16 }
19 { chromosome: '1010101010101010', fitness: 16 }
20 { chromosome: '1010101010101010', fitness: 16 }
21 { chromosome: '1010101010101010', fitness: 16 }
22 { chromosome: '1010101010101010', fitness: 16 }
23 { chromosome: '1010101010101010', fitness: 16 }
24 { chromosome: '1010101010101010', fitness: 16 }
25 { chromosome: '1010101010101010', fitness: 16 }
26 { chromosome: '1010101010101010', fitness: 16 }
27 { chromosome: '1010101010101010', fitness: 16 }
28 { chromosome: '1010101010101010', fitness: 16 }
29 { chromosome: '1010101010101010', fitness: 16 }
30 { chromosome: '1010101010101010', fitness: 16 }
31 { chromosome: '1010101010101010', fitness: 16 }
32 { chromosome: '1010101010101010', fitness: 16 }
33 { chromosome: '1010101010101010', fitness: 16 }
34 { chromosome: '1010101010101010', fitness: 16 }
35 { chromosome: '1010101010101010', fitness: 16 }
36 { chromosome: '1010101010101010', fitness: 16 }
37 { chromosome: '1010101010101010', fitness: 16 }
38 { chromosome: '1010101010101010', fitness: 16 }
39 { chromosome: '1010101010101010', fitness: 16 }
40 { chromosome: '1010101010101010', fitness: 16 }
41 { chromosome: '1010101010101010', fitness: 16 }
42 { chromosome: '1010101010101010', fitness: 16 }
43 { chromosome: '1010101010101010', fitness: 16 }
44 { chromosome: '1010101010101010', fitness: 16 }
45 { chromosome: '1010101010101010', fitness: 16 }
46 { chromosome: '1010101010101010', fitness: 16 }
47 { chromosome: '1010101010101010', fitness: 16 }
48 { chromosome: '1010101010101010', fitness: 16 }
49 { chromosome: '1010101010101010', fitness: 16 }
50 { chromosome: '1010101010101010', fitness: 16 }
51 { chromosome: '1010101010101010', fitness: 16 }
52 { chromosome: '1010101010101010', fitness: 16 }
53 { chromosome: '1010101010101010', fitness: 16 }
54 { chromosome: '1010101010101010', fitness: 16 }
55 { chromosome: '1010101010101010', fitness: 16 }
56 { chromosome: '1010101010101010', fitness: 16 }
57 { chromosome: '1010101010101010', fitness: 16 }
58 { chromosome: '1010101010101010', fitness: 16 }
59 { chromosome: '1010101010101010', fitness: 16 }
60 { chromosome: '1010101010101010', fitness: 16 }
61 { chromosome: '1010101010101010', fitness: 16 }
62 { chromosome: '1010101010101010', fitness: 16 }
63 { chromosome: '1010101010101010', fitness: 16 }
64 { chromosome: '1010101010101010', fitness: 16 }
65 { chromosome: '1010101010101010', fitness: 16 }
66 { chromosome: '1010101010101010', fitness: 16 }
67 { chromosome: '1010101010101010', fitness: 16 }
68 { chromosome: '1010101010101010', fitness: 16 }
69 { chromosome: '1010101010101010', fitness: 16 }
70 { chromosome: '1010101010101010', fitness: 16 }
71 { chromosome: '1010101010101010', fitness: 16 }
72 { chromosome: '1010101010101010', fitness: 16 }
73 { chromosome: '1010101010101010', fitness: 16 }
74 { chromosome: '1010101010101010', fitness: 16 }
75 { chromosome: '1010101010101010', fitness: 16 }
76 { chromosome: '1010101010101010', fitness: 16 }
77 { chromosome: '1010101010101010', fitness: 16 }
78 { chromosome: '1010101010101010', fitness: 16 }
79 { chromosome: '1010101010101010', fitness: 16 }
80 { chromosome: '1010101010101010', fitness: 16 }
81 { chromosome: '1010101010101010', fitness: 16 }
82 { chromosome: '1010101010101010', fitness: 16 }
83 { chromosome: '1010101010101010', fitness: 16 }
84 { chromosome: '1010101010101010', fitness: 16 }
85 { chromosome: '1010101010101010', fitness: 16 }
86 { chromosome: '1010101010101010', fitness: 16 }
87 { chromosome: '1010101010101010', fitness: 16 }
88 { chromosome: '1010101010101010', fitness: 16 }
89 { chromosome: '1010101010101010', fitness: 16 }
90 { chromosome: '1010101010101010', fitness: 16 }
91 { chromosome: '1010101010101010', fitness: 16 }
92 { chromosome: '1010101010101010', fitness: 16 }
93 { chromosome: '1010101010101010', fitness: 16 }
94 { chromosome: '1010101010101010', fitness: 16 }
95 { chromosome: '1010101010101010', fitness: 16 }
96 { chromosome: '1010101010101010', fitness: 16 }
97 { chromosome: '1010101010101010', fitness: 16 }
98 { chromosome: '1010101010101010', fitness: 16 }
99 { chromosome: '1010101010101010', fitness: 16 }
```