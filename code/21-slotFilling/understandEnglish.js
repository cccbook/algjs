var e2c={dog:"狗", cat:"貓", eat:"吃", chase:"追", a:"一隻"};

function find(s, from, words) {
  for (var i=from; i<s.length; i++) {
    if (words.indexOf(s[i]) >=0)
      return i;
  }
  return -1;
}

function understand(s) {
  var vi = find(s, 0, ["eat", "chase"]);
  var si = find(s, 0, ["dog", "cat"]);
  var oi = find(s, vi, ["dog", "cat"]);
  console.log("s=%s v=%s o=%s", e2c[s[si]], e2c[s[vi]], e2c[s[oi]]);
}

understand(process.argv.slice(2));