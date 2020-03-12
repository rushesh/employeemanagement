import { Component, OnInit } from '@angular/core';
import { AuthManagementService } from './services/auth-signup.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Management';

  constructor(private authService: AuthManagementService){}
  ngOnInit(){
  this.authService.autoLogin();
  }
}
