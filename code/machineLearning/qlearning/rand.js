const R = module.exports = {}

R.rand = function (a,b) {
  return a + (b-a)*Math.random()
}

R.randInt = function (a,b) {
  return Math.floor(R.rand(a,b))
}

R.randChoose = function (list) {
  return list[R.randInt(0, list.length)]
}
