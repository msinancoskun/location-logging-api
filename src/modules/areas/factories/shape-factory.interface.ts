import { Area } from '@prisma/client';
import { Shape } from './shape.interface';

export interface ShapeFactory {
  createShape(shapeType: string, area: Area): Shape;
}
