import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthManagementService, AuthSignInResponse } from '../../services/auth-signup.services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  constructor(private authService:AuthManagementService,private router : Router,private toastr: ToastrService){}
  isLoading = false;
  error:string=null;

  ngOnInit(){
    
  }
  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs : Observable<any>;
    this.isLoading = true;
  
    authObs = this.authService.signin(email,password);
    authObs.subscribe(
      resData=>{
        console.log(resData);
        
        this.toastr.success('Welcome', 'Login Success');
        
        this.isLoading=false;
        this.router.navigate(['./showemployees']); 
      },errMsg=>{
        console.error(errMsg);
        this.isLoading=false;
        this.error = errMsg;
        this.toastr.error(errMsg,'Error');
      }
    );
    form.reset();
  }
}
