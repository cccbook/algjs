var BayesLogic = require('./BayesLogic')

class NaiveBayesLogic extends BayesLogic {
  P(Q, E) { // P(Q,E) = P(Q<=E)
    var prob = super.P(Q, E)
    if (prob != null) return prob
    var q = Q.split('&').filter((x)=>x!=='')
    var e = E.split('&').filter((x)=>x!=='')
    prob = 1.0
    switch (e.length) {
      case 0: // P(q1...qn) = P(q1..qn-1|qn)*P(qn)
        if (q.length == 1) throw new Error('pmap' + qs + ' is not found!')
        var n = q.length-1
        var qhead = q.slice(0, n) // qhead = q1..qn-1
        var qn = q[n]
        return this.P(qhead.join('&'), qn)*this.P(qn,'')
      case 1: // P(q1,...qn|e) = P(q1|e)*...*P(qn|e) ; 這就是 Naive 的地方！
        for (var i in q) {
            prob *= this.pmap[q[i]+'<='+E]
        }
        return prob
      default: // >= 2 : P(q|e)=P(q,e)/P(e)
        return this.P(Q+'&'+E, '')/this.P(E, '')
    }
  }
}

BayesLogic.test(new NaiveBayesLogic())
