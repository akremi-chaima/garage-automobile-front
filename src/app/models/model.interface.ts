import { BrandInterface } from './brand.interface';

export interface ModelInterface {
  id: number;
  name: string;
  brand: BrandInterface;
}
