import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { registraton } from 'src/assets/classes/registration';
declare var $: any;

@Component({
  selector: 'app-navbar-style-one',
  templateUrl: './navbar-style-one.component.html',
  styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {

  constructor(public authservice: AuthService,
    private router: Router, private http: HttpClient) { }

  username: string = "";
  password: string = "";
  showAlert = false;
  showSpinner = false;
  badRequest=false;

  confirmpass = "";


  registration = new registraton();

  ngOnInit(): void {
    this.confirmpass = "";
  }

  Authenticate() {
    this.showAlert = false;
    this.showSpinner = true;
    let body = new URLSearchParams();
    body.set('username', this.username);
    body.set('password', this.password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http
      .post(this.authservice.host + "/login", body.toString(), options)
      .subscribe(response => {
        document.getElementById('close').click();
        this.authservice.tokens = response;
        localStorage.clear();
        localStorage.setItem("refresh_token", this.authservice.tokens.refresh_token);
        localStorage.setItem("access_token", this.authservice.tokens.access_token);
        this.authservice.isAuthenticated = true;
        this.showSpinner = false;
      }, err => {
        this.authservice.isAuthenticated = false;
        this.showSpinner = false;
        this.showAlert = true;
      });
  }

  register() {
    const values = Object.keys(this.registration).map(key => this.registration[key]);
    this.showAlert = false;
    this.showSpinner=true;
    values.forEach(element => {
      if (element === "") {
        this.showAlert = true;
        this.showSpinner = false;
      }
    });
    if (!this.isEmail(values[3]) ||!this.isPhone(values[2])) {
      this.showAlert = true;
      this.showSpinner = false;
    }
    if (this.showAlert == false) {
      this.showAlert = false;
      this.showSpinner = true;
      this.http
        .post(this.authservice.host + "/all/utilisateur", this.registration,{observe: 'response'})
        .subscribe(response => {
          this.username = this.registration.email;
          this.password = this.registration.password;
          document.getElementById('close').click();
          this.Authenticate();
        }, err => {
          if(err.status == 400){
            this.badRequest = true;
         }else{
           this.showAlert = true;
         }
          this.showSpinner = false;
        });
    }
  }


  isEmail(email) {
    var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return EmailRegex.test(email);
  }

  isPhone(tel) {
    var PhoneRegex = /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/;
    return PhoneRegex.test(tel);
  }
}
