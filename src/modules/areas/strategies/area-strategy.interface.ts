export interface AreaStrategy {
  isInsideArea(latitude: number, longitude: number): boolean;
}
