import { OptionTypeInterface } from './option-type.interface';

export interface OptionInterface {
  id: number;
  name: string;
  optionType: OptionTypeInterface;
}
