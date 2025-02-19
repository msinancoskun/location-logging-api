import { Shape } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @IsNumber()
  @ApiProperty({ example: 40.984, description: 'Latitude of the area' })
  latitude: number;

  @IsNumber()
  @ApiProperty({ example: 29.025, description: 'Longitude of the area' })
  longitude: number;

  @IsNumber()
  @ApiProperty({ example: 5, description: 'Radius of the area in kilometers' })
  radiusInKilometers: number;

  shape: Shape;
}
