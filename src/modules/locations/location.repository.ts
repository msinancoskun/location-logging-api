import { Injectable } from '@nestjs/common';
import { Location, Prisma } from '@prisma/client';
import { IRepository } from '../../common/interfaces/repository.interface';
import { PrismaService } from '../../database/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationRepository
  implements
    IRepository<
      Location,
      Prisma.LocationWhereUniqueInput,
      Prisma.LocationWhereInput,
      Prisma.LocationOrderByWithRelationInput
    >
{
  private readonly prisma: PrismaService = PrismaService.getInstance();
  constructor() {}

  async create(data: CreateLocationDto): Promise<Location> {
    return this.prisma.location.create({
      data,
    });
  }

  async getLastLocation(userId: string): Promise<Location | null> {
    return this.prisma.location.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string): Promise<Location | null> {
    return await this.prisma.location.findFirst({
      where: { id },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LocationWhereUniqueInput;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput;
  }): Promise<Location[]> {
    return this.prisma.location.findMany(params);
  }
}
