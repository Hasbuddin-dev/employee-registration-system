import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, take } from "rxjs";

export function emailExistValidator(service : any) : AsyncValidatorFn {

    return (control: AbstractControl) =>  {
        if (!control.value) {
            return null;
        }

        return service.employees$.pipe(
            take(1),
            map((employees:any[]):  ValidationErrors | null  => {
                const emailExist = employees.some(emp => 
                    emp?.email?.toLowerCase() === control.value?.toLowerCase()
                 );

                return emailExist ? {emailExist: true}: null;
                
            })
        );
    }

}