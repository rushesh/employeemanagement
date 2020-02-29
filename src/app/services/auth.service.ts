import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authToken :any;
user:any;

  constructor(private http: HttpClient) { }

  logincheck(user){
    let emailid:string = user.emailid;
    let password: string = user.password;

    if(emailid.toLowerCase() == 'admin123@photosapp.org' && password == 'Admin@1234'){
      // this.storeUserData(user.emailid);
      return true;
  }
  else{
    return false;
  }
}
      onLogOutActivity(){
        // this.authToken=null;
        this.user=null;
        localStorage.clear();
      }
loggedin(){
  const emailid = localStorage.getItem('emailid');
  if(emailid){
    return true;
  }
  else{
    return false;
  }
}

// public jwtHelper: JwtHelperService = new JwtHelperService();
  registerUser(user){
      // console.log(user);
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(
      'http://localhost:3000/employees/register',
      user,
      {headers:headers , responseType : 'json'}
      );
      // .pipe(map((response: Response) => console.log(response.json())));
      
      // .subscribe( (data) => console.log(data),
      // (error) => console.log(error));
  }
  logincheckDB(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    
      return this.http.post(
        'http://localhost:3000/users/authenticate',
        user,
        {headers:headers , responseType : 'json'}
        );
    }


  getAllEmployees(){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
      return this.http.get(
        'http://localhost:3000/employees/allemployees');
  }

    deleteSelectedEmployee(emp){
        let headers = new HttpHeaders();
        headers.append('Content-Type','application/json');
        // console.log("Deleting emp ",emp);
        return this.http.delete('http://localhost:3000/employees/deleteEmployee/'+emp._id);
    }
    }

