import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Area, Prisma } from '@prisma/client';
import { IRepository } from '../../common/interfaces/repository.interface';

@Injectable()
export class AreaRepository
  implements
    IRepository<
      Area,
      Prisma.AreaWhereUniqueInput,
      Prisma.AreaWhereInput,
      Prisma.AreaOrderByWithRelationInput
    >
{
  private readonly prisma: PrismaService = PrismaService.getInstance();

  constructor() {}

  async create(data: Prisma.AreaCreateInput): Promise<Area> {
    return await this.prisma.area.create({
      data,
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.AreaWhereInput;
  }): Promise<Area[]> {
    const { skip, take, where } = params;
    const newParams = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
    };

    return await this.prisma.area.findMany(newParams);
  }
}
