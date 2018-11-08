function satisfy(exp, vars, values) { // 測試 exp 在指令 vars[0..i]=values[0..i] 時，是否能被滿足。
  if (values.length === vars.length) {
    let assign = {}
    for (var i in vars) {
      assign[vars[i]] = values[i]
    }
    with (assign) {
      let result = eval(exp)
      console.log('%j => %d', assign, result)
      if (result) return values
    }
    return
  }
  let v0 = values.slice(0)
  let v1 = values.slice(0)
  v0.push(0)
  v1.push(1)
  return satisfy(exp, vars, v0) || satisfy(exp, vars, v1)
}

function SAT(exp, vars) {
  console.log('exp=', exp)
  let values = satisfy(exp, vars, [])
  return values
}

console.log(SAT('(x||y)&&(!x||!z)&&(x)&&(y)', ['x', 'y', 'z']))
console.log(SAT('(x)&&(!x)&&(!y)&&(!z)', ['x', 'y', 'z']))