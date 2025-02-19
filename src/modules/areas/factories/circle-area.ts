import { Area } from '@prisma/client';
import { Shape } from './shape.interface';

export class Circle implements Shape {
  private readonly EARTH_RADIUS_KM = 6371;

  constructor(private area: Area) {}

  contains(latitude: number, longitude: number): boolean {
    const distanceToCenter = this.calculateDistance(
      latitude,
      longitude,
      this.area.latitude,
      this.area.longitude,
    );

    return distanceToCenter <= this.area.radiusInKilometers;
  }

  private calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number,
  ): number {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;

    const deltaLatitude = toRadians(latitude2 - latitude1);
    const deltaLongitude = toRadians(longitude2 - longitude1);

    const a =
      Math.sin(deltaLatitude / 2) ** 2 +
      Math.cos(toRadians(latitude1)) *
        Math.cos(toRadians(latitude2)) *
        Math.sin(deltaLongitude / 2) ** 2;

    const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.EARTH_RADIUS_KM * centralAngle;
  }
}
