import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `<h1>Unauthorized</h1><p>You do not have permission to view this page.</p>`,
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {}