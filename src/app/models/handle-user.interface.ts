export interface HandleUserInterface {
  id: number|null;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  password: string|null;
  isActive: boolean;
}
