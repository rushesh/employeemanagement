import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import { AuthManagementService } from 'src/app/services/auth-signup.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthManagementService) { }

  private userSub : Subscription;
  isAuthnticated = false;

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      user=>{
        this.isAuthnticated = !!user;
    console.log(this.isAuthnticated);
      }
    );
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}
