import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OptionService } from '../../api-services/option.service';
import { ModelService } from '../../api-services/model.service';
import { ColorService } from '../../api-services/color.service';
import { GearboxService } from '../../api-services/gearbox.service';
import { EnergyService } from '../../api-services/energy.service';
import { ColorInterface } from '../../models/color.interface';
import { ModelInterface } from '../../models/model.interface';
import { GearboxInterface } from '../../models/gearbox.interface';
import { EnergyInterface } from '../../models/energy.interface';
import { OptionInterface } from '../../models/option.interface';
import { ConstsHelper } from '../../consts.helper';
import { VehicleService } from '../../api-services/vehicle.service';
import { HandleVehicleInterface } from '../../models/handle-vehicle.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleInterface } from '../../models/vehicle.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-vehicle',
  standalone: true,
    imports: [
      HeaderComponent,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
    ],
  templateUrl: './update-vehicle.component.html',
  styleUrl: './update-vehicle.component.css'
})
export class UpdateVehicleComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  colors: Array<ColorInterface>;
  models: Array<ModelInterface>;
  gearboxes: Array<GearboxInterface>;
  energies: Array<EnergyInterface>;
  options: Array<OptionInterface>;
  selectedOptions: Array<number>;
  vehicle: VehicleInterface|null;
  errors: any = {
    price: {
      required: `Ce champ est obligatoire.`,
      pattern: `La valeur saisie n'est pas valide.`
    },
    circulationDate: {
      required: `Ce champ est obligatoire.`,
    },
    mileage: {
      required: `Ce champ est obligatoire.`,
      pattern: `La valeur saisie n'est pas valide.`
    },
    fiscalPower: {
      required: `Ce champ est obligatoire.`,
      pattern: `La valeur saisie n'est pas valide.`
    },
    manufacturingYear: {
      required: `Ce champ est obligatoire.`,
      pattern: `La valeur saisie n'est pas valide.`
    },
    colorId: {
      required: `Ce champ est obligatoire.`,
    },
    modelId: {
      required: `Ce champ est obligatoire.`,
    },
    energyId: {
      required: `Ce champ est obligatoire.`,
    },
    gearboxId: {
      required: `Ce champ est obligatoire.`,
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private optionService: OptionService,
    private modelService: ModelService,
    private colorService: ColorService,
    private gearboxService: GearboxService,
    private energyService: EnergyService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.vehicle = null;
    this.formSubmitted = false;
    this.colors = [];
    this.models = [];
    this.gearboxes = [];
    this.energies = [];
    this.options = [];
    this.selectedOptions = [];

    this.colorService.getList().subscribe(
      response => {
        this.colors = response;
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

    this.optionService.getList().subscribe(
      response => {
        this.options = response;
      }
    );

    if (this.route.snapshot.paramMap.get('id')) {
      this.vehicleService.get(parseInt(this.route.snapshot.paramMap.get('id'), 10)).subscribe(
        response => {
          this.vehicle = response;
          for (let option of response.options) {
            this.selectedOptions.push(option.id);
          }
          this.initForm();
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
          this.cancel();
        }
      );
    } else {
      this.cancel();
    }
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('price', this.formBuilder.control(this.vehicle.price, [Validators.required, Validators.pattern(ConstsHelper.pricePattern)]));
    this.form.addControl('circulationDate', this.formBuilder.control(this.formattingDate(this.vehicle.circulationDate), [Validators.required]));
    this.form.addControl('mileage', this.formBuilder.control(this.vehicle.mileage, [Validators.required, Validators.pattern(ConstsHelper.mileagePattern)]));
    this.form.addControl('fiscalPower', this.formBuilder.control(this.vehicle.fiscalPower, [Validators.required, Validators.pattern(ConstsHelper.fiscalPowerPattern)]));
    this.form.addControl('manufacturingYear', this.formBuilder.control(this.vehicle.manufacturingYear, [Validators.required, Validators.pattern(ConstsHelper.manufacturingYearPattern)]));
    this.form.addControl('colorId', this.formBuilder.control(this.vehicle.color.id, [Validators.required]));
    this.form.addControl('modelId', this.formBuilder.control(this.vehicle.model.id, [Validators.required]));
    this.form.addControl('energyId', this.formBuilder.control(this.vehicle.energy.id, [Validators.required]));
    this.form.addControl('gearboxId', this.formBuilder.control(this.vehicle.gearbox.id, [Validators.required]));
  }

  updateSelectedOptions($event) {
    const value = parseInt($event.target.value, 10);
    if ($event.target.checked) {
      this.selectedOptions.push(value);
    } else {
      const optionIndex = this.selectedOptions.indexOf(value);
      this.selectedOptions.splice(optionIndex, 1);
    }
  }

  save() {
    this.formSubmitted = true;
    if (this.form.valid && this.selectedOptions.length > 0) {
      const vehicle: HandleVehicleInterface = {
        id: this.vehicle.id,
        circulationDate: this.form.get('circulationDate').value,
        price: this.form.get('price').value,
        fiscalPower: parseInt(this.form.get('fiscalPower').value, 10),
        mileage: parseInt(this.form.get('mileage').value, 10),
        manufacturingYear: parseInt(this.form.get('manufacturingYear').value, 10),
        colorId: parseInt(this.form.get('colorId').value, 10),
        energyId: parseInt(this.form.get('energyId').value, 10),
        gearboxId: parseInt(this.form.get('gearboxId').value, 10),
        modelId: parseInt(this.form.get('modelId').value, 10),
        optionsIds: this.selectedOptions,
      }
      this.vehicleService.update(vehicle).subscribe(
        response => {
          this.toastr.success('Le véhicule est enregistré avec succès.', null, {positionClass: 'toast-top-center'});
          this.cancel();
        }, error => {
          this.toastr.error(ConstsHelper.ERROR_OCCURRED_RETRY_MESSAGE, null, {positionClass: 'toast-top-center'});
        }
      );
    }
  }

  formattingDate(date: string) {
    const splitDate = date.split('/');
    return splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
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

  cancel() {
    this.router.navigate(['administration/vehicles']);
  }
}
