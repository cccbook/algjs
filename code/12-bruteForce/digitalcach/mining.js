const crypto = require('crypto');

let record = {
  nonce: 0,
  data: 'john => mary : $2.7; george => john : $1.3',
}

function hash (text) {
  return crypto.createHmac('sha256', '').update(text).digest('hex')
}

function mining(record) {
  for (var nonce=0; nonce<1000000000000; nonce++) {
    record.nonce = nonce
    let h = hash(JSON.stringify(record))
    if (h.startsWith('00000')) return { nonce: nonce, hash: h }
  }
}

console.log(mining(record))