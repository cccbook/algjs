module.exports = class FNet {

  constructor(net, vars) {
    this.net = net
    this.vars = vars
  }

  setValues(p) {
    for (let k in p) {
      this.vars[k].v = p[k]
    }
  }

  getGrads() {
    let grads = {}
    for (let k in this.vars) {
      grads[k] = this.vars[k].g
    }
    return grads
  }

  f(p) {
    this.setValues(p)
    let o = this.net.forward()
    return o.v
  }

  grad(p) {
    this.f(p)
    this.net.backward()
    return this.getGrads()
  }
  
  dump() {
    return this.net.dump()
  }
}
