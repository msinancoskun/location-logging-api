import { Injectable } from '@nestjs/common';
import { AreaStrategy } from './area-strategy.interface';
import { Circle } from '../factories/circle-area';

@Injectable()
export class CircleAreaStrategy implements AreaStrategy {
  constructor(private circle: Circle) {}

  isInsideArea(latitude: number, longitude: number): boolean {
    return this.circle.contains(latitude, longitude);
  }
}
