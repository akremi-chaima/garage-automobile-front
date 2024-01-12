import { VehicleInterface } from './vehicle.interface';

export interface VehiclesPaginatorInterface {
  data: Array<VehicleInterface>;
  currentPage: number;
  totalItems: number;
}
