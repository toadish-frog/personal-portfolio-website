// 3D simplex noise, vendored instead of installed: the Aceternity vortex
// effect this powers pulls `createNoise3D` from the `simplex-noise` npm
// package, but this repo's constraint is no new third-party dependencies.
// Algorithm: Stefan Gustavson, "Simplex noise demystified" (2005) — the
// permutation-table + skewed-simplex-grid method is public domain and widely
// republished; this is a from-scratch implementation of that algorithm, not
// code copied from the npm package.

type Gradient3 = readonly [number, number, number]

const F3 = 1 / 3
const G3 = 1 / 6

const GRAD3: readonly Gradient3[] = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1],
]

function buildPermutationTable(random: () => number): Uint8Array {
  const table = new Uint8Array(256)
  for (let i = 0; i < 256; i++) table[i] = i
  // Fisher-Yates shuffle.
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[table[i], table[j]] = [table[j], table[i]]
  }
  return table
}

function dot(g: Gradient3, x: number, y: number, z: number): number {
  return g[0] * x + g[1] * y + g[2] * z
}

export function createNoise3D(random: () => number = Math.random) {
  const perm = buildPermutationTable(random)
  const p = new Uint8Array(512)
  const permMod12 = new Uint8Array(512)
  for (let i = 0; i < 512; i++) {
    p[i] = perm[i & 255]
    permMod12[i] = p[i] % 12
  }

  return function noise3D(xin: number, yin: number, zin: number): number {
    const s = (xin + yin + zin) * F3
    const i = Math.floor(xin + s)
    const j = Math.floor(yin + s)
    const k = Math.floor(zin + s)
    const t = (i + j + k) * G3
    const x0 = xin - (i - t)
    const y0 = yin - (j - t)
    const z0 = zin - (k - t)

    let i1: number, j1: number, k1: number
    let i2: number, j2: number, k2: number

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1
        j1 = 0
        k1 = 0
        i2 = 1
        j2 = 1
        k2 = 0
      } else if (x0 >= z0) {
        i1 = 1
        j1 = 0
        k1 = 0
        i2 = 1
        j2 = 0
        k2 = 1
      } else {
        i1 = 0
        j1 = 0
        k1 = 1
        i2 = 1
        j2 = 0
        k2 = 1
      }
    } else {
      if (y0 < z0) {
        i1 = 0
        j1 = 0
        k1 = 1
        i2 = 0
        j2 = 1
        k2 = 1
      } else if (x0 < z0) {
        i1 = 0
        j1 = 1
        k1 = 0
        i2 = 0
        j2 = 1
        k2 = 1
      } else {
        i1 = 0
        j1 = 1
        k1 = 0
        i2 = 1
        j2 = 1
        k2 = 0
      }
    }

    const x1 = x0 - i1 + G3
    const y1 = y0 - j1 + G3
    const z1 = z0 - k1 + G3
    const x2 = x0 - i2 + 2 * G3
    const y2 = y0 - j2 + 2 * G3
    const z2 = z0 - k2 + 2 * G3
    const x3 = x0 - 1 + 3 * G3
    const y3 = y0 - 1 + 3 * G3
    const z3 = z0 - 1 + 3 * G3

    const ii = i & 255
    const jj = j & 255
    const kk = k & 255

    let n0 = 0
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0
    if (t0 >= 0) {
      const gi0 = permMod12[ii + p[jj + p[kk]]]
      t0 *= t0
      n0 = t0 * t0 * dot(GRAD3[gi0], x0, y0, z0)
    }

    let n1 = 0
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
    if (t1 >= 0) {
      const gi1 = permMod12[ii + i1 + p[jj + j1 + p[kk + k1]]]
      t1 *= t1
      n1 = t1 * t1 * dot(GRAD3[gi1], x1, y1, z1)
    }

    let n2 = 0
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
    if (t2 >= 0) {
      const gi2 = permMod12[ii + i2 + p[jj + j2 + p[kk + k2]]]
      t2 *= t2
      n2 = t2 * t2 * dot(GRAD3[gi2], x2, y2, z2)
    }

    let n3 = 0
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
    if (t3 >= 0) {
      const gi3 = permMod12[ii + 1 + p[jj + 1 + p[kk + 1]]]
      t3 *= t3
      n3 = t3 * t3 * dot(GRAD3[gi3], x3, y3, z3)
    }

    return 32 * (n0 + n1 + n2 + n3)
  }
}
