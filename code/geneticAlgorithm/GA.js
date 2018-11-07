var GA={
  population:[],    // 族群
  mutationRate:0.1, // 突變率
}

GA.run=function(size, maxGen) { // 遺傳演算法主程式
  GA.population = GA.newPopulation(size); // 產生初始族群
  for (t = 0; t < maxGen; t++) { // 最多產生 maxGen 代
    console.log("============ generation", t, "===============")
    GA.population = GA.reproduction(GA.population); // 產生下一代
    GA.dump(); // 印出目前族群
  }
}

GA.newPopulation=function(size) {
  var newPop=[];
  for (var i=0; i<size; i++) {
    var chromosome = GA.randomChromosome(); // 隨機產生新染色體
    newPop[i] = { chromosome:chromosome, 
               fitness:GA.calcFitness(chromosome) };
  }
  newPop.sort(fitnessCompare); // 對整個族群進行排序
  return newPop;
}

var fitnessCompare=(c1,c2)=>c1.fitness - c2.fitness;

// 輪盤選擇法: 隨機選擇一個個體 -- 落點在 i*i ~ (i+1)*(i+1) 之間都算是 i
GA.selection = function() {
  var n = GA.population.length;
  var shoot  = randomInt(0, n*n/2);
  var select = Math.floor(Math.sqrt(shoot*2));
  return GA.population[select];
}

// 產生下一代
GA.reproduction=function() {
  var newPop = []
  for (var i = 0; i < GA.population.length; i++) {
    var parent1 = GA.selection(); // 選取父親
    var parent2 = GA.selection(); // 選取母親
    var chromosome = GA.crossover(parent1, parent2); // 父母交配，產生小孩
    var prob = random(0,1);
    if (prob < GA.mutationRate) // 有很小的機率
      chromosome = GA.mutate(chromosome); // 小孩會突變
    newPop[i] = { chromosome:chromosome, fitness:GA.calcFitness(chromosome) }; // 將小孩放進下一代族群裡
  }
  newPop.sort(fitnessCompare); // 對新一代根據適應性（分數）進行排序
  return newPop;
}

GA.dump = function() { // 印出一整代成員
  for (var i=0; i<GA.population.length; i++) {
    console.log(i, GA.population[i]);
  }
}

function random(a,b) { // 取得 a 到 b 之間的一個浮點亂數
  return a+Math.random()*(b-a);
}

function randomInt(a,b) { // 取得 a 到 b 之間的一個整數亂數
  return Math.floor(random(a,b));
}

function randomChoose(array) { // 隨機取得 array 陣列的一個元素
  return array[randomInt(0, array.length)];
}

// 以上是遺傳演算法的框架，以下是實例
var KeyGA = GA; // 此實例是要找出和 KeyGA 一模一樣的序列

KeyGA.key = "1010101010101010";

KeyGA.randomChromosome=function() { // 隨機產生一個染色體 (一個 16 位元的 01 字串)
  var bits=[];
  for (var i=0; i<KeyGA.key.length; i++) {
    var bit = randomInt(0,2);
    bits.push(bit);
  }
  return bits.join('');
}

KeyGA.calcFitness=function(c) { // 分數是和 key 一致的位元個數
  var fitness=0;
  for (var i=0; i<KeyGA.key.length; i++) {
    fitness += (c[i]===KeyGA.key[i])?1:0;
  }
  return fitness;
}

KeyGA.crossover=function(p1,p2) {
  var cutIdx = randomInt(0, p1.chromosome.length);
  var head   = p1.chromosome.substr(0, cutIdx);
  var tail   = p2.chromosome.substr(cutIdx);
  return head + tail;
}

KeyGA.mutate=function(chromosome) { // 突變運算
  var i=randomInt(0, chromosome.length); // 選擇突變點
  var cMutate=chromosome.substr(0, i)+
          randomChoose(['0','1'])+ // 在突變點上隨機選取 0 或 1
          chromosome.substr(i+1);
  return cMutate; // 傳回突變後的染色體
}

// 執行遺傳演算法，企圖找到 key，最多執行一百代，每代族群都是一百人
KeyGA.run(100, 100);
