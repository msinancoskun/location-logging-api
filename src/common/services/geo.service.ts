import { Injectable } from '@nestjs/common';
import { AreaService } from '../../modules/areas/area.service';
import { LogService } from '../../modules/logs/log.service';
import { Area, Location } from '@prisma/client';
import { AreaShapeFactory } from '../../modules/areas/factories/area-shape-factory';
import { AreaContext } from '../../modules/areas/strategies/area-context';
import { CircleAreaStrategy } from '../../modules/areas/strategies/circle-area-strategy';
import { Circle } from '../../modules/areas/factories/circle-area';
import { Shape } from 'src/modules/areas/factories/shape.interface';
import { AreaStrategy } from 'src/modules/areas/strategies/area-strategy.interface';

@Injectable()
export class GeoService {
  constructor(
    private readonly areaService: AreaService,
    private readonly logService: LogService,
    private readonly factory: AreaShapeFactory,
    private readonly context: AreaContext,
  ) {}

  async log(userId: string, location: Location): Promise<void> {
    const areas = await this.areaService.getAll({});

    for (const area of areas) {
      const shape = this.factory.createShape('CIRCLE', area);
      const strategy = this.getStrategy(shape, area);
      this.context.setStrategy(strategy);

      if (
        this.context.isUserInsideTheArea(location.latitude, location.longitude)
      ) {
        await this.logService.create({
          userId: userId,
          areaId: area.id,
          locationId: location.id,
        });
      }
    }
  }

  // TODO: Other shapes will be implemented later.
  private getStrategy(shape: Shape, area: Area): AreaStrategy {
    switch (shape) {
      default:
        return new CircleAreaStrategy(new Circle(area));
    }
  }
}
