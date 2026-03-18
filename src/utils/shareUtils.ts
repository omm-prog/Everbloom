export function encodeAppState(state: any): string {
  try {
    const jsonString = JSON.stringify(state);
    // Use btoa to base64 encode, mapping utf-8 properly
    const encoded = btoa(encodeURIComponent(jsonString));
    return encoded;
  } catch (error) {
    console.error("Failed to encode state", error);
    return "";
  }
}

export function decodeAppState(encoded: string): any | null {
  try {
    // Decode base64 and parse JSON
    const decoded = decodeURIComponent(atob(encoded));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode state", error);
    return null;
  }
}
