import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthSignUpResponse {
    idToken:string;
    email:	string;
  refresh_token:	string;
  expiresIn:	string;
  localId:	string	;
  }

  export interface AuthSignInResponse {
    localId:string;
    email:string;
    displayName:string;
    idToken:string;
    registered:boolean;
    refreshToken:string;
    expiresIn:string;
}
@Injectable({
    providedIn:'root'
})
export class AuthManagementService{

    private tokenExpirationTimer:any;

    user = new BehaviorSubject<User>(null);
    constructor(private http:HttpClient, private router: Router){}

    
    signup(email:string,password:string){
        return this.http.post<AuthSignUpResponse>(
         environment.firebaseSignupUrl.trim()+environment.firebaseAPIKey.trim()
         ,{
             email:email,
             password:password,
             returnSecureToken:true
         }).pipe(
             catchError(this.handleError),
             tap(
                 resData=>{
                    this.handleAuthenticate(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                 }
             ));
         }
 

   
signin(email:string,password:string){
    return this.http.post<AuthSignInResponse>(
     environment.firebaseSigninUrl.trim()+environment.firebaseAPIKey.trim()
     ,{
         email:email,
         password:password,
         returnSecureToken:true
     }).pipe(
        catchError(this.handleError),
        tap(
            resData=>{
               this.handleAuthenticate(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
            }
        ));

}

logout(){
    this.user.next(null);
    localStorage.removeItem('userdata');
    this.router.navigate(['/auth']);

    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
}

private handleAuthenticate(email:string,userId:string,token:string,expiresIn : number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userdata',JSON.stringify(user));
}

autoLogin(){
    const userData:{
         email:string,
         id :string,
         _token:string,
         _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userdata'));
    if(!userData){
        return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDate);
    }
    this.user.next(null);
}

autoLogout(expirationDuration : number){
    this.tokenExpirationTimer = setTimeout(()=>{
        this.logout();
    }
        ,
        expirationDuration
    )
}

private handleError(errorRes: HttpErrorResponse){
    let errorMessage='An unknown error occured!'
    if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid.'
            break;
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already.';
            break;
        }
      return throwError(errorMessage);
    }
}