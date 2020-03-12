import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { EmployeetableComponent } from '../app/components/employeetable/employeetable.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { MiddlewareComponentComponent } from './components/middleware-component/middleware-component.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path:'',component:MiddlewareComponentComponent},
  {path:'create',component: HomeComponent},
  
  {path:'auth',component: AuthComponent},
  
  {path:'signup',component: SignupComponent},
  {path:'showemployees',component:EmployeetableComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'aboutus',component:AboutusComponent},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
