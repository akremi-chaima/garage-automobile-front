import { Routes } from '@angular/router';
import { HomeComponent } from './visitor/home/home.component';
import { LoginComponent } from './administration/login/login.component';
import { LocalStorageService } from './api-services/local-storage.service';
import { VehiclesListComponent } from './administration/vehicles-list/vehicles-list.component';
import { ServicesListComponent } from './administration/services-list/services-list.component';
import { CreateVehicleComponent } from './administration/create-vehicle/create-vehicle.component';
import { UpdateVehicleComponent } from './administration/update-vehicle/update-vehicle.component';
import { DeleteVehicleComponent } from './administration/delete-vehicle/delete-vehicle.component';
import { HandleVehiclePicturesComponent } from './administration/handle-vehicle-pictures/handle-vehicle-pictures.component';
import { DeletePictureComponent } from './administration/delete-picture/delete-picture.component';
import { UpdateServiceComponent } from './administration/update-service/update-service.component';
import { CreateServiceComponent } from './administration/create-service/create-service.component';
import { DeleteServiceComponent } from './administration/delete-service/delete-service.component';
import { UsersListComponent } from './administration/users-list/users-list.component';
import { CreateUserComponent } from './administration/create-user/create-user.component';
import { UpdateUserComponent } from './administration/update-user/update-user.component';
import { DeleteUserComponent } from './administration/delete-user/delete-user.component';
import { OpeningHoursListComponent } from './administration/opening-hours-list/opening-hours-list.component';
import { UpdateOpeningHourComponent } from './administration/update-opening-hour/update-opening-hour.component';
import { CreateOpeningHourComponent } from './administration/create-opening-hour/create-opening-hour.component';
import { DeleteOpeningHourComponent } from './administration/delete-opening-hour/delete-opening-hour.component';
import { OurServicesComponent } from './visitor/our-services/our-services.component';
import { ContactUsComponent } from './visitor/contact-us/contact-us.component';
import { VehicleDetailsComponent } from './visitor/vehicle-details/vehicle-details.component';
import { FeedbackListComponent } from './visitor/feedback-list/feedback-list.component';
import { CreateFeedbackComponent } from './visitor/create-feedback/create-feedback.component';
import { HandleFeedbacksComponent } from './administration/handle-feedbacks/handle-feedbacks.component';

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
  { path: 'administration/feedbacks', canActivate: [LocalStorageService], component: HandleFeedbacksComponent },
];
