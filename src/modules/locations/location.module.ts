import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';
import { AreaService } from '../areas/area.service';
import { AreaRepository } from '../areas/area.repository';
import { GeoService } from '../../common/services/geo.service';
import { LogService } from '../logs/log.service';
import { LogRepository } from '../logs/log.repository';
import { AreaShapeFactory } from 'src/modules/areas/factories/area-shape-factory';
import { AreaContext } from 'src/modules/areas/strategies/area-context';

@Module({
  controllers: [LocationController],
  providers: [
    LocationService,
    LogService,
    LogRepository,
    AreaRepository,
    AreaService,
    LocationRepository,
    GeoService,
    AreaShapeFactory,
    AreaContext,
  ],
})
export class LocationModule {}
