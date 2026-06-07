import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  private readonly STORAGE_KEY = 'employees';

  private employeesSubject = new BehaviorSubject<any>(this.getEmployeesFromStorage()); // [] default value
  employees$ = this.employeesSubject.asObservable();

  private getEmployeesFromStorage() {
    return  JSON.parse( localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  saveEmployee(employee:any){
    const existingEmployee = this.employeesSubject.value;
    const updatedEmployees = [...existingEmployee, employee];

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(updatedEmployees)
    );

    this.employeesSubject.next(updatedEmployees);

  }

}
