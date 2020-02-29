import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
    
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success', 
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: "Ahhhhhhhhhh!\nThis page doesn't exist",
    text: "You will be redirected on click",
    icon: 'info',
    confirmButtonText: 'Go to Home Page',
    allowEscapeKey:false,
    allowOutsideClick:false
  }).then((result) => {
    if (result.value) {
      this.router.navigate(['']);
    }
  });
}
  }