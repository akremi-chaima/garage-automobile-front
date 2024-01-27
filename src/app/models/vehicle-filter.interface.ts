export interface VehicleFilterInterface {
  brandId: number;
  modelId: number;
  minPrice: number;
  maxPrice: number;
  minMileage: number;
  maxMileage: number;
  minManufacturingYear: number;
  maxManufacturingYear: number;
  fiscalPower: number;
  colorId: number;
  energyId: number;
  gearboxId: number;
  orderBy: string;
}
