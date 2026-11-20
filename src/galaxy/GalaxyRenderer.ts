/**
 * Canvas 2D galaxy background: starfield, nebulae, rotating black hole (hero),
 * face-on spiral galaxy (contact), cosmic dust and shooting stars.
 *
 * Ported 1:1 from the original design export. Sections opt in with
 * `data-galaxy="<intensity 0..1>"` and `data-gx="<name>"` attributes.
 */

type Star = { x: number; y: number; z: number; r: number; c: string; tw: boolean; ph: number; sp: number };
type Dust = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: string };
type GalStar = { r: number; a: number; dx: number; dy: number; s: number; c: string; f: number };
type DiskP = { r: number; a: number; w: number; h: number; b: number; ci: number };
type RingP = { p: number; a: number; w: number; b: number; ci: number };
type Shot = { x: number; y: number; vx: number; vy: number; life: number; max: number };
type Sec = { c: number; v: number };

export type GalaxyOptions = { intensity: number; animate: boolean };

const TAU = 6.2832;

export class GalaxyRenderer {
  private ctx: CanvasRenderingContext2D;
  private dead = false;
  private raf = 0;
  private reduce: boolean;
  private mx = 0; private my = 0; private tmx = 0; private tmy = 0;
  private W = 1; private H = 1; private tall = false;
  private stars: Star[] = [];
  private dust: Dust[] = [];
  private gal: GalStar[] = [];
  private sections: HTMLElement[] = [];
  private shots: Shot[] = [];
  private nextShot = 2.5;
  private time = 0;
  private lastNow = performance.now();
  // black hole
  private bhCols = ['255,243,224', '242,184,96', '224,118,58', '140,66,34'];
  private bhLv = 7;
  private disk: DiskP[] | null = null;
  private ring: RingP[] = [];
  private bk: number[][] = [];

  constructor(
    private cv: HTMLCanvasElement,
    private root: HTMLElement,
    public opts: GalaxyOptions,
  ) {
    const ctx = cv.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D not supported');
    this.ctx = ctx;
    this.reduce = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('pointermove', this.onMove, { passive: true });
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.buildGalaxy();
    this.resize();
    const loop = (now: number) => {
      if (this.dead) return;
      if (!document.hidden) this.frame(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  /** Re-scan sections (call after layout changes). */
  refreshSections() {
    this.sections = Array.from(this.root.querySelectorAll<HTMLElement>('[data-galaxy]'));
  }

  private get animating() {
    return !this.reduce && this.opts.animate;
  }

  private onMove = (e: PointerEvent) => {
    this.tmx = e.clientX / Math.max(1, window.innerWidth) - 0.5;
    this.tmy = e.clientY / Math.max(1, window.innerHeight) - 0.5;
  };
  private onResize = () => this.resize();
  private onScroll = () => {
    if (!this.animating) requestAnimationFrame((t) => this.frame(t));
  };

  private resize() {
    const cv = this.cv;
    const W = Math.max(1, window.innerWidth), H = Math.max(1, window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scale = Math.min(dpr, Math.sqrt(2600000 / (W * H)));
    cv.width = Math.round(W * scale); cv.height = Math.round(H * scale);
    this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    this.W = W; this.H = H;
    this.tall = H > W * 1.9 || H > 2200;
    const count = Math.min(this.tall ? 5200 : 1900, Math.floor((W * H) / 620));
    const pal = ['255,255,255', '255,255,255', '255,255,255', '255,244,224', '246,214,170', '232,150,90', '205,218,232', '205,218,232'];
    this.stars = [];
    for (let i = 0; i < count; i++) {
      const z = Math.pow(Math.random(), 1.8) * 0.85 + 0.15;
      this.stars.push({ x: Math.random() * W, y: Math.random() * H, z, r: 0.35 + Math.random() * 0.9, c: pal[(Math.random() * pal.length) | 0], tw: Math.random() < 0.14, ph: Math.random() * TAU, sp: 0.6 + Math.random() * 2.2 });
    }
    this.dust = [];
    const dc = this.tall ? 220 : 70;
    for (let i = 0; i < dc; i++) {
      this.dust.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 6, vy: -2 - Math.random() * 5, r: 0.8 + Math.random() * 2.2, a: 0.08 + Math.random() * 0.18, c: Math.random() < 0.5 ? '242,184,96' : '224,118,58' });
    }
    this.refreshSections();
    if (!this.animating) requestAnimationFrame((t) => this.frame(t));
  }

  private buildGalaxy() {
    const N = 2600, arms = 2;
    this.gal = [];
    const g = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    for (let i = 0; i < N; i++) {
      const r = Math.pow(Math.random(), 1.35);
      const arm = i % arms;
      const spread = 0.05 + 0.16 * r;
      let col: string;
      if (r < 0.12) col = '255,246,222';
      else if (r < 0.4) col = Math.random() < 0.7 ? '255,214,90' : '255,244,214';
      else col = Math.random() < 0.55 ? '255,150,30' : Math.random() < 0.6 ? '242,184,96' : '255,255,255';
      this.gal.push({ r, a: arm * Math.PI + r * 5.2 + g() * 0.35, dx: g() * spread, dy: g() * spread, s: 0.5 + Math.random() * (r < 0.2 ? 1.6 : 1.1), c: col, f: Math.random() * TAU });
    }
  }

  /* ---------- Black hole: shadow, photon ring, lensed halo, Keplerian accretion disk ---------- */
  private buildBlackHole() {
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const disk: DiskP[] = [];
    for (let i = 0; i < 5200; i++) {
      const r = 1.55 + Math.pow(Math.random(), 1.7) * 2.5;
      const ci = r < 1.95 ? 0 : r < 2.5 ? (Math.random() < 0.6 ? 1 : 0) : r < 3.3 ? (Math.random() < 0.7 ? 2 : 1) : Math.random() < 0.6 ? 3 : 2;
      let b = Math.max(0.18, Math.min(1, 1.2 - (r - 1.55) / 2.4));
      if (Math.random() < 0.16) b *= 0.35; // dusty lanes
      disk.push({ r, a: Math.random() * TAU, w: 0.62 * Math.pow(1.55 / r, 1.5), h: gauss() * 0.045 * r, b, ci });
    }
    this.disk = disk;
    this.ring = [];
    for (let i = 0; i < 2600; i++) {
      const p = 1.06 + Math.pow(Math.random(), 2.2) * 0.8;
      this.ring.push({ p, a: Math.random() * TAU, w: 0.62 * Math.pow(1.55 / (1.55 + (p - 1.06) * 3), 1.5), b: Math.max(0.15, 1 - (p - 1.06) / 0.9), ci: p < 1.3 ? 0 : Math.random() < 0.6 ? 1 : 0 });
    }
    const nb = 2 * this.bhCols.length * this.bhLv;
    this.bk = [];
    for (let i = 0; i < nb; i++) this.bk.push([]);
  }

  private strokeBuckets(ctx: CanvasRenderingContext2D, layer: number, lw: number) {
    const C = this.bhCols.length, L = this.bhLv;
    for (let ci = 0; ci < C; ci++) {
      for (let li = 0; li < L; li++) {
        const arr = this.bk[layer * C * L + ci * L + li];
        if (!arr.length) continue;
        ctx.globalAlpha = (li + 1) / L;
        ctx.strokeStyle = 'rgb(' + this.bhCols[ci] + ')';
        ctx.lineWidth = lw;
        ctx.beginPath();
        for (let j = 0; j < arr.length; j += 4) { ctx.moveTo(arr[j], arr[j + 1]); ctx.lineTo(arr[j + 2], arr[j + 3]); }
        ctx.stroke();
        arr.length = 0;
      }
    }
    ctx.globalAlpha = 1;
  }

  private drawBlackHole(ctx: CanvasRenderingContext2D, cx: number, cy: number, rh: number, rot: number, tilt: number, A: number, t: number) {
    if (!this.disk) this.buildBlackHole();
    const ext = rh * 5;
    if (cy + ext < -60 || cy - ext > this.H + 60 || A <= 0.01) return;
    const cr = Math.cos(rot), sr = Math.sin(rot);
    const C = this.bhCols.length, L = this.bhLv;
    const X = (u: number, v: number) => cx + u * cr - v * sr;
    const Y = (u: number, v: number) => cy + u * sr + v * cr;
    ctx.lineCap = 'round';

    // 1. Ambient warm halo
    const halo = ctx.createRadialGradient(cx, cy, rh, cx, cy, rh * 5.2);
    halo.addColorStop(0, 'rgba(255,226,180,' + 0.2 * A + ')');
    halo.addColorStop(0.35, 'rgba(224,118,58,' + 0.07 * A + ')');
    halo.addColorStop(1, 'rgba(224,118,58,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(cx - rh * 5.2, cy - rh * 5.2, rh * 10.4, rh * 10.4);

    // Disk glow (half = -1 back / +1 front)
    const diskGlow = (half: number) => {
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(rot);
      ctx.beginPath(); ctx.rect(-rh * 5, half < 0 ? -rh * 5 : 0, rh * 10, rh * 5); ctx.clip();
      ctx.scale(1, tilt);
      const g = ctx.createRadialGradient(0, 0, rh * 1.35, 0, 0, rh * 4.2);
      g.addColorStop(0, 'rgba(255,240,215,' + 0.55 * A + ')');
      g.addColorStop(0.18, 'rgba(242,184,96,' + 0.32 * A + ')');
      g.addColorStop(0.55, 'rgba(224,118,58,' + 0.12 * A + ')');
      g.addColorStop(1, 'rgba(140,66,34,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, rh * 4.2, 0, TAU); ctx.fill();
      ctx.restore();
    };
    diskGlow(-1);

    // 2. Lensed halo (far side of disk bent over and under the shadow)
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(rot);
    const rings: [number, number, number][] = [[1.1, 0.035, 0.55], [1.22, 0.09, 0.26], [1.42, 0.17, 0.12], [1.7, 0.28, 0.05]];
    for (const q of rings) {
      ctx.lineWidth = rh * q[1];
      ctx.strokeStyle = 'rgba(255,236,205,' + q[2] * A + ')';
      ctx.beginPath(); ctx.arc(0, 0, rh * q[0], Math.PI, 2 * Math.PI); ctx.stroke();
      ctx.strokeStyle = 'rgba(242,184,96,' + q[2] * 0.55 * A + ')';
      ctx.beginPath(); ctx.arc(0, 0, rh * q[0] * 0.97, 0, Math.PI); ctx.stroke();
    }
    ctx.restore();

    // 3. Particles: ring (lensed) + disk; Keplerian speed, Doppler-beamed brightness
    for (const p of this.ring) {
      const a = p.a + p.w * t;
      const s = Math.sin(a), c = Math.cos(a);
      const da = Math.min(0.16, p.w * 0.28 + 0.03);
      const u = p.p * c * rh, v = p.p * s * 0.97 * rh;
      const u2 = p.p * Math.cos(a - da) * rh, v2 = p.p * Math.sin(a - da) * 0.97 * rh;
      const al = p.b * (s < 0 ? 1 : 0.5) * (1 + 0.35 * c) * A * 0.8;
      if (al < 0.04) continue;
      const li = Math.max(0, Math.min(L - 1, Math.floor(al * L)));
      this.bk[p.ci * L + li].push(X(u, v), Y(u, v), X(u2, v2), Y(u2, v2));
    }
    for (const p of this.disk!) {
      const a = p.a + p.w * t;
      const s = Math.sin(a), c = Math.cos(a);
      const da = Math.min(0.14, p.w * 0.24 + 0.02);
      const u = p.r * c * rh, v = (p.r * s * tilt + p.h * tilt * 2.2) * rh;
      const u2 = p.r * Math.cos(a - da) * rh, v2 = (p.r * Math.sin(a - da) * tilt + p.h * tilt * 2.2) * rh;
      const front = s > 0 ? 1 : 0;
      const al = p.b * (1 + 0.55 * c) * A * (front ? 1 : 0.8) * 0.75;
      if (al < 0.04) continue;
      const li = Math.max(0, Math.min(L - 1, Math.floor(al * L)));
      this.bk[front * C * L + p.ci * L + li].push(X(u, v), Y(u, v), X(u2, v2), Y(u2, v2));
    }
    this.strokeBuckets(ctx, 0, Math.max(0.8, rh / 95));

    // 4. Event horizon shadow
    ctx.globalCompositeOperation = 'source-over';
    const sh = ctx.createRadialGradient(cx, cy, rh * 0.9, cx, cy, rh * 1.06);
    sh.addColorStop(0, 'rgba(2,2,2,1)');
    sh.addColorStop(0.75, 'rgba(2,2,2,1)');
    sh.addColorStop(1, 'rgba(2,2,2,0)');
    ctx.fillStyle = sh;
    ctx.beginPath(); ctx.arc(cx, cy, rh * 1.06, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'lighter';

    // 5. Photon ring
    ctx.lineWidth = Math.max(1, rh * 0.014);
    ctx.strokeStyle = 'rgba(255,246,230,' + 0.95 * A + ')';
    ctx.beginPath(); ctx.arc(cx, cy, rh * 1.02, 0, TAU); ctx.stroke();
    ctx.lineWidth = rh * 0.06;
    ctx.strokeStyle = 'rgba(255,226,180,' + 0.16 * A + ')';
    ctx.beginPath(); ctx.arc(cx, cy, rh * 1.03, 0, TAU); ctx.stroke();

    // 6. Near side of the disk crosses in front of the shadow
    diskGlow(1);
    this.strokeBuckets(ctx, 1, Math.max(0.9, rh / 85));
  }

  private drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, k: number) {
    if (y + r < 0 || y - r > this.H) return;
    ctx.globalCompositeOperation = 'source-over';
    const g = ctx.createRadialGradient(x - r * 0.45, y + r * 0.35, r * 0.1, x, y, r * 1.05);
    g.addColorStop(0, 'rgba(214,222,230,' + 0.85 * Math.min(1, k) + ')');
    g.addColorStop(0.55, 'rgba(110,122,134,' + 0.75 * Math.min(1, k) + ')');
    g.addColorStop(1, 'rgba(14,16,18,0.9)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'lighter';
    const rim = ctx.createRadialGradient(x, y, r, x, y, r * 2.2);
    rim.addColorStop(0, 'rgba(159,179,196,' + 0.12 * k + ')');
    rim.addColorStop(1, 'rgba(159,179,196,0)');
    ctx.fillStyle = rim;
    ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, TAU); ctx.fill();
  }

  private intensityAt(y: number, secs: Sec[]) {
    if (!secs.length) return 1;
    if (y <= secs[0].c) return secs[0].v;
    const last = secs[secs.length - 1];
    if (y >= last.c) return last.v;
    for (let i = 0; i < secs.length - 1; i++) {
      const a = secs[i], b = secs[i + 1];
      if (y >= a.c && y < b.c) {
        let t = (y - a.c) / Math.max(1, b.c - a.c);
        t = t * t * (3 - 2 * t);
        return a.v + (b.v - a.v) * t;
      }
    }
    return 1;
  }

  private drawGalaxy(ctx: CanvasRenderingContext2D, cx: number, cy: number, R: number, tilt: number, rot: number, alpha: number, t: number, dir: number) {
    if (cy + R < -80 || cy - R > this.H + 80 || alpha <= 0.01) return;
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25);
    halo.addColorStop(0, 'rgba(236,160,96,' + 0.16 * alpha + ')');
    halo.addColorStop(0.45, 'rgba(224,118,58,' + 0.05 * alpha + ')');
    halo.addColorStop(1, 'rgba(224,118,58,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(cx - R * 1.3, cy - R * 1.3, R * 2.6, R * 2.6);
    const cr = Math.cos(rot), sr = Math.sin(rot);
    for (const p of this.gal) {
      const th = p.a + (dir * t * 0.045) / (0.28 + p.r);
      const lx = (Math.cos(th) * p.r + p.dx) * R;
      const ly = (Math.sin(th) * p.r + p.dy) * R * tilt;
      const x = cx + lx * cr - ly * sr;
      const y = cy + lx * sr + ly * cr;
      const fl = 0.75 + 0.25 * Math.sin(t * 1.3 + p.f);
      ctx.globalAlpha = Math.min(1, (0.25 + 0.75 * (1 - p.r)) * alpha * fl);
      ctx.fillStyle = 'rgb(' + p.c + ')';
      ctx.fillRect(x, y, p.s, p.s);
    }
    ctx.globalAlpha = 1;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.32);
    core.addColorStop(0, 'rgba(255,248,225,' + 0.55 * alpha + ')');
    core.addColorStop(0.25, 'rgba(242,184,96,' + 0.22 * alpha + ')');
    core.addColorStop(1, 'rgba(224,118,58,0)');
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.34, R * 0.34 * Math.max(tilt, 0.5), rot, 0, TAU); ctx.fill();
  }

  private blob(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, a: number) {
    if (y + r < 0 || y - r > this.H || a <= 0.003) return;
    const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(' + col + ',' + a + ')');
    gr.addColorStop(0.5, 'rgba(' + col + ',' + a * 0.35 + ')');
    gr.addColorStop(1, 'rgba(' + col + ',0)');
    ctx.fillStyle = gr;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  private frame(now: number) {
    const ctx = this.ctx;
    if (!this.stars.length) return;
    const animate = this.animating;
    const dt = Math.min(0.05, Math.max(0, (now - this.lastNow) / 1000));
    this.lastNow = now;
    if (animate) this.time += dt;
    const t = this.time;
    const W = this.W, H = this.H;
    const k = this.opts.intensity;
    this.mx += (this.tmx - this.mx) * 0.05;
    this.my += (this.tmy - this.my) * 0.05;
    const mx = this.mx, my = this.my;
    const sc = window.scrollY || document.documentElement.scrollTop || 0;

    const secs: Sec[] = [];
    const byKind: Record<string, DOMRect> = {};
    for (const el of this.sections) {
      const rc = el.getBoundingClientRect();
      const v = parseFloat(el.getAttribute('data-galaxy') || '') || 0.3;
      const kind = el.getAttribute('data-gx') || '';
      secs.push({ c: rc.top + rc.height / 2, v });
      byKind[kind] = rc;
    }
    secs.sort((a, b) => a.c - b.c);

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // Nebula clouds anchored to sections (drift slower than content = depth)
    const neb: [string, number, number, number, string, number][] = [
      ['hero', 0.7, 0.46, 0.5, '224,118,58', 0.09], ['hero', 0.55, 0.2, 0.32, '242,184,96', 0.04], ['hero', 0.95, 0.85, 0.4, '140,66,34', 0.09], ['hero', 0.98, 0.1, 0.42, '110,135,160', 0.05], ['hero', 0.15, 0.95, 0.35, '110,135,160', 0.03],
      ['about', 0.88, 0.35, 0.32, '232,150,90', 0.035],
      ['experience', 0.05, 0.5, 0.3, '224,118,58', 0.025],
      ['projects', 0.1, 0.12, 0.4, '224,118,58', 0.07], ['projects', 0.92, 0.45, 0.45, '242,184,96', 0.045], ['projects', 0.2, 0.8, 0.42, '200,90,0', 0.06],
      ['skills', 0.85, 0.5, 0.3, '232,150,90', 0.03],
      ['contact', 0.5, 0.48, 0.6, '224,118,58', 0.13], ['contact', 0.3, 0.3, 0.3, '242,184,96', 0.05],
    ];
    for (let i = 0; i < neb.length; i++) {
      const n = neb[i], rc = byKind[n[0]];
      if (!rc) continue;
      const drift = Math.sin(t * 0.07 + i) * 30;
      const x = rc.left + rc.width * n[1] + drift - mx * 40;
      const y = rc.top * 0.82 + rc.height * n[2] + Math.cos(t * 0.05 + i) * 20 - my * 30;
      const r = Math.max(240, Math.min(rc.width, 1600) * n[3]);
      this.blob(ctx, x, y, r, n[4], n[5] * k);
    }

    // Starfield: 3 depths, scroll + cursor parallax, intensity by section
    for (const s of this.stars) {
      let y = s.y - (this.tall ? 0 : sc * 0.22 * s.z);
      y = (((y % H) + H) % H) + my * 26 * s.z;
      const x = s.x + mx * 34 * s.z;
      const I = this.intensityAt(y, secs);
      let a = (0.22 + 0.78 * s.z) * (0.32 + 0.68 * I);
      if (s.tw) a *= 0.45 + 0.55 * Math.abs(Math.sin(t * s.sp + s.ph));
      ctx.globalAlpha = Math.min(1, a * Math.min(1.3, 0.6 + 0.4 * k));
      ctx.fillStyle = 'rgb(' + s.c + ')';
      const sz = s.r * (0.6 + s.z * 1.1);
      ctx.fillRect(x, y, sz, sz);
    }
    ctx.globalAlpha = 1;

    // Rotating black hole anchored to hero; face-on galaxy behind contact
    const narrow = W < 860;
    const h = byKind.hero;
    if (h) {
      const rh = narrow ? Math.min(W * 0.3, 130) : Math.min(h.width * 0.19, h.height * 0.29, 300);
      const cx = h.left + h.width * (narrow ? 0.55 : 0.64) - mx * 26;
      const cy = h.top * 0.55 + h.height * (narrow ? 0.34 : 0.5) - my * 18;
      this.drawBlackHole(ctx, cx, cy, rh, 0.4 + mx * 0.04, 0.2 + my * 0.03, (narrow ? 0.55 : 0.9) * k, t);
      if (!narrow) this.drawMoon(ctx, h.left + h.width * 0.93 - mx * 50, h.top * 0.5 + h.height * 0.15 - my * 36, 22, k);
    }
    const c = byKind.contact;
    if (c) {
      const R = Math.min(c.width * 0.34, 420);
      this.drawGalaxy(ctx, c.left + c.width * 0.5 - mx * 20, c.top * 0.85 + c.height * 0.5 - my * 16, R, 0.78, 0.3, 0.62 * k, t * 0.7, -1);
    }

    // Cosmic dust
    for (const d of this.dust) {
      if (animate) {
        d.x += d.vx * dt; d.y += d.vy * dt;
        if (d.y < -10) d.y = H + 10;
        if (d.x < -10) d.x = W + 10;
        if (d.x > W + 10) d.x = -10;
      }
      const I = this.intensityAt(d.y, secs);
      ctx.globalAlpha = d.a * (0.4 + 0.6 * I) * k;
      ctx.fillStyle = 'rgb(' + d.c + ')';
      ctx.beginPath(); ctx.arc(d.x + mx * 50, d.y + my * 40, d.r, 0, TAU); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Shooting stars (rare, only where the sky is bright enough)
    if (animate) {
      if (t > this.nextShot) {
        const sy = Math.random() * H * (this.tall ? 1 : 0.6);
        if (this.intensityAt(sy, secs) > 0.3) {
          const ang = 0.32 + Math.random() * 0.3;
          this.shots.push({ x: W * (0.25 + Math.random() * 0.75), y: sy, vx: -Math.cos(ang) * 950, vy: Math.sin(ang) * 950, life: 0, max: 0.8 + Math.random() * 0.5 });
        }
        this.nextShot = t + 4 + Math.random() * 6;
      }
      for (let i = this.shots.length - 1; i >= 0; i--) {
        const s = this.shots[i];
        s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt;
        if (s.life > s.max) { this.shots.splice(i, 1); continue; }
        const fade = Math.sin((s.life / s.max) * Math.PI);
        const tx = s.x - s.vx * 0.16, ty = s.y - s.vy * 0.16;
        const lg = ctx.createLinearGradient(s.x, s.y, tx, ty);
        lg.addColorStop(0, 'rgba(255,246,222,' + 0.9 * fade + ')');
        lg.addColorStop(0.3, 'rgba(242,184,96,' + 0.4 * fade + ')');
        lg.addColorStop(1, 'rgba(224,118,58,0)');
        ctx.strokeStyle = lg; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty); ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    // Readability veil: darkening under the left text column in the hero
    if (h && !narrow) {
      const vg = ctx.createLinearGradient(h.left, 0, h.left + h.width * 0.62, 0);
      vg.addColorStop(0, 'rgba(5,5,5,0.6)');
      vg.addColorStop(0.55, 'rgba(5,5,5,0.32)');
      vg.addColorStop(1, 'rgba(5,5,5,0)');
      ctx.fillStyle = vg;
      ctx.fillRect(h.left, Math.max(0, h.top), h.width * 0.6, Math.min(H, h.height));
    }
  }
}
