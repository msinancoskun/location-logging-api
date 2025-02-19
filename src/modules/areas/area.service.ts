import { Injectable } from '@nestjs/common';
import { AreaRepository } from './area.repository';
import { Area, Prisma } from '@prisma/client';
import { QueryParams } from '../../common/util';
import { CreateAreaDto } from './dto/create-area.dto';
import { RedisService } from '../../database/redis/redis.service';
import { CACHED_AREA_KEYS } from '../../common/consts';

@Injectable()
export class AreaService {
  constructor(private areaRepository: AreaRepository) {}

  async create(data: CreateAreaDto) {
    await RedisService.getInstance().clear(CACHED_AREA_KEYS);

    return this.areaRepository.create(data);
  }

  async getAll(params: QueryParams<Prisma.AreaWhereInput>): Promise<Area[]> {
    const cacheKey = `areas:cached:${params.filter}:${params.skip}:${params.take}`;
    const cachedData: Area[] | null =
      await RedisService.getInstance().get(cacheKey);

    if (cachedData && cachedData.length > 0) {
      return cachedData;
    }

    const areas = await this.areaRepository.getAll(params);

    await RedisService.getInstance().set(cacheKey, areas, 300);
    await RedisService.getInstance().sadd(CACHED_AREA_KEYS, cacheKey);

    return areas;
  }
}
