import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ageValidtor } from '../../custom-validators/age.validators';
import { passwordMatchValidator } from '../../custom-validators/password-match.validators';
import { RestrictInputDirective } from '../../custom-directives/restrict-input.directive';
import { EmployeeService } from '../../services/employee.service';
import { emailExistValidator } from '../../custom-validators/email-exist.validators';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RestrictInputDirective],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss'
})
export class EmployeeRegistrationComponent {

  title:string = "employee registration";
  subTitle:string = "Please fill the details below to complete your registration";

  todayDate = new Date().toISOString().split('T')[0];
  showPassword:boolean = false;
  showConfirmPassword: boolean = false;
  isSaving:boolean = false;
  showSnackbar:boolean = false;
  snackbarMessage = '';


  registrationForm!:FormGroup ;

  constructor(private employeeService: EmployeeService){

  }

  ngOnInit(){
    this.registrationForm = new FormGroup({
        fullName: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email], [emailExistValidator(this.employeeService)]),
        mob: new FormControl("", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
        dob: new FormControl("", [Validators.required, ageValidtor(18)]),
        password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
        confirmPassword: new FormControl("", [Validators.required]),
        city: new FormControl(""),
      },
      {
        validators: passwordMatchValidator()
      }
    );
  }

  get fullNameControl() {
    return this.registrationForm?.get('fullName');
  }

  get emailControl() {
    return this.registrationForm?.get('email');
  }

  get mobControl(){
    return this.registrationForm?.get('mob');
  }

  get dobControl(){
    return this.registrationForm?.get('dob');
  }

  get passwordControl(){
    return this.registrationForm?.get('password');
  }

  get confirmPasswordControl(){
    return this.registrationForm?.get('confirmPassword');
  }


  clearDob(): void {
    this.registrationForm.get('dob')?.reset();
  }

  showPasswordToggle(){
    this.showPassword = !this.showPassword;
  }

  showConfirmPasswordToggle(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  preventLeadingSpace(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    if (event.key === ' ' && input.value.length === 0) {
      event.preventDefault();
    }
  }

  trimControlValue(controlName: string): void {
    const control = this.registrationForm.get(controlName);

    if (control) {
      control.setValue(control.value?.trim() || '');
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }

  onReset(){
    this.registrationForm.reset();
    this.registrationForm.markAsPristine();
    this.registrationForm.markAsUntouched();
  }

  onSubmit() {

    if (this.registrationForm.invalid) {
      return;
    }

    this.isSaving = true;
    setTimeout(() => {
      this.employeeService.saveEmployee(this.registrationForm.value)
      this.openSnackbar('Employee registered successfully!');
      this.onReset();
      this.isSaving = false;
    }, 2000);
  }


  openSnackbar(message: string){

    this.showSnackbar = true;
    this.snackbarMessage = message;
    setTimeout(() => {
      this.showSnackbar = false;
    }, 3000);
  }
}
