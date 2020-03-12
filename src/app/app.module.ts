import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './components/home/home.component';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AlertsModule } from 'angular-alert-module';
import { EmployeetableComponent } from './components/employeetable/employeetable.component';
import { NotifierModule } from "angular-notifier";

import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { PagenotfoundComponent } from '../app/components/pagenotfound/pagenotfound.component';
import { ContactusComponent } from '../app/components/contactus/contactus.component';
import { AboutusComponent } from '../app/components/aboutus/aboutus.component';
import { MiddlewareComponentComponent } from './components/middleware-component/middleware-component.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeedetailsComponent,
    EmployeetableComponent,
    AboutusComponent,
    NavbarComponent,
    PagenotfoundComponent,
    ContactusComponent,
    MiddlewareComponentComponent,
    AuthComponent,
    SignupComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    NotifierModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AlertsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressBar: true
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
