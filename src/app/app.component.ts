import { ServiceService } from './service/service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './global/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-dream-app';
  env = environment;

  constructor(private router: Router, private service: ServiceService){

  }

  logout(){
    this.env.isLoggedOut = true;
    this.env.isLoggedIn = false;
    this.service.logOut();
    this.router.navigateByUrl("/login");
  }
}
