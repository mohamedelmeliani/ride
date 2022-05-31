import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

    showCode = false;
    email = "";
    code = "";
    showErrorEmail = false;
    textErrorEmail = "";
    textErrorCode = "";
    showErrorCode = false;
    showSpinner = false;

    constructor(private http: HttpClient, private service: AuthService) { }

    ngOnInit() {

    }

    emailSent() {
        if (this.email != ""&&this.isEmail(this.email)) {
            this.showSpinner = true;
            this.http.get(this.service.host + "/all/demandeConfirmation/" + this.email).subscribe(
                res => {
                    this.showCode = true;
                    this.showErrorEmail = false;
                    this.showSpinner = false;
                }, err => {
                    this.showErrorEmail = true;
                    this.textErrorEmail = "Veuillez verifier votre Email";
                    this.showSpinner = false;
                }
            )
        } else if (!this.isEmail(this.email)) {
            this.showErrorEmail = true;
            this.textErrorEmail = "Email invalid";
        } else {
            this.showErrorEmail = true;
            this.textErrorEmail = "Veuillez verifier votre Email";
        }
    }

    verifyCode() {
        if (this.email != "" && this.code != ""&&this.isEmail(this.email)&&this.code.length==6) {
            this.showSpinner = true;
            this.http.get(this.service.host + "/all/verifyConfirmation/" + this.email+"?code="+this.code).subscribe(
                res => {
                    this.showCode = true;
                    this.showErrorEmail = false;
                    this.showSpinner = false;
                }, err => {
                    this.showErrorEmail = true;
                    this.textErrorEmail = "Veuillez verifier votre Email ou votre code";
                    this.showSpinner = false;
                }
            )
        } 
        else if (this.code.length!=6) {
            this.showErrorCode = true;
            this.textErrorCode = "Code invalid";
        }
        else {
            this.showErrorEmail = true;
            this.textErrorEmail = "Veuillez verifier votre Email";
        }
    }

    isEmail(email) {
        var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return EmailRegex.test(email);
    }

}