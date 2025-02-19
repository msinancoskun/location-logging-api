import { AreaStrategy } from './area-strategy.interface';

export class AreaContext {
  private strategy: AreaStrategy;

  setStrategy(strategy: AreaStrategy) {
    this.strategy = strategy;
  }

  isUserInsideTheArea(latitude: number, longitude: number): boolean {
    return this.strategy.isInsideArea(latitude, longitude);
  }
}
