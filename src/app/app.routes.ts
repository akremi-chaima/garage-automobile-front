import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LocalStorageService } from './api-services/local-storage.service';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';
import { UpdateVehicleComponent } from './update-vehicle/update-vehicle.component';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { HandleVehiclePicturesComponent } from './handle-vehicle-pictures/handle-vehicle-pictures.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vehicles', canActivate: [LocalStorageService], component: VehiclesListComponent },
  { path: 'vehicle/create', canActivate: [LocalStorageService], component: CreateVehicleComponent },
  { path: 'vehicle/update/:id', canActivate: [LocalStorageService], component: UpdateVehicleComponent },
  { path: 'vehicle/delete/:id', canActivate: [LocalStorageService], component: DeleteVehicleComponent },
  { path: 'vehicle/pictures/:id', canActivate: [LocalStorageService], component: HandleVehiclePicturesComponent },
  { path: 'services', canActivate: [LocalStorageService], component: ServicesListComponent }
];
