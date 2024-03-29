import { ColorInterface } from './color.interface';
import { ModelInterface } from './model.interface';
import { EnergyInterface } from './energy.interface';
import { GearboxInterface } from './gearbox.interface';
import { OptionInterface } from './option.interface';
import { PictureInterface } from './picture.interface';

export interface VehicleInterface {
  id: number|null;
  circulationDate: string;
  price: number;
  fiscalPower: number;
  mileage: number;
  manufacturingYear: number;
  color: ColorInterface;
  energy: EnergyInterface;
  gearbox: GearboxInterface;
  model: ModelInterface;
  options: Array<OptionInterface>;
  pictures: Array<PictureInterface>;
}
