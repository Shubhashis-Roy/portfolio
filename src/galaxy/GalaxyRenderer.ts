/**
 * Canvas 2D galaxy background: starfield, nebulae, a Gargantua-style black hole
 * that drifts with scroll progress, an astronaut falling toward it, a moon,
 * cosmic dust and shooting stars. (The Earth horizon is an <img> in Contact.)
 *
 * Ported 1:1 from the original design export. Sections opt in with
 * `data-galaxy="<intensity 0..1>"` and `data-gx="<name>"` attributes.
 */

import { buildAstronautSprite } from './astronaut';
import { currentTheme, paletteFor } from './palette';

type Star = { x: number; y: number; z: number; r: number; c: string; tw: boolean; ph: number; sp: number };
type Dust = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: string };
type DiskP = { r: number; a: number; w: number; h: number; b: number; ci: number; len: number };
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
  private sections: HTMLElement[] = [];
  private shots: Shot[] = [];
  private nextShot = 2.5;
  private time = 0;
  private lastNow = performance.now();
  // black hole (smoothed scroll progress drives its drift and the astronaut's fall)
  private pS: number | undefined;
  private earthEl: HTMLElement | null = null;
  private gCols = ['255,248,236', '255,224,178', '246,172,108', '214,112,60', '122,54,28'];
  private gLv = 8;
  private gDisk: DiskP[] | null = null;
  private gk: number[][] = [];
  /** Maps a design colour to the active theme (identity for the normal theme). */
  private c: (css: string) => string = (css) => css;
  private themeObserver: MutationObserver | null = null;
  private astro: HTMLCanvasElement | null = null;
  private astroTint: HTMLCanvasElement | null = null;

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
    // Follow the site theme (<html data-theme>)
    this.c = paletteFor(currentTheme());
    this.themeObserver = new MutationObserver(() => {
      this.c = paletteFor(currentTheme());
      if (!this.animating) requestAnimationFrame((t) => this.frame(t));
    });
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
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
    this.themeObserver?.disconnect();
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

  /* ---------- Gargantua-style black hole: far side of the disk lensed over and under the shadow ---------- */
  private buildGargantua() {
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const disk: DiskP[] = [];
    for (let i = 0; i < 6500; i++) {
      const r = 1.5 + Math.pow(Math.random(), 1.6) * 4.6;
      const q = Math.random();
      const ci = r < 1.9 ? 0 : r < 2.6 ? (q < 0.55 ? 1 : 0) : r < 3.5 ? (q < 0.6 ? 2 : 1) : r < 4.6 ? (q < 0.6 ? 3 : 2) : q < 0.6 ? 4 : 3;
      let b = Math.max(0.12, Math.min(1, 1.25 - (r - 1.5) / 3.8));
      b *= 0.62 + 0.38 * Math.sin(r * 10.5 + Math.random() * 0.8);
      if (Math.random() < 0.18) b *= 0.3; // dusty lanes
      disk.push({ r, a: Math.random() * TAU, w: 0.5 * Math.pow(1.5 / r, 1.5), h: gauss() * 0.07 * r, b, ci, len: 0.06 + Math.random() * 0.22 });
    }
    this.gDisk = disk;
    const n = 3 * this.gCols.length * this.gLv;
    this.gk = [];
    for (let i = 0; i < n; i++) this.gk.push([]);
  }

  /** Strokes one layer of batched disk streaks (bucketed by colour and alpha level). */
  private gStroke(ctx: CanvasRenderingContext2D, layer: number, lw: number) {
    const C = this.gCols.length, L = this.gLv;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    for (let ci = 0; ci < C; ci++) {
      ctx.strokeStyle = this.c('rgb(' + this.gCols[ci] + ')');
      for (let li = 0; li < L; li++) {
        const arr = this.gk[layer * C * L + ci * L + li];
        if (!arr.length) continue;
        ctx.globalAlpha = (li + 1) / L;
        ctx.beginPath();
        for (let j = 0; j < arr.length; j += 6) { ctx.moveTo(arr[j], arr[j + 1]); ctx.lineTo(arr[j + 2], arr[j + 3]); ctx.lineTo(arr[j + 4], arr[j + 5]); }
        ctx.stroke();
        arr.length = 0;
      }
    }
    ctx.globalAlpha = 1;
  }

  private drawGargantua(ctx: CanvasRenderingContext2D, cx: number, cy: number, rh: number, rot: number, tau: number, A: number, t: number) {
    if (!this.gDisk) this.buildGargantua();
    if (cy + rh * 4 < -60 || cy - rh * 4 > this.H + 60 || A <= 0.01) return;
    const cr = Math.cos(rot), sr = Math.sin(rot);
    const C = this.gCols.length, L = this.gLv, gk = this.gk;
    const pt = [0, 0];
    // Disk point (r, phi, thickness) -> screen. mode 0: primary image (far side lifted over the top), mode 1: secondary image under the shadow
    const map = (r: number, ph: number, hh: number, mode: 0 | 1) => {
      const u = r * Math.cos(ph), s = Math.sin(ph);
      const vd = (r * s + hh) * tau;
      let v = vd;
      if (mode === 1) {
        const p2 = 1.06 + (r - 1.5) * 0.24;
        v = Math.sqrt(Math.max(0, p2 * p2 - u * u)) * 0.95 + hh * 0.3;
      } else if (s < 0) {
        const p1 = 1.14 + (r - 1.5) * 0.44;
        if (Math.abs(u) < p1) v = Math.min(vd, -Math.sqrt(p1 * p1 - u * u) * 0.96 + hh * 0.5);
      }
      pt[0] = cx + (u * cr - v * sr) * rh;
      pt[1] = cy + (u * sr + v * cr) * rh;
    };
    const halo = ctx.createRadialGradient(cx, cy, rh, cx, cy, rh * 6);
    halo.addColorStop(0, this.c('rgba(255,206,150,') + 0.18 * A + ')');
    halo.addColorStop(0.35, this.c('rgba(214,112,60,') + 0.06 * A + ')');
    halo.addColorStop(1, this.c('rgba(214,112,60,0)'));
    ctx.fillStyle = halo;
    ctx.fillRect(cx - rh * 6, cy - rh * 6, rh * 12, rh * 12);
    const band = (half: number, k2: number) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
      ctx.beginPath(); ctx.rect(-rh * 7, half < 0 ? -rh * 7 : 0, rh * 14, rh * 7); ctx.clip();
      ctx.scale(1, tau * 1.7);
      const g = ctx.createRadialGradient(0, 0, rh * 1.3, 0, 0, rh * 6.2);
      g.addColorStop(0, this.c('rgba(255,240,214,') + 0.6 * A * k2 + ')');
      g.addColorStop(0.16, this.c('rgba(255,214,160,') + 0.38 * A * k2 + ')');
      g.addColorStop(0.5, this.c('rgba(214,112,60,') + 0.14 * A * k2 + ')');
      g.addColorStop(1, this.c('rgba(122,54,28,0)'));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rh * 6.2, 0, TAU); ctx.fill();
      ctx.restore();
    };
    /** [radius, width, alpha, rgb] arcs; lo = under the shadow, otherwise over the top. */
    const arcs = (lo: boolean, list: [number, number, number, string][]) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
      for (const q of list) {
        ctx.lineWidth = rh * q[1];
        ctx.strokeStyle = 'rgba(' + q[3] + ',' + q[2] * A + ')';
        ctx.beginPath();
        if (lo) ctx.ellipse(0, 0, rh * q[0], rh * q[0] * 0.95, 0, 0.12, Math.PI - 0.12);
        else ctx.ellipse(0, 0, rh * q[0], rh * q[0] * 0.96, 0, Math.PI + 0.04, 2 * Math.PI - 0.04);
        ctx.stroke();
      }
      ctx.restore();
    };
    // 1. Far side: disk glow + lensed arc over the top
    band(-1, 1);
    arcs(false, [[1.2, 0.14, 0.5, this.c('255,240,214')], [1.42, 0.3, 0.3, this.c('255,214,160')], [1.78, 0.46, 0.13, this.c('246,172,108')], [2.3, 0.6, 0.05, this.c('214,112,60')]]);
    for (const p of this.gDisk!) {
      const ph = p.a - p.w * t;
      const s = Math.sin(ph), c = Math.cos(ph);
      const D = 1 - 0.5 * c; // Doppler beaming
      const dl = Math.min(0.5, p.len + p.w * 0.35);
      const front = s > 0;
      const al = p.b * D * A * 0.5 * (front ? 1 : 0.85);
      if (al >= 0.03) {
        const li = Math.min(L - 1, Math.floor(al * L));
        const arr = gk[(front ? 2 : 0) * C * L + p.ci * L + li];
        map(p.r, ph, p.h, 0); arr.push(pt[0], pt[1]);
        map(p.r, ph + dl * 0.5, p.h, 0); arr.push(pt[0], pt[1]);
        map(p.r, ph + dl, p.h, 0); arr.push(pt[0], pt[1]);
      }
      if (!front && p.r < 4.2) {
        const al2 = p.b * D * A * 0.22;
        const p2 = 1.06 + (p.r - 1.5) * 0.24;
        if (al2 >= 0.03 && Math.abs(p.r * c) < p2) {
          const arr2 = gk[C * L + p.ci * L + Math.min(L - 1, Math.floor(al2 * L))];
          map(p.r, ph, p.h, 1); arr2.push(pt[0], pt[1]);
          map(p.r, ph + dl * 0.5, p.h, 1); arr2.push(pt[0], pt[1]);
          map(p.r, ph + dl, p.h, 1); arr2.push(pt[0], pt[1]);
        }
      }
    }
    this.gStroke(ctx, 0, Math.max(0.9, rh / 80));
    // 2. Event horizon shadow
    ctx.globalCompositeOperation = 'source-over';
    const sh = ctx.createRadialGradient(cx, cy - rh * 0.2, 0, cx, cy, rh * 1.04);
    sh.addColorStop(0, this.c('rgba(30,12,6,1)'));
    sh.addColorStop(0.85, this.c('rgba(6,3,2,1)'));
    sh.addColorStop(1, this.c('rgba(6,3,2,0)'));
    ctx.fillStyle = sh; ctx.beginPath(); ctx.arc(cx, cy, rh * 1.04, 0, TAU); ctx.fill();
    ctx.globalCompositeOperation = 'lighter';
    // 3. Photon ring
    ctx.lineWidth = Math.max(1, rh * 0.012); ctx.strokeStyle = this.c('rgba(255,246,232,') + 0.9 * A + ')';
    ctx.beginPath(); ctx.arc(cx, cy, rh * 1.015, 0, TAU); ctx.stroke();
    ctx.lineWidth = rh * 0.05; ctx.strokeStyle = this.c('rgba(255,214,160,') + 0.14 * A + ')';
    ctx.beginPath(); ctx.arc(cx, cy, rh * 1.03, 0, TAU); ctx.stroke();
    // 4. Secondary image under the shadow
    arcs(true, [[1.1, 0.06, 0.28, this.c('255,236,210')], [1.28, 0.16, 0.12, this.c('246,172,108')], [1.55, 0.26, 0.04, this.c('214,112,60')]]);
    this.gStroke(ctx, 1, Math.max(0.8, rh / 95));
    // 5. Near side of the disk crosses in front
    band(1, 1.15);
    this.gStroke(ctx, 2, Math.max(1, rh / 70));
  }

  /** Astronaut spiralling toward the black hole as scroll progress `p` goes 0 → 1; slows, stretches and redshifts, never crosses. */
  private drawAstronaut(ctx: CanvasRenderingContext2D, bx: number, by: number, rh: number, p: number, t: number, narrow: boolean) {
    const a = 1 - Math.pow(1 - p, 2.4);
    const q = a * a;
    // Starts up and to the left of the black hole (in the gap above the headline), then spirals in
    const th = -2.53 - a * Math.PI * 1.45;
    const dist = rh * (1.2 + 1.75 * (1 - a));
    const x = bx + Math.cos(th) * dist + Math.sin(t * 0.5) * 8 * (1 - a);
    const y = by + Math.sin(th) * dist * 0.82 + Math.cos(t * 0.4) * 6 * (1 - a);
    const s = (narrow ? 24 : 42) * (0.3 + 0.7 * (1 - a)) * Math.max(0.7, Math.min(1.15, rh / 140));
    if (y < -s * 3 || y > this.H + s * 3) return;
    const ra = Math.atan2(by - y, bx - x);
    const spin = t * 0.18 + a * 5.5 + 0.55; // slow tumble; starts tilted like a floating EVA pose
    const D = s * 2.7; // on-screen sprite size

    // Per-frame lighting in sprite space: shadow on the far side, warm rim from the accretion disk, redshift near the horizon
    if (!this.astro) this.astro = buildAstronautSprite();
    if (!this.astroTint) { this.astroTint = document.createElement('canvas'); this.astroTint.width = this.astroTint.height = 256; }
    const tc = this.astroTint, g = tc.getContext('2d')!;
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, 256, 256);
    g.drawImage(this.astro, 0, 0, 256, 256);
    g.globalCompositeOperation = 'source-atop';
    const la = ra - spin, lx = Math.cos(la) * 128, ly = Math.sin(la) * 128;
    const lg = g.createLinearGradient(128 - lx, 128 - ly, 128 + lx, 128 + ly);
    lg.addColorStop(0, this.c('rgba(0,0,0,0.45)'));
    lg.addColorStop(0.55, this.c('rgba(0,0,0,0)'));
    lg.addColorStop(0.8, this.c('rgba(255,180,110,0.12)'));
    lg.addColorStop(1, this.c('rgba(255,170,90,') + (0.45 + 0.25 * q) + ')');
    g.fillStyle = lg; g.fillRect(0, 0, 256, 256);
    if (q > 0.01) { g.fillStyle = this.c('rgba(225,110,50,') + q * 0.55 + ')'; g.fillRect(0, 0, 256, 256); }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const gl = ctx.createRadialGradient(x, y, 0, x, y, s * 1.8);
    gl.addColorStop(0, this.c('rgba(255,200,140,') + (0.04 + 0.1 * q) + ')');
    gl.addColorStop(1, this.c('rgba(255,200,140,0)'));
    ctx.fillStyle = gl; ctx.fillRect(x - s * 1.8, y - s * 1.8, s * 3.6, s * 3.6);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1 - 0.45 * q;
    ctx.translate(x, y);
    ctx.rotate(ra); ctx.scale(1 + 1.1 * q, 1 - 0.4 * q); ctx.rotate(-ra); // tidal stretch toward the hole
    ctx.rotate(spin);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(tc, -D / 2, -D / 2, D, D);
    ctx.restore();
  }

  private drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, k: number) {
    if (y + r < 0 || y - r > this.H) return;
    ctx.globalCompositeOperation = 'source-over';
    const g = ctx.createRadialGradient(x - r * 0.45, y + r * 0.35, r * 0.1, x, y, r * 1.05);
    g.addColorStop(0, 'rgba(214,222,230,' + 0.85 * Math.min(1, k) + ')');
    g.addColorStop(0.55, 'rgba(110,122,134,' + 0.75 * Math.min(1, k) + ')');
    g.addColorStop(1, 'rgba(14,16,18,' + 0.9 * Math.min(1, k) + ')');
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

  private blob(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, a: number) {
    if (y + r < 0 || y - r > this.H || a <= 0.003) return;
    const gr = ctx.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(' + this.c(col) + ',' + a + ')');
    gr.addColorStop(0.5, 'rgba(' + this.c(col) + ',' + a * 0.35 + ')');
    gr.addColorStop(1, 'rgba(' + this.c(col) + ',0)');
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
    ctx.fillStyle = this.c('#050505');
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // Nebula clouds anchored to sections (drift slower than content = depth)
    const neb: [string, number, number, number, string, number][] = [
      ['hero', 0.7, 0.46, 0.5, this.c('224,118,58'), 0.09], ['hero', 0.55, 0.2, 0.32, this.c('242,184,96'), 0.04], ['hero', 0.95, 0.85, 0.4, this.c('140,66,34'), 0.09], ['hero', 0.98, 0.1, 0.42, this.c('110,135,160'), 0.05], ['hero', 0.15, 0.95, 0.35, this.c('110,135,160'), 0.03],
      ['about', 0.88, 0.35, 0.32, this.c('232,150,90'), 0.035],
      ['experience', 0.05, 0.5, 0.3, this.c('224,118,58'), 0.025],
      ['projects', 0.1, 0.12, 0.4, this.c('224,118,58'), 0.07], ['projects', 0.92, 0.45, 0.45, this.c('242,184,96'), 0.045], ['projects', 0.2, 0.8, 0.42, this.c('200,90,0'), 0.06],
      ['skills', 0.85, 0.5, 0.3, this.c('232,150,90'), 0.03],
      ['contact', 0.5, 0.48, 0.6, this.c('224,118,58'), 0.13], ['contact', 0.3, 0.3, 0.3, this.c('242,184,96'), 0.05],
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
      ctx.fillStyle = this.c('rgb(' + s.c + ')');
      const sz = s.r * (0.6 + s.z * 1.1);
      ctx.fillRect(x, y, sz, sz);
    }
    ctx.globalAlpha = 1;

    // Black hole stays in the sky and drifts with scroll progress; the astronaut falls toward it; Earth rises at the end
    const narrow = W < 860;
    const h = byKind.hero;
    const sm = (x: number, a: number, b: number) => { const q = Math.max(0, Math.min(1, (x - a) / (b - a))); return q * q * (3 - 2 * q); };
    const docH = Math.max(document.documentElement.scrollHeight || 0, document.body ? document.body.scrollHeight : 0);
    const prog = this.tall ? 0 : Math.max(0, Math.min(1, sc / Math.max(1, docH - H)));
    if (this.pS === undefined) this.pS = prog;
    this.pS += (prog - this.pS) * (animate ? 0.08 : 1);
    const p = this.pS;
    let bx: number, by: number, brh: number;
    if (this.tall || !h) {
      const hr = h || { left: 0, top: 0, width: W, height: H };
      brh = narrow ? Math.min(W * 0.2, 80) : Math.min(hr.width * 0.105, hr.height * 0.19, 165);
      bx = hr.left + hr.width * (narrow ? 0.6 : 0.66);
      by = hr.top + hr.height * (narrow ? 0.3 : 0.47);
    } else {
      const rh0 = narrow ? Math.min(W * 0.2, 80) : Math.min(W * 0.105, H * 0.2, 165);
      brh = rh0 * (1 - 0.12 * sm(p, 0, 0.3) - 0.32 * sm(p, 0.72, 1));
      bx = W * ((narrow ? 0.6 : 0.66) + 0.06 * sm(p, 0, 0.25) - (narrow ? 0.1 : 0.22) * sm(p, 0.72, 1));
      by = H * ((narrow ? 0.3 : 0.47) - 0.05 * sm(p, 0, 0.25) - (narrow ? 0.06 : 0.17) * sm(p, 0.72, 1));
    }
    bx -= mx * 26; by -= my * 18;
    // Keep the black hole above Earth's horizon once the planet scrolls into view
    if (!this.tall) {
      if (!this.earthEl?.isConnected) this.earthEl = this.root.querySelector<HTMLElement>('[data-earth]');
      if (this.earthEl) {
        const er = this.earthEl.getBoundingClientRect();
        const hz = er.top + er.height * 0.45;
        if (hz < H + brh * 3) {
          brh = Math.min(brh, Math.max(26, hz / 4.8));
          by = Math.max(brh * 2.5, Math.min(by, hz - brh * 2.1));
        }
      }
    }
    // Full brightness while the hero is on screen; dimmer once content sections scroll over it.
    const heroOn = h ? sm(h.bottom / H, 0.25, 0.9) : 0;
    const bhA = k * (narrow ? 0.6 : 1) * (0.42 + 0.58 * this.intensityAt(by, secs)) * (0.32 + 0.68 * heroOn);
    // Moon: starts low and to the right of the black hole, then (with scroll) rises, swings in behind it,
    // shrinks and fades out. Drawn before the black hole so the shadow and disk pass in front of it.
    if (!narrow) {
      const m = sm(p, 0, 0.32);
      const u = 1 - m;
      // quadratic curve in black-hole radii: start (2.4, 1.95) → control (2.7, -0.5) → end (0.1, -0.15)
      const ox = u * u * 2.4 + 2 * u * m * 2.7 + m * m * 0.1;
      const oy = u * u * 1.95 + 2 * u * m * -0.5 + m * m * -0.15;
      const fade = 1 - sm(m, 0.6, 1);
      if (fade > 0.01) this.drawMoon(ctx, bx + ox * brh - mx * 24, by + oy * brh - my * 18, 20 * (1 - 0.55 * m), k * fade);
    }
    this.drawGargantua(ctx, bx, by, brh, -0.05 + mx * 0.03, 0.075 + my * 0.015, bhA, t);
    this.drawAstronaut(ctx, bx, by, brh, p, t, narrow);

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
      ctx.fillStyle = this.c('rgb(' + d.c + ')');
      ctx.beginPath(); ctx.arc(d.x + mx * 50, d.y + my * 40, d.r, 0, TAU); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Shooting stars (every ~0.3–1 s, sometimes in pairs, only where the sky is bright enough)
    if (animate) {
      if (t > this.nextShot) {
        const n = Math.random() < 0.25 ? 2 : 1;
        for (let j = 0; j < n; j++) {
          const sy = Math.random() * H * (this.tall ? 1 : 0.8);
          if (this.intensityAt(sy, secs) > 0.1) {
            const ang = 0.28 + Math.random() * 0.36;
            const v = 800 + Math.random() * 400;
            this.shots.push({ x: W * (0.15 + Math.random() * 0.85), y: sy, vx: -Math.cos(ang) * v, vy: Math.sin(ang) * v, life: 0, max: 0.7 + Math.random() * 0.6 });
          }
        }
        this.nextShot = t + 0.3 + Math.random() * 0.8;
      }
      for (let i = this.shots.length - 1; i >= 0; i--) {
        const s = this.shots[i];
        s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt;
        if (s.life > s.max) { this.shots.splice(i, 1); continue; }
        const fade = Math.sin((s.life / s.max) * Math.PI);
        const tx = s.x - s.vx * 0.16, ty = s.y - s.vy * 0.16;
        const lg = ctx.createLinearGradient(s.x, s.y, tx, ty);
        lg.addColorStop(0, this.c('rgba(255,246,222,') + 0.9 * fade + ')');
        lg.addColorStop(0.3, this.c('rgba(242,184,96,') + 0.4 * fade + ')');
        lg.addColorStop(1, this.c('rgba(224,118,58,0)'));
        ctx.strokeStyle = lg; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty); ctx.stroke();
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    // Readability veil: darkening under the left text column in the hero
    if (h && !narrow) {
      const vg = ctx.createLinearGradient(h.left, 0, h.left + h.width * 0.72, 0);
      vg.addColorStop(0, this.c('rgba(5,5,5,0.72)'));
      vg.addColorStop(0.6, this.c('rgba(5,5,5,0.5)'));
      vg.addColorStop(1, this.c('rgba(5,5,5,0)'));
      ctx.fillStyle = vg;
      ctx.fillRect(h.left, Math.max(0, h.top), h.width * 0.72, Math.min(H, h.height));
    }
  }
}
