import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthManagementService } from '../../services/auth-signup.services';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router:Router, private authService:AuthManagementService){}

    canActivate(route : ActivatedRouteSnapshot, router: RouterStateSnapshot
        ): boolean | Promise<boolean|UrlTree> | Observable<boolean|UrlTree> | UrlTree{
    
            return  this.authService.user.pipe(
                take(1),
                map(
                    user=> {
                        const isAuth = !!user; 
                        // console.log(isAuth, !!user);
                        if(isAuth){
                            return true;
                        }
                        return this.router.createUrlTree(['/auth']);
                    }
                )
            )
    }
}