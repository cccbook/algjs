const F = module.exports = {}

F.f1 = (x,y,z) => (x||y)&&(x||!y||z)&&(!x||y||z)

console.log(F.f1(true, false, true))