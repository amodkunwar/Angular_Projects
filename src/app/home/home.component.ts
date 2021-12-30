import { Router } from '@angular/router';
import { ServiceService } from './../service/service.service';
import { environment } from './../global/environment';
import { Component, OnInit } from '@angular/core';
import { User } from '../global/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  env = environment;
  status = false;

  user: User = new User;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  getProfile() {
    const email = localStorage.getItem('userEmail');
    this.service.getUser(email).subscribe(data => {
      this.user = data;
      this.status = true;
    },
    error => {

    });

  }

  logout() {
    this.env.isLoggedOut = true;
    this.env.isLoggedIn = false;
    this.service.logOut();
    this.router.navigateByUrl("/login");
  }

}
