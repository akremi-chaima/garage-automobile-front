export interface HandleVehicleInterface {
  id: number|null;
  circulationDate: string;
  price: number;
  fiscalPower: number;
  mileage: number;
  manufacturingYear: number;
  colorId: number;
  energyId: number;
  gearboxId: number;
  modelId: number;
  optionsIds: Array<number>
}
