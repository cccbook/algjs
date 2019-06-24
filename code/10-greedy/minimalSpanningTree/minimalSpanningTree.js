// See http://en.wikipedia.org/wiki/Kruskal's_algorithm
// and http://programmingpraxis.com/2010/04/06/minimum-spanning-tree-kruskals-algorithm/

var nodes = ["A", "B", "C", "D", "E", "F", "G"]
var edges = [
    ["A", "B", 7], ["A", "D", 5],
    ["B", "C", 8], ["B", "D", 9], ["B", "E", 7],
    ["C", "E", 5],
    ["D", "E", 15], ["D", "F", 6],
    ["E", "F", 8], ["E", "G", 9],
    ["F", "G", 11]
];


function minimalSpanningTree(nodes, edges) {
  var mst = [], nodeSet = {}
  for (let node of nodes) {
    nodeSet[node] = [node]
  }
  let sortedEdges = edges.sort((a,b) => a[2] - b[2])
  for (let edge of sortedEdges) {
    var n1 = edge[0], n2 = edge[1]
    var t1 = nodeSet[n1]    
    var t2 = nodeSet[n2]
    if (t1 != t2) {
      var t = t1.concat(t2)
      nodeSet[n1] = nodeSet[n2] = t
      mst.push(edge)
      if (mst.length == nodes.length-1) break
    }
  }
  return mst
}

console.log(minimalSpanningTree(nodes, edges))
