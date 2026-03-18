import LZString from 'lz-string';

// Minify flower array
function shortenFlowers(flowers: any[]) {
  return flowers.map(f => ({
    i: f.id.substring(0, 4), // shorter ID
    t: f.type,
    c: f.color === 'default' ? undefined : f.color, // omit if default
    x: Math.round(f.x),
    y: Math.round(f.y),
    r: Math.round(f.rotation),
    s: Number(f.scale.toFixed(2)),
    z: f.zIndex
  }));
}

// Expand flower array back to normal
function expandFlowers(minified: any[]) {
  return minified.map(f => ({
    id: f.i + Math.random().toString(36).substr(2, 4), // append random to ensure uniqueness if needed
    type: f.t,
    color: f.c || 'default',
    x: f.x,
    y: f.y,
    rotation: f.r,
    scale: f.s,
    zIndex: f.z
  }));
}

export function encodeAppState(state: any): string {
  try {
    // 1. Minify state object keys to single letters to save bytes
    const minified = {
      b: {
        f: shortenFlowers(state.bouquet.flowers),
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
            flowers: expandFlowers(parsed.b.f || []),
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
