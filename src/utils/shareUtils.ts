import LZString from 'lz-string';

const T_MAP: Record<string, string> = { rose: 'r', tulip: 't', sunflower: 's', lily: 'l', daisy: 'd' };
const T_INV: Record<string, string> = { r: 'rose', t: 'tulip', s: 'sunflower', l: 'lily', d: 'daisy' };

// Pack flower array into a single tiny string
// format: "t,x,y,r,s,z,c_t,x,y,r,s,z,c"
function packFlowers(flowers: any[]) {
  return flowers.map(f => {
    const t = T_MAP[f.type] || 'r';
    const c = f.color === 'default' ? '' : f.color.replace('#', '');
    return `${t},${Math.round(f.x)},${Math.round(f.y)},${Math.round(f.rotation)},${Number(f.scale.toFixed(2))},${f.zIndex},${c}`;
  }).join('_');
}

// Expand packed string back to array
function unpackFlowers(packed: string | any[]) {
  if (!packed) return [];
  // if older minified array format, fallback:
  if (Array.isArray(packed)) {
    return packed.map(f => ({
      id: f.i || Math.random().toString(36).substr(2, 4),
      type: f.t, color: f.c || 'default',
      x: f.x, y: f.y, rotation: f.r, scale: f.s, zIndex: f.z
    }));
  }
  
  return packed.split('_').map((str, i) => {
    const [t, x, y, r, s, z, c] = str.split(',');
    return {
      id: `f${i}_${Math.random().toString(36).substr(2, 4)}`,
      type: T_INV[t] || 'rose',
      color: c ? `#${c}` : 'default',
      x: Number(x), y: Number(y),
      rotation: Number(r), scale: Number(s), zIndex: Number(z)
    };
  });
}

export function encodeAppState(state: any): string {
  try {
    // 1. Minify state object keys to save bytes
    const minified = {
      b: {
        f: packFlowers(state.bouquet.flowers),
        w: state.bouquet.wrapper,
        r: state.bouquet.ribbonColor
      },
      m: state.message, // text, font, sender, to
      t: state.theme === 'light' ? 0 : 1 // 0=light, 1=dark
    };

    const jsonString = JSON.stringify(minified);
    
    // 2. Compress the string into a heavily squashed, URL-safe format
    return LZString.compressToEncodedURIComponent(jsonString);
  } catch (error) {
    console.error("Failed to encode state", error);
    return "";
  }
}

export function decodeAppState(encoded: string): any | null {
  try {
    // Try to decompress new LZ-String format
    const jsonString = LZString.decompressFromEncodedURIComponent(encoded);
    
    if (jsonString) {
      const parsed = JSON.parse(jsonString);
      
      // If parsed object has 'b', it is our new minified format
      if (parsed.b) {
        return {
          bouquet: {
            flowers: unpackFlowers(parsed.b.f || ''),
            wrapper: parsed.b.w,
            ribbonColor: parsed.b.r
          },
          message: parsed.m || { text: '', font: '', sender: '', to: '' },
          theme: parsed.t === 1 ? 'dark' : 'light'
        };
      }
      
      // If it parsed via LZ but has old structure
      return parsed;
    }

    // Fallback: If not LZ compressed, try the old Base64 decoding for backward compatibility
    const decodedB64 = decodeURIComponent(atob(encoded));
    return JSON.parse(decodedB64);

  } catch (error) {
    console.error("Failed to decode state", error);
    return null;
  }
}
