import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './mustmatch';
import { first, min } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  };
  registerForm: FormGroup;
  submitted = false;
  minDate: Date;
    
  
  constructor(public datepipe: DatePipe,private modalService: BsModalService,private router: Router,private formBuilder: FormBuilder, private Auth: AuthService) { }
  
  ngOnInit() {

    this.minDate = new Date();
    
    this.minDate.setDate(this.minDate.getDate());

    this.registerForm = this.formBuilder.group({
          department: ['', Validators.required],
          doj: ['', Validators.required],
          name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          email: ['', [Validators.required, Validators.email]],
          employeeid: ['', [Validators.required, Validators.pattern('[0-9]+'),Validators.minLength(6)]],
          // password: ['', [Validators.required, Validators.minLength(6)]],
          // confirmPassword: ['', Validators.required,, Validators.minLength(6)],
          acceptTerms: [false, Validators.requiredTrue]
      }
      // , {
      //     validator: MustMatch('password', 'confirmPassword')
      // }
      );
      
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    
      this.submitted = true;
     if (this.registerForm.invalid) {
          return;
      }
  else{
    this.modalRef.hide();
    let dojNew = this.registerForm.value.doj;

        dojNew = moment(dojNew).format("DD-MM-YYYY");

        let user_det = new Object ({
          department: this.registerForm.value.department,
          doj: this.registerForm.value.doj,
          name:this.registerForm.value.name,
          email:this.registerForm.value.email,
          employeeid: this.registerForm.value.employeeid,
          // password: this.registerForm.value.password
        });
        
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      this.Auth.registerUser(user_det).pipe(first()).subscribe(
          (data :Response) => {
            if(data.status){
              this.onReset();
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success', 
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Registered Successfully",
                text: "Click to All Employees",
                icon: 'success',
                confirmButtonText: 'Go to All Employees',
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['./showemployees']);
                  }
              });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Could not Register',
              text: 'Something went wrong!',
              footer: 'Employee-Manager@2020'
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Could not Register',
            text: 'Something went wrong!',
            footer: 'Employee-Manager@2020'
          });
        });
      }
    }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
}
