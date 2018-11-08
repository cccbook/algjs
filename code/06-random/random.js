var seed = 371
const SEED_MAX = 9999997

function random() {
    seed = (seed+37 ) % SEED_MAX
    var x = Math.sin(seed) * 93177
    return x - Math.floor(x);
}

module.exports = random