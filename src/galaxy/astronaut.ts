/**
 * Procedurally drawn EVA astronaut (white suit, gold visor, chest control unit,
 * backpack, red leg bands, dark gloves), rendered once into an offscreen sprite.
 *
 * The figure is drawn upright in a 512×512 box centred on (256, 256) with a key
 * light from the upper left; GalaxyRenderer adds rotation, tidal stretch, the
 * warm rim light from the black hole and the redshift tint per frame.
 */

export const SPRITE = 512;

type Ctx = CanvasRenderingContext2D;
type Pt = [number, number];

const KEY: Pt = [-0.6, -0.8]; // light direction (towards the light)

/** Builds (without painting) a tapered capsule path from a to b. */
function capsule(g: Ctx, a: Pt, b: Pt, wa: number, wb: number) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const nx = Math.cos(ang - Math.PI / 2), ny = Math.sin(ang - Math.PI / 2);
  g.beginPath();
  g.moveTo(a[0] + nx * wa / 2, a[1] + ny * wa / 2);
  g.lineTo(b[0] + nx * wb / 2, b[1] + ny * wb / 2);
  g.arc(b[0], b[1], wb / 2, ang - Math.PI / 2, ang + Math.PI / 2);
  g.lineTo(a[0] - nx * wa / 2, a[1] - ny * wa / 2);
  g.arc(a[0], a[1], wa / 2, ang + Math.PI / 2, ang + Math.PI * 1.5);
  g.closePath();
}

/** Tapered capsule from a to b (widths wa, wb) shaded like a fabric cylinder. */
function limb(g: Ctx, a: Pt, b: Pt, wa: number, wb: number, opts: { dark?: boolean; folds?: number } = {}) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const nx = Math.cos(ang - Math.PI / 2), ny = Math.sin(ang - Math.PI / 2);
  const path = () => capsule(g, a, b, wa, wb);
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, w = Math.max(wa, wb) / 2;
  // Which edge faces the light decides the gradient direction.
  const lit = nx * KEY[0] + ny * KEY[1] > 0 ? 1 : -1;
  const gr = g.createLinearGradient(mx + nx * w * lit, my + ny * w * lit, mx - nx * w * lit, my - ny * w * lit);
  if (opts.dark) {
    gr.addColorStop(0, '#5a5a5e'); gr.addColorStop(0.25, '#7a7a80'); gr.addColorStop(0.6, '#3a3a3e'); gr.addColorStop(1, '#18181a');
  } else {
    gr.addColorStop(0, '#a8a49b'); gr.addColorStop(0.16, '#fbfaf6'); gr.addColorStop(0.42, '#e8e4db');
    gr.addColorStop(0.78, '#aaa59b'); gr.addColorStop(1, '#6d6962');
  }
  path(); g.fillStyle = gr; g.fill();
  // Fabric folds across the limb
  const folds = opts.folds ?? 0;
  if (folds) {
    g.save(); path(); g.clip();
    g.lineCap = 'round';
    for (let i = 1; i <= folds; i++) {
      const f = i / (folds + 1);
      const cx = a[0] + (b[0] - a[0]) * f, cy = a[1] + (b[1] - a[1]) * f;
      const wv = (wa + (wb - wa) * f) / 2;
      const bend = (i % 2 ? 1 : -1) * 4;
      g.beginPath();
      g.moveTo(cx + nx * wv, cy + ny * wv);
      g.quadraticCurveTo(cx + Math.cos(ang) * bend, cy + Math.sin(ang) * bend, cx - nx * wv, cy - ny * wv);
      g.strokeStyle = 'rgba(60,55,48,0.22)'; g.lineWidth = 2.2; g.stroke();
      g.beginPath();
      g.moveTo(cx + nx * wv + Math.cos(ang) * 3, cy + ny * wv + Math.sin(ang) * 3);
      g.quadraticCurveTo(cx + Math.cos(ang) * (bend + 3), cy + Math.sin(ang) * (bend + 3), cx - nx * wv + Math.cos(ang) * 3, cy - ny * wv + Math.sin(ang) * 3);
      g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 1.4; g.stroke();
    }
    g.restore();
  }
}

/** A band (ring) around a limb at fraction f along it. */
function band(g: Ctx, a: Pt, b: Pt, wa: number, wb: number, f: number, width: number, color: string, shine = 'rgba(255,255,255,0.25)') {
  g.save(); capsule(g, a, b, wa, wb); g.clip();
  const ang2 = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const cx = a[0] + (b[0] - a[0]) * f, cy = a[1] + (b[1] - a[1]) * f;
  const w = wa + (wb - wa) * f;
  g.translate(cx, cy); g.rotate(ang2);
  g.fillStyle = color; g.fillRect(-width / 2, -w, width, w * 2);
  g.fillStyle = shine; g.fillRect(-width / 2, -w, width * 0.3, w * 2);
  g.restore();
}

function rrect(g: Ctx, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h);
}

function glove(g: Ctx, wrist: Pt, dir: number) {
  const cos = Math.cos(dir), sin = Math.sin(dir);
  const at = (d: number, side: number): Pt => [wrist[0] + cos * d - sin * side, wrist[1] + sin * d + cos * side];
  // Metal wrist ring
  limb(g, at(-6, 0), at(6, 0), 40, 38);
  g.save(); g.translate(wrist[0], wrist[1]); g.rotate(dir);
  const rg = g.createLinearGradient(0, -20, 0, 20);
  rg.addColorStop(0, '#eef0f2'); rg.addColorStop(0.4, '#9da2a8'); rg.addColorStop(1, '#4b4f55');
  g.fillStyle = rg; rrect(g, -6, -20, 12, 40, 4); g.fill();
  g.restore();
  // Palm + fingers
  for (let i = 0; i < 4; i++) {
    const side = -12 + i * 8;
    limb(g, at(22, side * 1.1), at(42 - Math.abs(i - 1.5) * 4, side * 1.3), 12, 10, { dark: true });
  }
  limb(g, at(10, 0), at(26, 0), 42, 38, { dark: true });
  limb(g, at(14, 18), at(30, 28), 13, 11, { dark: true }); // thumb
  // Knuckle seam
  g.save(); g.translate(...at(23, 0)); g.rotate(dir);
  g.strokeStyle = 'rgba(200,200,205,0.35)'; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(0, -14); g.lineTo(0, 14); g.stroke();
  g.restore();
}

function boot(g: Ctx, ankle: Pt, toe: Pt) {
  const ang = Math.atan2(toe[1] - ankle[1], toe[0] - ankle[0]);
  const off: Pt = [Math.cos(ang + Math.PI / 2) * 7, Math.sin(ang + Math.PI / 2) * 7];
  limb(g, [ankle[0] + off[0], ankle[1] + off[1]], [toe[0] + off[0], toe[1] + off[1]], 50, 40, { dark: true }); // sole
  limb(g, ankle, toe, 50, 40);
  band(g, ankle, toe, 50, 40, 0.1, 6, 'rgba(120,115,105,0.45)', 'rgba(0,0,0,0)');
}

export function buildAstronautSprite(): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = cv.height = SPRITE;
  const g = cv.getContext('2d')!;
  g.lineJoin = 'round';

  // Points (upright pose, arms out, knees bent – floating)
  const sh_L: Pt = [196, 178], el_L: Pt = [128, 146], wr_L: Pt = [78, 154];
  const sh_R: Pt = [330, 196], el_R: Pt = [390, 252], wr_R: Pt = [424, 304];
  const hip_L: Pt = [222, 300], kn_L: Pt = [176, 382], an_L: Pt = [170, 448], toe_L: Pt = [128, 474];
  const hip_R: Pt = [290, 306], kn_R: Pt = [312, 394], an_R: Pt = [268, 452], toe_R: Pt = [238, 486];

  // 1. Backpack (life-support pack) behind the torso
  {
    const bg = g.createLinearGradient(290, 0, 380, 0);
    bg.addColorStop(0, '#ebe8e1'); bg.addColorStop(0.55, '#c9c5bc'); bg.addColorStop(1, '#7d7970');
    g.fillStyle = bg; rrect(g, 286, 112, 92, 190, 18); g.fill();
    g.strokeStyle = 'rgba(70,66,60,0.45)'; g.lineWidth = 2; g.stroke();
    g.fillStyle = 'rgba(70,66,60,0.25)'; rrect(g, 352, 128, 18, 156, 6); g.fill();
    g.fillStyle = '#d8d4cb'; rrect(g, 362, 90, 26, 34, 6); g.fill(); // antenna housing
    g.fillStyle = '#2b2d31'; rrect(g, 368, 98, 14, 10, 3); g.fill();
  }

  // 2. Far arm and far leg (slightly darker, behind the body)
  g.save(); g.filter = 'brightness(0.86)';
  limb(g, hip_R, kn_R, 64, 54, { folds: 3 });
  band(g, hip_R, kn_R, 64, 54, 0.62, 9, '#9c2f27');
  limb(g, kn_R, an_R, 54, 46, { folds: 2 });
  boot(g, an_R, toe_R);
  limb(g, sh_R, el_R, 50, 44, { folds: 3 });
  limb(g, el_R, wr_R, 44, 38, { folds: 2 });
  glove(g, wr_R, Math.atan2(wr_R[1] - el_R[1], wr_R[0] - el_R[0]));
  g.restore();

  // 3. Torso (hard upper torso) + lower torso
  {
    const tg = g.createLinearGradient(180, 0, 340, 0);
    tg.addColorStop(0, '#a7a399'); tg.addColorStop(0.18, '#fbfaf6'); tg.addColorStop(0.5, '#e6e2d9'); tg.addColorStop(0.85, '#a29d93'); tg.addColorStop(1, '#6f6b64');
    g.fillStyle = tg;
    rrect(g, 184, 150, 156, 120, 46); g.fill();
    g.beginPath(); g.ellipse(258, 292, 76, 50, 0, 0, Math.PI * 2); g.fill();
    rrect(g, 196, 240, 128, 60, 20); g.fill();
    // waist bearing ring
    g.strokeStyle = 'rgba(95,92,86,0.55)'; g.lineWidth = 4;
    g.beginPath(); g.ellipse(259, 268, 66, 10, 0, 0, Math.PI); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.5)'; g.lineWidth = 1.5;
    g.beginPath(); g.ellipse(259, 264, 66, 10, 0, 0, Math.PI); g.stroke();
  }

  // 4. Near leg
  limb(g, hip_L, kn_L, 66, 56, { folds: 3 });
  band(g, hip_L, kn_L, 66, 56, 0.62, 9, '#a3332a');
  limb(g, kn_L, an_L, 56, 48, { folds: 2 });
  boot(g, an_L, toe_L);

  // 5. Chest display & control unit with hose to the backpack
  {
    g.lineCap = 'round';
    g.strokeStyle = '#6e6b65'; g.lineWidth = 12;
    g.beginPath(); g.moveTo(300, 250); g.bezierCurveTo(330, 280, 352, 262, 344, 228); g.stroke();
    g.strokeStyle = '#c9c6bf'; g.lineWidth = 8; g.stroke();
    g.strokeStyle = 'rgba(80,76,70,0.5)'; g.lineWidth = 1; g.setLineDash([2, 4]); g.stroke(); g.setLineDash([]);

    const bx = 214, by = 188, bw = 92, bh = 64;
    const cg = g.createLinearGradient(bx, by, bx, by + bh);
    cg.addColorStop(0, '#e4e2dd'); cg.addColorStop(1, '#9c998f');
    g.fillStyle = 'rgba(0,0,0,0.25)'; rrect(g, bx + 3, by + 5, bw, bh, 7); g.fill(); // contact shadow
    g.fillStyle = cg; rrect(g, bx, by, bw, bh, 7); g.fill();
    g.strokeStyle = '#6b6861'; g.lineWidth = 1.5; g.stroke();
    // gauge
    g.fillStyle = '#1d1f23'; g.beginPath(); g.arc(bx + 20, by + 22, 12, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#c9a86a'; g.lineWidth = 2; g.stroke();
    g.strokeStyle = '#E0763A'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(bx + 20, by + 22); g.lineTo(bx + 27, by + 15); g.stroke();
    // display + switches
    g.fillStyle = '#26292e'; rrect(g, bx + 40, by + 10, 44, 22, 3); g.fill();
    g.fillStyle = 'rgba(160,200,230,0.35)'; g.fillRect(bx + 43, by + 13, 38, 3);
    for (let i = 0; i < 4; i++) {
      g.fillStyle = '#3a3d42'; rrect(g, bx + 10 + i * 19, by + 42, 13, 13, 3); g.fill();
      g.fillStyle = i === 1 ? '#F2B860' : i === 3 ? '#E0763A' : '#c7c9cc'; g.fillRect(bx + 14 + i * 19, by + 46, 5, 5);
    }
    // bracket
    g.strokeStyle = '#7b7870'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(bx + 8, by + bh); g.lineTo(bx + 30, by + bh + 18); g.lineTo(bx + 70, by + bh + 18); g.stroke();
  }

  // 6. Near arm
  limb(g, sh_L, el_L, 52, 46, { folds: 3 });
  limb(g, el_L, wr_L, 46, 40, { folds: 2 });
  glove(g, wr_L, Math.atan2(wr_L[1] - el_L[1], wr_L[0] - el_L[0]));
  // shoulder patch
  g.save(); g.translate(204, 168); g.rotate(-0.35);
  g.fillStyle = '#F2B860'; rrect(g, -11, -7, 22, 14, 2); g.fill();
  g.fillStyle = '#E0763A'; g.fillRect(-11, -1, 22, 3);
  g.restore();

  // 7. Neck ring + helmet
  {
    const hx = 274, hy = 104, hr = 60;
    const ng = g.createLinearGradient(220, 0, 330, 0);
    ng.addColorStop(0, '#d7dade'); ng.addColorStop(0.4, '#8d9298'); ng.addColorStop(1, '#4a4e54');
    g.fillStyle = ng; g.beginPath(); g.ellipse(268, 160, 50, 14, -0.12, 0, Math.PI * 2); g.fill();

    const hg = g.createRadialGradient(hx - 24, hy - 26, 6, hx, hy, hr);
    hg.addColorStop(0, '#ffffff'); hg.addColorStop(0.55, '#dedad2'); hg.addColorStop(1, '#827d74');
    g.fillStyle = hg; g.beginPath(); g.arc(hx, hy, hr, 0, Math.PI * 2); g.fill();

    // helmet lights / cameras
    for (const [lx, ly] of [[226, 70], [326, 86]] as Pt[]) {
      g.fillStyle = '#cfcbc2'; rrect(g, lx - 11, ly - 13, 22, 26, 5); g.fill();
      g.strokeStyle = 'rgba(70,66,60,0.6)'; g.lineWidth = 1.2; g.stroke();
      g.fillStyle = '#1b1d21'; g.beginPath(); g.arc(lx, ly - 2, 5.5, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.6)'; g.beginPath(); g.arc(lx - 1.5, ly - 4, 1.6, 0, Math.PI * 2); g.fill();
    }

    // gold visor
    const vx = hx + 6, vy = hy + 4, vrx = 46, vry = 42;
    const vg = g.createRadialGradient(vx - 10, vy - 12, 4, vx, vy, vrx);
    vg.addColorStop(0, '#3a2a14'); vg.addColorStop(0.45, '#1c140b'); vg.addColorStop(0.8, '#7a5520'); vg.addColorStop(0.94, '#d8a448'); vg.addColorStop(1, '#f4d58a');
    g.fillStyle = vg; g.beginPath(); g.ellipse(vx, vy, vrx, vry, -0.15, 0, Math.PI * 2); g.fill();
    g.strokeStyle = '#8f8a80'; g.lineWidth = 3; g.stroke();
    // reflections: window highlight + warm disk reflection
    g.save(); g.beginPath(); g.ellipse(vx, vy, vrx, vry, -0.15, 0, Math.PI * 2); g.clip();
    g.fillStyle = 'rgba(255,255,255,0.45)';
    g.beginPath(); g.ellipse(vx - 18, vy - 20, 14, 5, -0.6, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.08)';
    g.beginPath(); g.ellipse(vx - 4, vy - 8, 34, 10, -0.5, 0, Math.PI * 2); g.fill();
    const rg = g.createLinearGradient(vx - vrx, vy + 14, vx + vrx, vy + 14);
    rg.addColorStop(0, 'rgba(255,190,110,0)'); rg.addColorStop(0.5, 'rgba(255,200,130,0.7)'); rg.addColorStop(1, 'rgba(255,190,110,0)');
    g.fillStyle = rg; g.beginPath(); g.ellipse(vx + 4, vy + 16, 36, 4, -0.15, 0, Math.PI * 2); g.fill();
    g.restore();
  }

  // 8. Soft ambient occlusion under the helmet
  {
    const ao = g.createRadialGradient(262, 168, 4, 262, 168, 70);
    ao.addColorStop(0, 'rgba(40,36,30,0.3)'); ao.addColorStop(1, 'rgba(40,36,30,0)');
    g.globalCompositeOperation = 'source-atop';
    g.fillStyle = ao; g.fillRect(190, 140, 150, 80);
    g.globalCompositeOperation = 'source-over';
  }
  return cv;
}
