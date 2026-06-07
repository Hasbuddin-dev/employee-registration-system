import { Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"register",
        pathMatch:"full"
    },
    {
        path:"register",
        component:EmployeeRegistrationComponent
    },
    {
        path:"**",                               // wildcard route for invalid urls 
        redirectTo:"register"
    }
];
