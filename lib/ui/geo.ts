/** "56.6219° N, 3.8669° W" from decimal latitude and longitude. */
export function formatCoordinates(lat: number, lng: number) {
  const part = (v: number, pos: string, neg: string) => `${Math.abs(v).toFixed(4)}° ${v >= 0 ? pos : neg}`;
  return `${part(lat, 'N', 'S')}, ${part(lng, 'E', 'W')}`;
}
