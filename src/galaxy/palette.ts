/**
 * Colour themes for the galaxy canvas.
 *
 * The renderer is written with the "normal" (gold / ember) colours. For the
 * "dark" theme every warm RGB triplet is swapped for a violet / indigo one, so
 * the black hole glows violet against a deep indigo night sky.
 */

export type ThemeName = 'normal' | 'dark';

export const THEMES: ThemeName[] = ['normal', 'dark'];

/** localStorage key for the visitor's chosen theme. */
export const THEME_STORAGE_KEY = 'theme';

/** Reads the active theme from `<html data-theme>`. */
export function currentTheme(): ThemeName {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'normal';
}

const DARK: Record<string, string> = {
  // backgrounds, shadow, veil
  '5,5,5': '9,7,26',
  '30,12,6': '18,12,48',
  '6,3,2': '6,4,18',
  // brand accents & nebulae
  '242,184,96': '167,139,250',
  '224,118,58': '124,92,255',
  '232,150,90': '150,120,255',
  '140,66,34': '58,36,140',
  '200,90,0': '96,56,220',
  '110,135,160': '80,100,220',
  // black hole disk, rings and halo (hot core → cool rim)
  '255,248,236': '246,243,255',
  '255,224,178': '222,212,255',
  '246,172,108': '176,148,255',
  '214,112,60': '124,92,255',
  '122,54,28': '58,36,150',
  '255,206,150': '204,186,255',
  '255,240,214': '240,236,255',
  '255,214,160': '210,196,255',
  '255,236,210': '236,230,255',
  '255,246,232': '248,246,255',
  // stars & shooting stars
  '255,244,224': '232,232,255',
  '246,214,170': '206,198,255',
  '255,246,222': '242,240,255',
  // astronaut glow, rim light and redshift tint
  '255,200,140': '196,176,255',
  '255,180,110': '180,156,255',
  '255,170,90': '170,140,255',
  '225,110,50': '110,76,240',
};

const TRIPLET = /\d{1,3},\d{1,3},\d{1,3}/;
const HEX: Record<string, string> = { '#050505': '#09071a' };

/** Returns a colour-mapping function for the given theme (cached per string). */
export function paletteFor(theme: ThemeName): (css: string) => string {
  if (theme === 'normal') return (css) => css;
  const cache = new Map<string, string>();
  return (css) => {
    let out = cache.get(css);
    if (out === undefined) {
      out = HEX[css] ?? css.replace(TRIPLET, (m) => DARK[m] ?? m);
      if (cache.size > 4000) cache.clear();
      cache.set(css, out);
    }
    return out;
  };
}
