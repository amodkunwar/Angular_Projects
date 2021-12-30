import { Otp } from './../global/Otp';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../global/User';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  loginStatus = false;

  postEmployee(userRequest: any) {
    return this.httpClient.post("http://localhost:8081/user/register", userRequest);
  }

  loginUser(userRequest: any) {
    this.loginStatus = true;
    return this.httpClient.post("http://localhost:8081/user/login", userRequest);
  }

  isLoggedIn() {
    return this.loginStatus;
  }

  logOut() {
    this.loginStatus = false;
  }

  getUser(userEmail: string) {
    return this.httpClient.get<User>("http://localhost:8081/user/" + userEmail);
  }

  sendEmail(userEmail: any) {
    return this.httpClient.get("http://localhost:8083/send/" + userEmail, { responseType: 'text' });
  }

}
