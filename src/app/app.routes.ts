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
import { DeletePictureComponent } from './delete-picture/delete-picture.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { DeleteServiceComponent } from './delete-service/delete-service.component';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vehicles', canActivate: [LocalStorageService], component: VehiclesListComponent },
  { path: 'vehicle/create', canActivate: [LocalStorageService], component: CreateVehicleComponent },
  { path: 'vehicle/update/:id', canActivate: [LocalStorageService], component: UpdateVehicleComponent },
  { path: 'vehicle/delete/:id', canActivate: [LocalStorageService], component: DeleteVehicleComponent },
  { path: 'vehicle/pictures/:id', canActivate: [LocalStorageService], component: HandleVehiclePicturesComponent },
  { path: 'vehicle/:vehicleId/delete/picture/:pictureId', canActivate: [LocalStorageService], component: DeletePictureComponent },
  { path: 'services', canActivate: [LocalStorageService], component: ServicesListComponent },
  { path: 'service/create', canActivate: [LocalStorageService], component: CreateServiceComponent },
  { path: 'service/update/:id', canActivate: [LocalStorageService], component: UpdateServiceComponent },
  { path: 'service/delete/:id', canActivate: [LocalStorageService], component: DeleteServiceComponent },
  { path: 'users', canActivate: [LocalStorageService], component: UsersListComponent },
  { path: 'user/create', canActivate: [LocalStorageService], component: CreateUserComponent },
  { path: 'user/update/:id', canActivate: [LocalStorageService], component: UpdateUserComponent },
];
