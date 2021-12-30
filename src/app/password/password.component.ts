import { Otp } from './../global/Otp';
import { ServiceService } from './../service/service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

password: FormGroup;
errorMessage='';
inValidCredentials=false;
otpReceived = false;
otpValue: string;
otpMatch = true;
// otp: Otp = new Otp;

  constructor(private formBuilder: FormBuilder, private router:Router, private service:ServiceService) { 
    this.password = this.formBuilder.group({
      mail:['',[Validators.required,Validators.email]],
      otp:[]
    })
  }

  // ngOnInit(): void {
  //   this.password = this.formBuilder.group({
  //     otp: ['',Validators.required]
  //   })
  // }

  ngOnInit(): void {
    
  }

  forgotPassword() {
   const userEmail = this.password.value.mail;
    this.service.sendEmail(userEmail).subscribe(data => {
      this.otpReceived = true;
      this.otpValue = data;
    },
    error => {
      this.inValidCredentials = true;
      this.errorMessage = "Invalid email id";
    })
  }

  get fval(){
    return this.password.controls;
  }

  verifyOtp() {
    const otpVal = this.password.value.otp;
    if(otpVal==this.otpValue){
      this.otpMatch = true;
      this.router.navigateByUrl("/reset-password");
    }else{
      this.otpMatch = false;
    }
  }

}
