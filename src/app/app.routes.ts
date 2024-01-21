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
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { OpeningHoursListComponent } from './opening-hours-list/opening-hours-list.component';
import { UpdateOpeningHourComponent } from './update-opening-hour/update-opening-hour.component';
import { CreateOpeningHourComponent } from './create-opening-hour/create-opening-hour.component';
import { DeleteOpeningHourComponent } from './delete-opening-hour/delete-opening-hour.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nos-services', component: OurServicesComponent },
  { path: 'contactez-nous', component: ContactUsComponent },
  { path: 'contactez-nous/:subject', component: ContactUsComponent },
  { path: 'voiture/:id', component: VehicleDetailsComponent },
  { path: 'avis/list', component: FeedbackListComponent },
  { path: 'avis', component: CreateFeedbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'administration/vehicles', canActivate: [LocalStorageService], component: VehiclesListComponent },
  { path: 'administration/vehicle/create', canActivate: [LocalStorageService], component: CreateVehicleComponent },
  { path: 'administration/vehicle/update/:id', canActivate: [LocalStorageService], component: UpdateVehicleComponent },
  { path: 'administration/vehicle/delete/:id', canActivate: [LocalStorageService], component: DeleteVehicleComponent },
  { path: 'administration/vehicle/pictures/:id', canActivate: [LocalStorageService], component: HandleVehiclePicturesComponent },
  { path: 'administration/vehicle/:vehicleId/delete/picture/:pictureId', canActivate: [LocalStorageService], component: DeletePictureComponent },
  { path: 'administration/services', canActivate: [LocalStorageService], component: ServicesListComponent },
  { path: 'administration/service/create', canActivate: [LocalStorageService], component: CreateServiceComponent },
  { path: 'administration/service/update/:id', canActivate: [LocalStorageService], component: UpdateServiceComponent },
  { path: 'administration/service/delete/:id', canActivate: [LocalStorageService], component: DeleteServiceComponent },
  { path: 'administration/users', canActivate: [LocalStorageService], component: UsersListComponent },
  { path: 'administration/user/create', canActivate: [LocalStorageService], component: CreateUserComponent },
  { path: 'administration/user/update/:id', canActivate: [LocalStorageService], component: UpdateUserComponent },
  { path: 'administration/user/delete/:id', canActivate: [LocalStorageService], component: DeleteUserComponent },
  { path: 'administration/opening-hours', canActivate: [LocalStorageService], component: OpeningHoursListComponent },
  { path: 'administration/opening-hour/create', canActivate: [LocalStorageService], component: CreateOpeningHourComponent },
  { path: 'administration/opening-hour/update/:id', canActivate: [LocalStorageService], component: UpdateOpeningHourComponent },
  { path: 'administration/opening-hour/delete/:id', canActivate: [LocalStorageService], component: DeleteOpeningHourComponent },
];
