import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  
  empName: string = '';
  empEmail: string = '';
  empPassword: string = '';
  empDesign: string = '';
  empDepart: string = '';

  constructor(private employeeService: GlobalService, private router: Router) {}

  onSubmit(): void {
    const userData = {
      name: this.empName,
      email: this.empEmail,
      password: this.empPassword,
      designation: this.empDesign,
      department: this.empDepart
    };

    this.employeeService.addUsers(userData).subscribe({
      next: (response) => {
        console.log('Employee added successfully', response);
        this.clearFormFields();
      },
      error: (error) => {
        console.error('Error adding employee', error);
      }
    });
  }

  clearFormFields(): void {
    this.empName = '';
    this.empEmail = '';
    this.empPassword = '';
    this.empDesign = '';
    this.empDepart = '';
  }
}
