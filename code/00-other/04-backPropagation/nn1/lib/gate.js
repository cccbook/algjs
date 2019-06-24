module.exports = class Gate {
  constructor(o, x, y, f, gfx, gfy) {
    this.p = {o:o, x:x, y:y, f:f, gfx:gfx, gfy:gfy||gfx}
  }

  forward() {
    let p = this.p
    p.o.v = p.f(p.x.v, p.y.v)
  }

  backward() {
    let p = this.p
    p.x.g = p.gfx(p.o.v)
    p.y.g = p.gfy(p.o.v)
  }
}
