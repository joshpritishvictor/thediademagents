// Generates the site's Lottie animations (bodymovin JSON) in the brand palette.
// Run with `npm run animations`; the output goes to public/animations/.
// Hand-built so the files are small, on-brand and free of licence questions.
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'
import { resolvePalette } from '../src/theme/palette.ts'

const outDir = path.resolve(import.meta.dirname, '..', 'public', 'animations')

// ---- Brand colours, from the shared palette (VITE_THEME_* overrides apply) ----

const colors = resolvePalette({
  ...loadEnv(
    process.env.NODE_ENV ?? 'production',
    process.cwd(),
    'VITE_THEME_',
  ),
  ...process.env,
})
const rgb = (hex: string) => {
  const h = hex.length === 4 ? hex.replace(/[0-9a-f]/gi, (c) => c + c) : hex
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
}
const C = {
  dark: rgb(colors.brand900),
  raised: rgb(colors.brand800),
  gold: rgb(colors.gold500),
  gold300: rgb(colors.gold300),
  gold600: rgb(colors.gold600),
  light: rgb(colors.onDark),
  ink: rgb(colors.ink),
}

// ---- Tiny Lottie builder ---------------------------------------------------

type Ease = { i: number[]; o: number[] }
/** [out-x, out-y, in-x, in-y] like a CSS cubic-bezier */
const bezier = (x1: number, y1: number, x2: number, y2: number): Ease => ({
  o: [x1, y1],
  i: [x2, y2],
})
const EASE = {
  out: bezier(0.16, 1, 0.3, 1), // ease-out-expo, same as the CSS
  overshoot: bezier(0.34, 1.56, 0.64, 1), // springy pop
  inOut: bezier(0.65, 0, 0.35, 1),
  linear: bezier(0, 0, 1, 1),
}

type Frame = { t: number; v: number[]; e?: Ease }

/** Static value */
/** Static value (a number, a vector, or a path) */
const val = (v: unknown) => ({ a: 0, k: v })

/** Keyframed value; every frame's `e` is the easing INTO the next frame */
function anim(frames: Frame[]) {
  const dims = frames[0].v.length
  const fill = (n: number) => Array.from({ length: dims }, () => n)
  return {
    a: 1,
    k: frames.map(({ t, v, e = EASE.out }, idx) =>
      idx === frames.length - 1
        ? { t, s: v }
        : {
            t,
            s: v,
            o: { x: fill(e.o[0]), y: fill(e.o[1]) },
            i: { x: fill(e.i[0]), y: fill(e.i[1]) },
          },
    ),
  }
}

/** Opacity keyframes from `[frame, value]` pairs */
const opacity = (pairs: [number, number][], e: Ease = EASE.out) =>
  anim(pairs.map(([t, o]) => ({ t, v: [o], e })))

type Shape = Record<string, unknown>

const transform = (
  over: Partial<Record<'p' | 'a' | 's' | 'r' | 'o', unknown>> = {},
): Shape => ({
  ty: 'tr',
  p: val([0, 0]),
  a: val([0, 0]),
  s: val([100, 100]),
  r: val(0),
  o: val(100),
  sk: val(0),
  sa: val(0),
  ...over,
})

const group = (
  name: string,
  items: Shape[],
  tr: Shape = transform(),
): Shape => ({
  ty: 'gr',
  nm: name,
  it: [...items, tr],
})

const ellipse = (cx: number, cy: number, w: number, h = w): Shape => ({
  ty: 'el',
  p: val([cx, cy]),
  s: val([w, h]),
})

const rect = (
  cx: number,
  cy: number,
  w: number,
  h: number,
  radius = 0,
): Shape => ({
  ty: 'rc',
  p: val([cx, cy]),
  s: val([w, h]),
  r: val(radius),
})

/** Straight-line path through `points` */
const polyline = (points: number[][], closed = false): Shape => ({
  ty: 'sh',
  ks: val({
    i: points.map(() => [0, 0]),
    o: points.map(() => [0, 0]),
    v: points,
    c: closed,
  }),
})

const fill = (color: unknown, o: unknown = val(100)): Shape => ({
  ty: 'fl',
  c: typeof color === 'object' && color && 'a' in color ? color : val(color),
  o,
  r: 1,
})

const stroke = (
  color: number[],
  width: number,
  o: unknown = val(100),
  dash?: { on: number; off: number; speed?: number; op?: number },
): Shape => ({
  ty: 'st',
  c: val(color),
  o,
  w: val(width),
  lc: 2, // round caps
  lj: 2, // round joins
  ml: 4,
  ...(dash && {
    d: [
      { n: 'd', nm: 'dash', v: val(dash.on) },
      { n: 'g', nm: 'gap', v: val(dash.off) },
      {
        n: 'o',
        nm: 'offset',
        v:
          dash.speed && dash.op
            ? anim([
                { t: 0, v: [0], e: EASE.linear },
                { t: dash.op, v: [-dash.speed * dash.op] },
              ])
            : val(0),
      },
    ],
  }),
})

/** Trim path: draws a stroke in from 0 to 100 % between two frames */
const trim = (from: number, to: number, e: Ease = EASE.inOut): Shape => ({
  ty: 'tm',
  s: val(0),
  e: anim([
    { t: from, v: [0], e },
    { t: to, v: [100] },
  ]),
  o: val(0),
  m: 1,
})

type LayerOpts = {
  name: string
  shapes: Shape[]
  p?: unknown
  s?: unknown
  o?: unknown
  r?: unknown
  a?: number[]
  ip?: number
  op?: number
}

function layer(index: number, op: number, l: LayerOpts) {
  return {
    ddd: 0,
    ind: index,
    ty: 4,
    nm: l.name,
    sr: 1,
    ks: {
      o: l.o ?? val(100),
      r: l.r ?? val(0),
      p: l.p ?? val([0, 0, 0]),
      a: val(l.a ?? [0, 0, 0]),
      s: l.s ?? val([100, 100, 100]),
    },
    ao: 0,
    shapes: l.shapes,
    ip: l.ip ?? 0,
    op: l.op ?? op,
    st: 0,
    bm: 0,
  }
}

function animation(
  name: string,
  w: number,
  h: number,
  op: number,
  layers: LayerOpts[],
) {
  return {
    v: '5.9.6',
    fr: 60,
    ip: 0,
    op,
    w,
    h,
    nm: name,
    ddd: 0,
    assets: [],
    // Lottie draws the last layer first, so the first in the list is on top
    layers: layers.map((l, i) => layer(i + 1, op, l)),
    markers: [],
  }
}

/** Fade the whole scene out over the last frames so the loop restarts cleanly */
const loopFade = (op: number, from: number, extra: [number, number][] = []) =>
  opacity([...extra, [from, 100], [op, 0]])

const centre = (w: number, h: number) => val([w / 2, h / 2, 0])

// ---- 1. One table: four professions converge around the Diadem crown -------
// Hero illustration on a dark background. 30 s loop with a 2 s intro.

function oneTable() {
  const W = 400
  const OP = 1800
  const R_SEATS = 140
  const layers: LayerOpts[] = []

  // The centre of the table is left clear: the site overlays the real logo mark there (see Hero.tsx)

  // Pulse rings radiating from the table every 1.5 s
  for (const delay of [0, 45]) {
    const frames: Frame[] = []
    const ofr: [number, number][] = []
    for (let t = 130 + delay; t + 90 <= OP; t += 90) {
      frames.push({ t, v: [100, 100, 100], e: EASE.out })
      frames.push({ t: t + 89, v: [150, 150, 100], e: EASE.linear })
      ofr.push([t, 50], [t + 89, 0])
    }
    layers.push({
      name: `pulse-${delay}`,
      p: centre(W, W),
      s: anim(frames),
      o: opacity([[0, 0], [129 + delay, 0], ...ofr, [OP, 0]], EASE.linear),
      shapes: [group('ring', [ellipse(0, 0, 190), stroke(C.gold, 2)])],
    })
  }

  // The table
  layers.push({
    name: 'table',
    p: centre(W, W),
    o: loopFade(OP, OP - 40),
    s: anim([
      { t: 0, v: [0, 0, 100], e: EASE.overshoot },
      { t: 50, v: [100, 100, 100] },
    ]),
    shapes: [
      group('top', [ellipse(0, 0, 190), fill(C.raised), stroke(C.gold, 3)]),
      group('inner', [ellipse(0, 0, 150), stroke(C.gold, 1, val(35))]),
    ],
  })

  // Four seats fly in from outside the frame
  const seatAngles = [-90, 0, 90, 180]
  seatAngles.forEach((deg, i) => {
    const rad = (deg * Math.PI) / 180
    const at = (r: number) => [
      W / 2 + Math.cos(rad) * r,
      W / 2 + Math.sin(rad) * r,
      0,
    ]
    const start = 20 + i * 9
    layers.push({
      name: `seat-${i}`,
      p: anim([
        { t: start, v: at(R_SEATS + 150), e: EASE.out },
        { t: start + 55, v: at(R_SEATS) },
      ]),
      o: loopFade(OP, OP - 40, [
        [start, 0],
        [start + 14, 100],
      ]),
      r: val(deg + 90),
      shapes: [
        group('chair', [
          rect(0, 0, 46, 46, 15),
          fill(C.raised),
          stroke(C.gold, 2),
        ]),
        group('person-body', [rect(0, 7, 24, 14, 7), fill(C.light)]),
        group('person-head', [ellipse(0, -7, 15), fill(C.light)]),
      ],
    })
  })

  // Dashed orbit linking the seats: draws in, then its dashes keep circulating
  layers.push({
    name: 'orbit',
    p: centre(W, W),
    o: loopFade(OP, OP - 40, [
      [70, 0],
      [90, 100],
    ]),
    shapes: [
      group('orbit', [
        ellipse(0, 0, R_SEATS * 2),
        trim(70, 140),
        stroke(C.gold300, 2, val(70), { on: 6, off: 9, speed: 0.4, op: OP }),
      ]),
    ],
  })

  // Faint outer ring for depth
  layers.push({
    name: 'outer',
    p: centre(W, W),
    o: loopFade(OP, OP - 40, [
      [0, 0],
      [60, 100],
    ]),
    shapes: [group('outer', [ellipse(0, 0, 372), stroke(C.gold, 1, val(18))])],
  })

  return animation('Four professions, one table', W, W, OP, layers)
}

// ---- 2. D.I.S.C. flow: a pulse travels the pipeline, lighting each stage ----
// Light background. 4 s loop.

function discFlow() {
  const W = 800
  const H = 160
  const OP = 270
  const Y = H / 2
  const xs = [80, 293, 507, 720]
  const STEP = 55
  const layers: LayerOpts[] = []

  // Travelling pulse
  layers.push({
    name: 'pulse',
    p: anim([
      { t: 0, v: [xs[0], Y, 0], e: EASE.linear },
      { t: STEP * 3, v: [xs[3], Y, 0] },
    ]),
    o: opacity([
      [0, 0],
      [10, 100],
      [STEP * 3 - 5, 100],
      [STEP * 3 + 10, 0],
    ]),
    shapes: [
      group('glow', [ellipse(0, 0, 40), fill(C.gold, val(25))]),
      group('dot', [ellipse(0, 0, 18), fill(C.gold300)]),
    ],
  })

  // Stage nodes light up as the pulse arrives
  xs.forEach((x, i) => {
    const hit = STEP * i
    layers.push({
      name: `node-${i}`,
      p: val([x, Y, 0]),
      o: loopFade(OP, OP - 25),
      s: anim([
        { t: hit, v: [100, 100, 100], e: EASE.overshoot },
        { t: hit + 20, v: [128, 128, 100], e: EASE.out },
        { t: hit + 45, v: [112, 112, 100] },
      ]),
      shapes: [
        group('halo', [
          ellipse(0, 0, 72),
          fill(
            C.gold,
            opacity([
              [hit, 0],
              [hit + 15, 25],
            ]),
          ),
        ]),
        group('core', [
          ellipse(0, 0, 44),
          fill(
            anim([
              { t: hit, v: [...C.dark, 1], e: EASE.out },
              { t: hit + 15, v: [...C.gold, 1] },
            ]),
          ),
          stroke(C.gold, 3),
        ]),
        group('tick', [
          polyline([
            [-9, 0],
            [-3, 6],
            [10, -7],
          ]),
          trim(hit + 8, hit + 30),
          stroke(C.dark, 3.5),
        ]),
      ],
    })
  })

  // Line between the stages: gold draws in behind the pulse
  layers.push({
    name: 'line-active',
    o: loopFade(OP, OP - 25),
    shapes: [
      group('line', [
        polyline([
          [xs[0], Y],
          [xs[3], Y],
        ]),
        trim(0, STEP * 3, EASE.linear),
        stroke(C.gold, 4),
      ]),
    ],
  })
  layers.push({
    name: 'line-base',
    o: loopFade(OP, OP - 25),
    shapes: [
      group('line', [
        polyline([
          [xs[0], Y],
          [xs[3], Y],
        ]),
        stroke(C.ink, 3, val(14)),
      ]),
    ],
  })

  return animation('D.I.S.C. flow', W, H, OP, layers)
}

// ---- 3. Objection answered: the "let me ask my accountant" bubble resolves --
// Dark background. 5 s loop.

function objectionCheck() {
  const W = 400
  const OP = 300
  const layers: LayerOpts[] = []

  // Burst of gold sparks when the check lands
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const from = 60
    const to = 150
    layers.push({
      name: `spark-${i}`,
      p: anim([
        {
          t: 165,
          v: [W / 2 + Math.cos(a) * from, W / 2 - 20 + Math.sin(a) * from, 0],
          e: EASE.out,
        },
        {
          t: 215,
          v: [W / 2 + Math.cos(a) * to, W / 2 - 20 + Math.sin(a) * to, 0],
        },
      ]),
      o: opacity([
        [160, 0],
        [170, 100],
        [215, 0],
      ]),
      s: anim([
        { t: 165, v: [100, 100, 100], e: EASE.out },
        { t: 215, v: [20, 20, 100] },
      ]),
      shapes: [
        group('spark', [ellipse(0, 0, 10), fill(i % 2 ? C.gold : C.gold300)]),
      ],
    })
  }

  // Checkmark draws in once the dots give way
  layers.push({
    name: 'check',
    p: val([W / 2, W / 2 - 20, 0]),
    o: loopFade(OP, OP - 30, [
      [128, 0],
      [132, 100],
    ]),
    shapes: [
      group('check', [
        polyline([
          [-52, -8],
          [-14, 28],
          [56, -38],
        ]),
        trim(132, 170, EASE.out),
        stroke(C.gold, 14),
      ]),
    ],
  })

  // Typing dots: the client "thinking about it"
  for (let i = 0; i < 3; i++) {
    const x = W / 2 - 42 + i * 42
    const blink: [number, number][] = []
    for (let t = 34 + i * 8; t < 118; t += 36) {
      blink.push([t, 35], [t + 18, 100])
    }
    layers.push({
      name: `dot-${i}`,
      p: val([x, W / 2 - 20, 0]),
      o: opacity([
        [0, 0],
        [30 + i * 6, 0],
        [36 + i * 6, 100],
        ...blink,
        [120, 100],
        [130, 0],
      ]),
      shapes: [group('dot', [ellipse(0, 0, 20), fill(C.dark, val(45))])],
    })
  }

  // Speech bubble pops in
  layers.push({
    name: 'bubble',
    p: val([W / 2, W / 2 - 20, 0]),
    o: loopFade(OP, OP - 30, [
      [0, 0],
      [6, 100],
    ]),
    s: anim([
      { t: 0, v: [0, 0, 100], e: EASE.overshoot },
      { t: 40, v: [100, 100, 100] },
    ]),
    shapes: [
      group('bubble', [
        rect(0, 0, 250, 160, 34),
        polyline(
          [
            [-70, 70],
            [-98, 112],
            [-30, 78],
          ],
          true,
        ),
        fill(C.light),
      ]),
    ],
  })

  // Soft glow behind everything
  layers.push({
    name: 'glow',
    p: val([W / 2, W / 2 - 20, 0]),
    o: loopFade(OP, OP - 30, [
      [0, 0],
      [40, 100],
    ]),
    shapes: [group('glow', [ellipse(0, 0, 330, 260), fill(C.gold, val(10))])],
  })

  return animation('Objection answered', W, W, OP, layers)
}

// ---- 4. Growth: a pipeline that keeps building -----------------------------
// Dark background. 6 s loop.

function growth() {
  const W = 400
  const OP = 360
  const BASE = 300 // y of the axis
  const xs = [80, 140, 200, 260, 320]
  const heights = [70, 110, 95, 150, 200]
  const layers: LayerOpts[] = []

  // Points on the trend line
  xs.forEach((x, i) => {
    const at = 120 + i * 14
    layers.push({
      name: `point-${i}`,
      p: val([x, BASE - heights[i] - 22, 0]),
      o: loopFade(OP, OP - 30, [
        [at, 0],
        [at + 4, 100],
      ]),
      s: anim([
        { t: at, v: [0, 0, 100], e: EASE.overshoot },
        { t: at + 30, v: [100, 100, 100] },
      ]),
      shapes: [
        group('dot', [ellipse(0, 0, 16), fill(C.dark), stroke(C.gold, 4)]),
      ],
    })
  })

  // Trend line draws across the bar tops
  layers.push({
    name: 'trend',
    o: loopFade(OP, OP - 30),
    shapes: [
      group('trend', [
        polyline(xs.map((x, i) => [x, BASE - heights[i] - 22])),
        trim(110, 190, EASE.inOut),
        stroke(C.gold, 4),
      ]),
    ],
  })

  // Bars grow from the axis
  xs.forEach((x, i) => {
    const start = 20 + i * 14
    const h = heights[i]
    layers.push({
      name: `bar-${i}`,
      o: loopFade(OP, OP - 30),
      shapes: [
        group(
          'bar',
          [
            rect(0, -h / 2, 36, h, 10),
            fill(
              i === xs.length - 1 ? C.gold : C.gold300,
              val(i === xs.length - 1 ? 90 : 30),
            ),
          ],
          transform({
            p: val([x, BASE]),
            s: anim([
              { t: start, v: [100, 0], e: EASE.out },
              { t: start + 50, v: [100, 100] },
            ]),
          }),
        ),
      ],
    })
  })

  // Axis
  layers.push({
    name: 'axis',
    o: loopFade(OP, OP - 30),
    shapes: [
      group('axis', [
        polyline([
          [50, 60],
          [50, BASE],
          [350, BASE],
        ]),
        trim(0, 40, EASE.out),
        stroke(C.light, 2, val(30)),
      ]),
    ],
  })

  return animation('Growth', W, W, OP, layers)
}

// ---- Write -----------------------------------------------------------------

mkdirSync(outDir, { recursive: true })
const files = {
  'one-table.json': oneTable(),
  'disc-flow.json': discFlow(),
  'objection-check.json': objectionCheck(),
  'growth.json': growth(),
}
for (const [name, data] of Object.entries(files)) {
  const json = JSON.stringify(data)
  writeFileSync(path.join(outDir, name), json)
  console.log(`  ${name}  ${(json.length / 1024).toFixed(1)} kB`)
}
