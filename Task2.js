class UnionFind {
  constructor(n) {
    this.parent = Array(n)
      .fill(null)
      .map((_, index) => index);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

function kruskal(n, edges) {
  edges.sort((a, b) => a.weight - b.weight);

  const uf = new UnionFind(n);
  const mst = [];

  for (const edge of edges) {
    const { u, v, weight } = edge;

    if (uf.find(u) !== uf.find(v)) {
      mst.push(edge);

      uf.union(u, v);
    }
  }

  return mst;
}

const n = 4; // Number of vertices (0, 1, 2, 3)
const edges = [
  { u: 0, v: 1, weight: 10 },
  { u: 0, v: 2, weight: 6 },
  { u: 0, v: 3, weight: 5 },
  { u: 1, v: 3, weight: 15 },
  { u: 2, v: 3, weight: 4 },
];

// Example
const mst = kruskal(n, edges);

console.log("Edges in the Minimum Spanning Tree (MST):");
mst.forEach((edge) =>
  console.log(`(${edge.u}, ${edge.v}) with weight ${edge.weight}`)
);
