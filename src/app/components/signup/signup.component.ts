import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthManagementService, AuthSignInResponse, AuthSignUpResponse } from '../../services/auth-signup.services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  constructor(private authService:AuthManagementService,private router : Router,private toastr: ToastrService){}
  isLoading = false;
  error:string=null;
  
  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs : Observable<any>;
    this.isLoading = true;
  
    authObs = this.authService.signup(email,password);
  
    authObs.subscribe(
      resData=>{
        console.log(resData);
        this.isLoading=false;
        this.toastr.success('You are auto logged in.','Sign Up Success');
        this.router.navigate(['./showemployees']); 
      },errMsg=>{
        console.error(errMsg);
        this.isLoading=false;
        this.error = errMsg;
        this.toastr.error(errMsg,'Sign Up Failed');
      }
    );
    form.reset();
  }
}
