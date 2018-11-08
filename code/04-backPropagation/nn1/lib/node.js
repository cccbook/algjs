module.exports = class Node {
  constructor(v = 0, g = 0) {
    this.v = v // 輸出值 (f(x))
    this.g = g // 梯度值 (偏微分)
  }
}
