import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../service/service.service';
import { RegisterComponent } from './../register/register.component';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit {

  resetPassword: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ServiceService) { 
    this.resetPassword = this.formBuilder.group({
      password1: ['',Validators.required],
      password2: ['',Validators.required]
    },{
      validator: this.ConfirmedValidator('password1','password2')
    });
  }

  ngOnInit(): void {
  }

  changePassword() {

  }

  get fval() {
    return this.resetPassword.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingContol = formGroup.controls[matchingControlName];
      if(matchingContol.errors && !matchingContol.errors.ConfirmedValidator){
        return;
      }
      if(control.value!==matchingContol.value){
        matchingContol.setErrors({ConfirmedValidator: true});
      }else{
        matchingContol.setErrors(null);
      }
    }
  }

}
