import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { AreaRepository } from './area.repository';

@Module({
  controllers: [AreaController],
  providers: [AreaService, AreaRepository],
})
export class AreaModule {}
