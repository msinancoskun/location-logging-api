import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import type { Resp } from '../../common/util';
import type { Location } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Location created successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(
    @Body() dto: CreateLocationDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result: Resp<Location>;

    try {
      const loc = await this.locationService.create({
        ...dto,
        userId: req.cookies.token as string,
      });

      result = {
        success: true,
        message: 'Location created.',
        data: loc,
      };

      res.status(HttpStatus.CREATED).send(result);
    } catch (err: unknown) {
      console.error(err);

      result = {
        success: false,
        message: 'Operation failed.',
        data: null,
      };

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
    }
  }
}
