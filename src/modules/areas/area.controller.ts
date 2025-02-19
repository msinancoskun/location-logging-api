import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { QueryParams, Resp } from 'src/common/util';
import { Area, Prisma } from '@prisma/client';
import { Response } from 'express';

@ApiTags('areas')
@Controller('')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post('area')
  @ApiOperation({ summary: 'Create a new area' })
  @ApiBody({ type: CreateAreaDto })
  @ApiResponse({ status: 201, description: 'Area created successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() dto: CreateAreaDto, @Res() res: Response) {
    let result: Resp<Area>;
    try {
      const area = await this.areaService.create(dto);

      result = { success: true, message: 'Area created.', data: area };

      res.status(HttpStatus.CREATED).send(result);
    } catch (error: unknown) {
      console.error(error);

      result = { success: false, message: 'Operation failed.', data: null };

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
    }
  }

  @Get('areas')
  @ApiOperation({ summary: 'Get all areas' })
  @ApiQuery({
    name: 'params',
    type: 'object',
    schema: {
      type: 'object',
      properties: {
        skip: { type: 'number', default: 0 },
        take: { type: 'number', default: 10 },
      },
    },
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Areas listed successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAll(
    @Query()
    params: QueryParams<Prisma.AreaWhereInput>,
    @Res() res: Response,
  ): Promise<void> {
    let result: Resp<Area[]>;
    try {
      const areas = await this.areaService.getAll(params);

      result = { success: true, message: 'Areas listed.', data: areas };

      res.status(HttpStatus.OK).send(result);
    } catch (error: unknown) {
      console.error(error);

      result = { success: false, message: 'Operation failed.', data: null };

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
    }
  }
}
