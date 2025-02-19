import { IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  userId: string;

  @ApiProperty({ example: 40.9785, description: 'Latitude' })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: 29.0402, description: 'Longitude' })
  @IsLongitude()
  longitude: number;
}
