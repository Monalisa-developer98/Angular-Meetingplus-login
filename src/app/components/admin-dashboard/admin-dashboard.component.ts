import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  employees: any[] = [];
  totalItems: number = 0;
  p: number = 1;
  itemsPerPage: number = 2;
  name: string = '';
  showingFrom: number = 1;
  showingTo: number = 2;
  searchKey: string = '';

  constructor(private employeeService: GlobalService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();   // NavigationExtras with the state property---- To pass data between components without displaying it in the URL
    if (navigation?.extras.state) {
      this.name = navigation.extras.state['name'];
    }
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const order = -1;
    const payload = {
      searchKey: this.searchKey
    };
    this.employeeService.getEmployees(order, this.itemsPerPage, this.p, payload).subscribe((response: any) => {
      this.employees = response.data.employeeData;
      this.totalItems = response.data.totalCount;

      this.showingFrom = (this.p - 1) * this.itemsPerPage + 1;
      this.showingTo = Math.min(this.p * this.itemsPerPage, this.totalItems);
    });
  }

  onSearch(): void {
    this.p = 1;
    this.loadEmployees();
  }

  get showingRange(): string {
    const start = (this.p - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.p * this.itemsPerPage, this.totalItems);
    return `Showing ${start} to ${end} of ${this.totalItems} entries`;
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/user-login']);
  }
}
