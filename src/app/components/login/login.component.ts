import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private globalService: GlobalService, private router: Router) { }

  onSubmit() {
    console.log(this.email, this.password);
    const userData = {
      email: this.email,
      password: this.password
    };

    this.globalService.login(userData).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.data.token);

          const role = this.globalService.getRoleFromToken();
          if (role){
            localStorage.setItem('role', role);
          }
          const name = response.data.employee.name;

          if (role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard'], { state: { name: name } });
          } else if (role === 'USER') {
            this.router.navigate([`/employee-detail/${response.data.employee._id}`], { state: { name: name } });
          } else {
            console.error('Unknown role');
            this.message = 'Unknown role. Access denied.';
          }
        } else {
          this.message = response.message;
        }
      },
      error => {
        if (error.status === 401) {
          console.error('Error: Invalid user');
          this.message = 'Invalid user';
        } else {
          console.error('Error:', error);
          this.message = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}
