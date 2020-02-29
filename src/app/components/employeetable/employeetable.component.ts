import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'angular-alert-module';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { first, min } from 'rxjs/operators';



@Component({
  selector: 'app-employeetable',
  templateUrl: './employeetable.component.html',
  styleUrls: ['./employeetable.component.css']
})
export class EmployeetableComponent implements OnInit {
  constructor(private router: Router, private Auth: AuthService,private alerts: AlertsService){
  
  }
  employeeList:any = [];

  ngOnInit() {

      this.Auth.getAllEmployees().subscribe(
        (data :Response)=>{
          // console.log(data);
          this.employeeList = (data);
          // console.log(this.employeeList);
          this.employeeList.forEach(element => {
            element.doj = new Date(element.doj)
            console.log(typeof(element.doj),element.doj)
          });
        }
      );
      
  }
  deleteEmp(emp){
    
    let empName = emp.name;
    
    Swal.fire({
      title: `Are you sure?\nYou won't be able to revert this!`,
      text: `Employee Name : ${empName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        let emp_del = {
          _id : emp._id.toString()
        }
        this.Auth.deleteSelectedEmployee(emp_del).pipe(first()).subscribe(
          (data : Response)=>{
            if(data.statusText=='success'){
              
        this.Auth.getAllEmployees().subscribe(
          (data :Response)=>{
            // console.log(data);
            this.employeeList = (data);
            // console.log(this.employeeList);
          }
        );
              this.alerts.setMessage('Employee Deleted Successfully!','success');

          }
          else{
            this.alerts.setMessage('Deletion Failed','error');
          }
        }
        );
        
      }
      
    })
}
}