import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ageValidtor(minAge: number): ValidatorFn {


    return (control: AbstractControl): ValidationErrors | null =>  {
        if (!control.value) {
            return null;
        }

        const dob = new Date(control.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();


       return age >= minAge
        ? null
        : { underAge: true };
    };
}