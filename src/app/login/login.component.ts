import { ServiceService } from './../service/service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../global/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  env = environment;

  inValidCredentials = false;

  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private serviceService: ServiceService) {

    this.login = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  loginUser() {
    const email = this.login.value.email;
    const password = this.login.value.password;
    const userRequest = { userEmail: email, userPassword: password };
    this.serviceService.loginUser(userRequest).subscribe(data => {
      this.env.isLoggedOut = false;
      this.env.isLoggedIn = true;
      this.router.navigateByUrl("/home");
      localStorage.setItem('userEmail', email);
    },
    error => {
      this.inValidCredentials = true;
      this.errorMessage = "Invalid credentials";
    }
    )
  }

  get fval() {
    return this.login.controls;
  }

}
