const Node = require('./node')
const Gate = require('./gate')

module.exports = class Net {

  constructor () {
    this.gates = []
  }

  variable (v, g) {
    return new Node(v, g)
  }

  op (x, y, f, gfx, gfy) {
    let o = new Node()
    let g = new Gate(o, x, y, f, gfx, gfy)
    this.gates.push(g)
    this.o = o
    return o
  }

  add (x, y) { return this.op(x, y, (x,y)=>x+y, (x,y)=>1) }
  mul (x, y) { return this.op(x, y, (x,y)=>x*y, (x,y)=>y, (x,y)=>x) }

  forward() { // 正向傳遞計算結果
    for (let gate of this.gates) {
      gate.forward()
    }
    return this.o
  }

  backward() { // 反向傳遞計算梯度
    this.o.g = 1 // 設定輸出節點 o 的梯度為 1
    for (let i=this.gates.length-1; i>=0; i--) { // 反向傳遞計算每個節點 Node 的梯度 g
      let gate = this.gates[i]
      gate.backward()
    }
  }

  watch (nodes) {
    this.nodes = nodes
  }

  dump() {
    return this.nodes
  }
}



