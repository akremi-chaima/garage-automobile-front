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
import { ConstsHelper } from './consts.helper';
import { AddFeedbackComponent } from './administration/add-feedback/add-feedback.component';
import { UpdatePasswordComponent } from './administration/update-password/update-password.component';
import { ResetPasswordComponent } from './administration/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nos-services', component: OurServicesComponent },
  { path: 'contactez-nous', component: ContactUsComponent },
  { path: 'contactez-nous/:subject', component: ContactUsComponent },
  { path: 'voiture/:id', component: VehicleDetailsComponent },
  { path: 'avis/list', component: FeedbackListComponent },
  { path: 'avis', component: CreateFeedbackComponent },
  { path: 'administration/login', component: LoginComponent },
  { path: 'administration/vehicles', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: VehiclesListComponent },
  { path: 'administration/vehicle/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: CreateVehicleComponent },
  { path: 'administration/vehicle/update/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdateVehicleComponent },
  { path: 'administration/vehicle/delete/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeleteVehicleComponent },
  { path: 'administration/vehicle/pictures/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: HandleVehiclePicturesComponent },
  { path: 'administration/vehicle/:vehicleId/delete/picture/:pictureId', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeletePictureComponent },
  { path: 'administration/services', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: ServicesListComponent },
  { path: 'administration/service/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: CreateServiceComponent },
  { path: 'administration/service/update/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdateServiceComponent },
  { path: 'administration/service/delete/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeleteServiceComponent },
  { path: 'administration/users', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: UsersListComponent },
  { path: 'administration/user/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: CreateUserComponent },
  { path: 'administration/user/update/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdateUserComponent },
  { path: 'administration/user/delete/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeleteUserComponent },
  { path: 'administration/opening-hours', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: OpeningHoursListComponent },
  { path: 'administration/opening-hour/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: CreateOpeningHourComponent },
  { path: 'administration/opening-hour/update/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdateOpeningHourComponent },
  { path: 'administration/opening-hour/delete/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeleteOpeningHourComponent },
  { path: 'administration/feedbacks', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: HandleFeedbacksComponent },
  { path: 'administration/feedback/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: AddFeedbackComponent },
  { path: 'administration/update/password', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdatePasswordComponent },
  { path: 'administration/reset/password', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_EMPLOYEE, ConstsHelper.ROLE_ADMINISTRATOR] }, component: ResetPasswordComponent },
];
