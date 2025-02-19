import { Area } from '@prisma/client';
import { Circle } from './circle-area';
import { ShapeFactory } from './shape-factory.interface';
import { Shape } from './shape.interface';

export class AreaShapeFactory implements ShapeFactory {
  createShape(shapeType: string, area: Area): Shape {
    switch (shapeType) {
      case 'CIRCLE':
        return new Circle(area);
      default:
        throw new Error(`${shapeType} type not supported`);
    }
  }
}
