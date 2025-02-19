import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { Location } from '@prisma/client';
import { CreateLocationDto } from './dto/create-location.dto';
import { GeoService } from '../../common/services/geo.service';
import { RedisService } from 'src/database/redis/redis.service';

@Injectable()
export class LocationService {
  constructor(
    private locationRepository: LocationRepository,
    private geoService: GeoService,
  ) {}

  async create(dto: CreateLocationDto) {
    const lastLoc = await this.getLastLocation(dto.userId);
    const loc = await this.locationRepository.create(dto);

    if (lastLoc && this.isSameLocation(lastLoc, loc)) {
      return loc;
    }

    await this.geoService.log(dto.userId, loc);
    await RedisService.getInstance().del(`user:${dto.userId}:lastLocation`);

    return loc;
  }

  private isSameLocation(lastLoc: Location, loc: Location): boolean {
    return (
      loc.latitude === lastLoc?.latitude && loc.longitude === lastLoc?.longitude
    );
  }

  private async getLastLocation(userId: string): Promise<Location | null> {
    const cacheKey = `user:${userId}:lastLocation`;
    const cachedLocation: Location | null =
      await RedisService.getInstance().get(cacheKey);

    if (cachedLocation) {
      return cachedLocation;
    }

    const lastLocation = await this.locationRepository.getLastLocation(userId);

    if (lastLocation) {
      await RedisService.getInstance().set(cacheKey, lastLocation, 300);
    }

    return lastLocation;
  }
}
