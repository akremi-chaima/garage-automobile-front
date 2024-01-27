import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../api-services/vehicle.service';
import { VehiclesPaginatorInterface } from '../../models/vehicles-paginator.interface';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConstsHelper } from '../../consts.helper';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ColorInterface } from '../../models/color.interface';
import { ModelInterface } from '../../models/model.interface';
import { GearboxInterface } from '../../models/gearbox.interface';
import { EnergyInterface } from '../../models/energy.interface';
import { ModelService } from '../../api-services/model.service';
import { ColorService } from '../../api-services/color.service';
import { GearboxService } from '../../api-services/gearbox.service';
import { EnergyService } from '../../api-services/energy.service';
import { BrandInterface } from '../../models/brand.interface';
import { BrandService } from '../../api-services/brand.service';
import { VehicleFilterInterface } from '../../models/vehicle-filter.interface';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit{

  environment = environment;
  vehiclesPaginator: VehiclesPaginatorInterface|null;
  vehicleFilter: VehicleFilterInterface|null;
  pages: Array<number>;
  currentPage: number;
  displaySearchForm: boolean;
  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  colors: Array<ColorInterface>;
  models: Array<ModelInterface>;
  filteredModels: Array<ModelInterface>;
  gearboxes: Array<GearboxInterface>;
  energies: Array<EnergyInterface>;
  brands: Array<BrandInterface>;
  errors: any = {
    minPrice: {
      pattern: `La valeur saisie n'est pas valide.`
    },
    maxPrice: {
      pattern: `La valeur saisie n'est pas valide.`
    },
    minMileage: {
      pattern: `La valeur saisie n'est pas valide.`
    },
    maxMileage: {
      pattern: `La valeur saisie n'est pas valide.`
    },
    fiscalPower: {
      pattern: `La valeur saisie n'est pas valide.`
    },
    minManufacturingYear: {
      pattern: `La valeur saisie n'est pas valide.`
    },
    maxManufacturingYear: {
      pattern: `La valeur saisie n'est pas valide.`
    },
  };

  constructor(
    private vehicleService: VehicleService,
    private brandService: BrandService,
    private modelService: ModelService,
    private colorService: ColorService,
    private gearboxService: GearboxService,
    private energyService: EnergyService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.vehiclesPaginator = null;
    this.vehicleFilter = null;
    this.displaySearchForm = false;
    this.formSubmitted = false;
    this.colors = [];
    this.models = [];
    this.gearboxes = [];
    this.energies = [];
    this.pages = [];
    this.filteredModels = [];
    this.currentPage = 1;
    this.getVehicles(this.currentPage);
    this.colorService.getList().subscribe(
      response => {
        this.colors = response;
      }
    );

    this.brandService.getList().subscribe(
      response => {
        this.brands = response;
      }
    );

    this.modelService.getList().subscribe(
      response => {
        this.models = response;
      }
    );

    this.gearboxService.getList().subscribe(
      response => {
        this.gearboxes = response;
      }
    );

    this.energyService.getList().subscribe(
      response => {
        this.energies = response;
      }
    );
    this.initForm();
  }

  getVehicles(pageNumber: number) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || this.pages.length == 0 || this.vehicleFilter) {
      this.currentPage = pageNumber;
      this.vehicleService.getList(this.currentPage, 10, this.vehicleFilter).subscribe(
        response => {
          this.vehiclesPaginator = response;
          this.pages = [];
          let pagesNumber = this.vehiclesPaginator.totalItems / 10;
          if (this.vehiclesPaginator.totalItems % 10 > 0) {
            pagesNumber++;
          }
          for (let i = 1; i <= pagesNumber; i++) {
            this.pages.push(i);
          }
        }, error => {
          if (error.status === 401) {
            // delete token from local storage and redirect to login page
            this.router.navigate(['administration/login']);
            localStorage.removeItem('token');
          } else {
            // Error to call API
            this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          }
        }
      );
    }
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('brandId', this.formBuilder.control('', []));
    this.form.addControl('modelId', this.formBuilder.control('', []));
    this.form.addControl('minPrice', this.formBuilder.control('', [Validators.pattern(ConstsHelper.pricePattern)]));
    this.form.addControl('maxPrice', this.formBuilder.control('', [Validators.pattern(ConstsHelper.pricePattern)]));
    this.form.addControl('minMileage', this.formBuilder.control('', [Validators.pattern(ConstsHelper.mileagePattern)]));
    this.form.addControl('maxMileage', this.formBuilder.control('', [Validators.pattern(ConstsHelper.mileagePattern)]));
    this.form.addControl('minManufacturingYear', this.formBuilder.control('', [Validators.pattern(ConstsHelper.manufacturingYearPattern)]));
    this.form.addControl('maxManufacturingYear', this.formBuilder.control('', [Validators.pattern(ConstsHelper.manufacturingYearPattern)]));
    this.form.addControl('fiscalPower', this.formBuilder.control('', [Validators.pattern(ConstsHelper.fiscalPowerPattern)]));
    this.form.addControl('colorId', this.formBuilder.control('', []));
    this.form.addControl('energyId', this.formBuilder.control('', []));
    this.form.addControl('gearboxId', this.formBuilder.control('', []));
    this.form.addControl('orderBy', this.formBuilder.control('', []));
  }

  searchFormVisibility(display: boolean) {
    this.displaySearchForm = display;
  }

  // load model by selected brand
  loadModels($event) {
    // reset filteredModels for each brand selected
    this.filteredModels = [];
    for (let model of this.models) {
      if (model.brand.id === parseInt($event.target.value)) {
        this.filteredModels.push(model);
      }
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  reset() {
    this.filteredModels = [];
    this.formSubmitted = false;
    this.vehicleFilter = null;
    this.searchFormVisibility(false);
    this.getVehicles(1);
    this.initForm();
  }

  search() {
    this.formSubmitted = true;
    this.vehicleFilter = null;
    if (this.form.valid) {
      this.vehicleFilter = {
        brandId: this.getFieldValue('brandId'),
        modelId: this.getFieldValue('modelId'),
        minPrice: this.getFieldValue('minPrice'),
        maxPrice: this.getFieldValue('maxPrice'),
        minMileage: this.getFieldValue('minMileage'),
        maxMileage: this.getFieldValue('maxMileage'),
        minManufacturingYear: this.getFieldValue('minManufacturingYear'),
        maxManufacturingYear: this.getFieldValue('maxManufacturingYear'),
        fiscalPower: this.getFieldValue('fiscalPower'),
        colorId: this.getFieldValue('colorId'),
        energyId: this.getFieldValue('energyId'),
        gearboxId: this.getFieldValue('gearboxId'),
        orderBy: this.getFieldValue('orderBy'),
      };
      this.getVehicles(1);
    }
  }

  private getFieldValue(field: string) {
    if (field !== 'orderBy' && this.form.get(field).value !== '') {
      return parseInt(this.form.get(field).value);
    } else if (field === 'orderBy' && this.form.get(field).value !== '') {
      return this.form.get(field).value;
    } else {
      return null;
    }
  }

  getError(formControlValues: string): string {
    let errorMsg = '';
    if (this.form.controls[formControlValues].invalid) {
      Object.keys(this.form.controls[formControlValues].errors).map(
        key => {
          errorMsg = this.errors[formControlValues][key];
        }
      );
    }
    return errorMsg;
  }
}
