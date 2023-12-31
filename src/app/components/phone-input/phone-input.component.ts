import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent {
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  get control(): FormControl<any> {
    return this.formGroup.get(this.controlName) as FormControl<any>;
  }
  ngOnInit() {
    this.onPhoneFieldChange();
  }
  onPhoneFieldChange() {
    let v = this.control.value.replace(/[^0-9]/g, '');
    if (v[0] == '0') v = v.substring(1);
    else {
      v =
        v.length > 3
          ? v.slice(0, 3) +
            ' ' +
            (v.length > 6 ? v.slice(3, 6) + ' ' + v.slice(6, 10) : v.slice(3))
          : v;
      if (v.length > 0 && v.length < 12) {
        setTimeout(() => {
          this.control.setErrors({
            pattern: true,
          });
        });
      }
    }
    this.control.setValue(v);
  }
}
