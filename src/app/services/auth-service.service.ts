import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { profile } from 'src/assets/classes/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  // public host = "https://easy-ride-dev.herokuapp.com";
  public host = "http://localhost:8080";
  public isAuthenticated: boolean;
  public tokens: any;
  public access_token: string;
  public refresh_token: string;
  public profile;

  public tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getAccess_token() {
    this.refresh_token = localStorage.getItem("refresh_token");
    this.access_token = localStorage.getItem("access_token");
    if (this.refresh_token == null || this.tokenExpired(this.refresh_token)) {
      this.isAuthenticated = false;
      localStorage.clear();
      this.profile = new profile;
      this.router.navigateByUrl("/");
    } else {
      if (!this.tokenExpired(this.access_token)) {
        this.access_token = localStorage.getItem("access_token");
      }
      else {
        if (!this.tokenExpired(this.refresh_token)) {
          this.http.get(this.host + "/refreshToken", { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.refresh_token }) }).subscribe(
            data => {
              localStorage.setItem("access_token", data["access_token"]);
            }
          )
        }
      }
    }
  }

  sendGetProfileRequest() {
    this.getAccess_token();
    return this.http.get(this.host + "/user/profile", { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }) })
      .
      pipe(
        map((resp: any = []) => {
          return resp;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  getProfile() {
    this.sendGetProfileRequest().subscribe(data => {
      this.profile.id = data["id"];
      this.profile.nom = data["nom"];
      this.profile.email = data["email"];
      this.profile.tel = data["tel"];
      this.profile.numPermis = data["numPermis"];
      this.profile.catPermis = data["catPermis"];
      this.profile.dateNaissance = data["date_naissance"];
      this.profile.photoId = data["photoProfile"];
    });
  }

  Logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigateByUrl("/");
  }


  get(url: string) {
    this.getAccess_token();
    return this.http.get(this.host + url, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }) })
      .
      pipe(
        map((resp: any = []) => {
          return resp;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }


  post(url: string, body: any) {
    this.getAccess_token();
    return this.http.post(this.host + url, body, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }) })
      .
      pipe(
        map((resp: any = []) => {
          return resp;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }


  put(url: string, body: any) {
    this.getAccess_token();
    return this.http.put(this.host + url, body, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }) })
      .
      pipe(
        map((resp: any = []) => {
          return resp;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  delete(url: string) {
    this.getAccess_token();
    return this.http.delete(this.host + url, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("access_token") }) })
      .
      pipe(
        map((resp: any = []) => {
          return resp;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

}
