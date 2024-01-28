import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { VehicleInterface } from '../../models/vehicle.interface';
import { VehicleService } from '../../api-services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { OptionTypeInterface } from '../../models/option-type.interface';
import { OptionInterface } from '../../models/option.interface';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent implements OnInit {

  vehicle: VehicleInterface|null;
  optionTypes: Array<OptionTypeInterface>;
  environment = environment;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.vehicle = null;
    this.optionTypes = [];
    if (this.route.snapshot.paramMap.get('id')) {
      this.vehicleService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
        response => {
          this.vehicle = response;
          this.fillOptionTypes();
        }, error => {
          this.router.navigate(['']);
        }
      );
    } else {
      this.router.navigate(['']);
    }
  }

  getOptionsByOptionType(optionTypeId: number) {
    const options: Array<OptionInterface> = [];
    for (let option of this.vehicle.options) {
      if (option.optionType.id == optionTypeId) {
        options.push(option);
      }
    }
    return options;
  }

  contactUs() {
    this.router.navigate(['contactez-nous/[' + this.vehicle.id + '] - ' + this.vehicle.model.brand.name + ' - ' + this.vehicle.model.name]);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private fillOptionTypes() {
    for (let option of this.vehicle.options) {
      // check if option type is in the array
      const optionTypeIndex = this.optionTypes.findIndex((obj) => obj.id == option.optionType.id);
      if (optionTypeIndex == -1) {
        // add option type in array
        this.optionTypes.push(option.optionType);
      }
    }
  }
}
