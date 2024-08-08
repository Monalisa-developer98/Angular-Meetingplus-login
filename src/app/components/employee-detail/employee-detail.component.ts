import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any;
  error: string | null = null;
  name: string = '';

  constructor(private route: ActivatedRoute, private employeeService: GlobalService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.name = navigation.extras.state['name'];
    }
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(id).subscribe(
      data => {
        if (data) {
          this.employee = data;
          console.log(this.employee);
        } else {
          this.error = 'Employee data is not available';
        }
      },
      error => {
        this.error = 'Error fetching employee data';
        console.error('Error fetching employee data', error);
      }
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/user-login']);
  }

}
