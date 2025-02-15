export function generateNonce() {
  const array = new Uint8Array(16);
  globalThis.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}