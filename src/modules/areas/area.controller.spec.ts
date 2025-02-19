import { Test, TestingModule } from '@nestjs/testing';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { Response } from 'express';
import { Area, Prisma } from '@prisma/client';
import { QueryParams } from 'src/common/util';
import * as casual from 'casual';

describe('AreaController', () => {
  let controller: AreaController;
  let service: AreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaController],
      providers: [
        {
          provide: AreaService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AreaController>(AreaController);
    service = module.get<AreaService>(AreaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should get all areas', async () => {
      const params: QueryParams<Prisma.AreaWhereInput> = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const areas: Area[] = [
        {
          id: casual.uuid,
          shape: 'CIRCLE',
          radiusInKilometers: Number(casual.integer(1, 100)),
          latitude: Number(casual.latitude),
          longitude: Number(casual.longitude),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(areas);

      await controller.getAll(params, res);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getAll).toHaveBeenCalledWith(params);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: 'Areas listed.',
        data: areas,
      });
    });

    it('should handle errors', async () => {
      const params: QueryParams<Prisma.AreaWhereInput> = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest.spyOn(service, 'getAll').mockRejectedValue(new Error('Error'));

      await controller.getAll(params, res);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: 'Operation failed.',
        data: null,
      });
    });
  });
});
