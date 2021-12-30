import { ServiceService } from './../service/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;

  mgs = false;

  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      qualification: ['', Validators.required],
      percentage: ['', Validators.required],
      mobile: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.ConfirmedValidator('password','confirmPassword')
    });
  }

  postData() {
    const uName = this.register.value.name;
    const uEmail = this.register.value.email;
    const uQualification = this.register.value.qualification;
    const uPercentage = this.register.value.percentage;
    const uMobile = this.register.value.mobile;
    const uLocation = this.register.value.location;
    const uPassword = this.register.value.password;
    const confirmUPassword = this.register.value.confirmPassword;
    const userRequest = { userEmail: uEmail, userName: uName, userLocation: uLocation, userQualification: uQualification, userPercentage: uPercentage, userMobile: uMobile, userPassword: uPassword,confirmPassword: confirmUPassword };
    this.serviceService.postEmployee(userRequest).subscribe(data => {
      this.mgs = true;
      this.router.navigateByUrl('/login');
    });

    this.resetForm();
  }

  get fval() {
    return this.register.controls;
  }

  resetForm() {
    this.register.reset();
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
