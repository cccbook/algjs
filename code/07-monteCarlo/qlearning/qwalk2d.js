const R = require('./rand')
const Q = require('./qlearning')

class QWalk2D extends Q {
  constructor() {
    super()
  }
  init() {
    let width = this.width = 3
    let height = this.height = 3
    this.goal = {x:3,y:3}
    let q = this.q = {}
    for (let x=0; x<=this.width; x++) {
      for (let y=0; y<=this.height; y++) {
        let key = JSON.stringify({x:x, y:y})
        q[key] = {'←' :0, '→':0, '↑':0, '↓':0 }
      }
    }
  }
  getStart() {
    return { x:R.randInt(0, this.width+1), y:R.randInt(0, this.height+1) }
  }
  isGoal(s) { return s.x === this.goal.x && s.y === this.goal.y }
  chooseAction(s) {
    let a = R.randChoose(['←', '→', '↑', '↓'])
    if (a === '↑' && s.x <= 0) return '↓'
    if (a === '↓' && s.x >= this.height) return '↑'
    if (a === '←' && s.y <= 0) return '→'
    if (a === '→' && s.y >= this.width) return '←'
    return a
  }
  doAction(s, a) {
    const s1 = { x: s.x, y: s.y }
    switch (a) {
      case '↑'   : s1.x = s.x - 1; break
      case '↓' : s1.x = s.x + 1; break
      case '←' : s1.y = s.y - 1; break
      case '→': s1.y = s.y + 1; break
    }
    const r = (this.isGoal(s1)) ? 1 : 0
    return {s1, r}
  }
  dump(q) {
    let r = []
    for (let x=0; x <= this.width; x++) {
      for (let y=0; y <= this.height; y++) {
        let xy = JSON.stringify({x:x,y:y})
        r.push(x+','+y +':←' + q[xy]['←'].toFixed(4) + '→' + q[xy]['→'].toFixed(4) + '↑' + q[xy]['↑'].toFixed(4) + '↓' + q[xy]['↓'].toFixed(4))
      }
    }
    return r.join('\n')
  }
}

const q = new QWalk2D()
q.learning({maxLoops:100, rate:0.1, decay: 0.8})
