import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { car } from 'src/assets/classes/car';

declare var $: any;

@Component({
    selector: 'app-dashboard-my-profile',
    templateUrl: './dashboard-my-profile.component.html',
    styleUrls: ['./dashboard-my-profile.component.scss']
})
export class DashboardMyProfileComponent implements OnInit {

    constructor(public authservice: AuthService, private router: Router, public httpC: HttpClient) { }

    public profile: any;
    public cars: any = [];
    public car: any;
    public profilePic: any;
    selectedFile: File;

    showSpinner = true;
    showCarsSpinner = true;
    showCarSpinner = true;
    isNewCar = false;
    showAlert = false;
    showModificaionAlert = false;
    badRequest = false;
    isProfile = false;
    successModify = false;

    confiramtion = 0;

    oldpass = "";
    newpass = "";
    confirmpass = "";
    error = "";

    ngOnInit(): void {
        this.oldpass = "";
        this.newpass = "";
        this.confirmpass = "";
        this.cars = undefined;
        this.authservice.getAccess_token();
        this.authservice.get("/user/profile").subscribe(data => {
            this.profile = data;
            if (this.profile.photoProfile != null) {
                this.profilePic = this.authservice.host + "/download/" + this.profile.photoProfile["id"];
            } else {
                this.profilePic = "assets/img/user1.jpg";
            }
            this.showSpinner = false;
            this.isProfile = true;
            console.log(this.profile)
        });
        this.authservice.get("/user/findCarsOfLoggedUser").subscribe(data => { this.cars = data; this.showCarsSpinner = false; })
    }

    modifyLogged(data) {
        this.error = "";
        this.showSpinner = true;
        this.showModificaionAlert = false;
        this.successModify = false;
        this.badRequest = false;
        const values = Object.keys(data).map(key => data[key]);
        values.forEach(element => {
            if (element === "") {
                this.showModificaionAlert = true;
                this.showSpinner = false;
            }
        });
        if (!this.isEmail(values[1])) {
            this.error = "Email invalide !";
            this.showModificaionAlert = true;
            this.showSpinner = false;
        }
        if (!this.isPhone(values[2])) {
            this.error = "Telephone invalide !"
            this.showModificaionAlert = true;
            this.showSpinner = false;
        }
        if (this.showModificaionAlert == false) {
            this.showSpinner = true;
            this.isProfile = false;
            this.authservice.put("/user/updateLogged", data).subscribe(res => {
                localStorage.clear();
                localStorage.setItem("refresh_token", res.refresh_token);
                localStorage.setItem("access_token", res.access_token);
                this.showSpinner = false;
                this.onUpload();
            }, err => {
                if (err.status == 400) {
                    this.badRequest = true;
                } else {
                    this.showModificaionAlert = true;
                }
                this.ngOnInit();
            });
        }
        console.log(this.badRequest);
    }


    changePassword() {
        this.confiramtion = 0;
        if (this.newpass === this.confirmpass) {
            this.authservice.post("/user/changePassword",
                { "oldPassword": this.oldpass, "newPassword": this.newpass }).subscribe(
                    () => {
                        this.confiramtion = 1;
                        console.log(this.confiramtion);
                    }, err => {
                        this.confiramtion = 2;
                        console.log(this.confiramtion);
                    }
                );
        }
    }



    getCar(mat: any) {
        this.authservice.get("/user/findCar/" + mat).subscribe(data => { this.car = data; this.showCarSpinner = false; this.isNewCar = false; });
    }

    modifyCar(mat: any) {
        const values = Object.keys(this.car).map(key => this.car[key]);
        this.showAlert = false;
        values.forEach(element => {
            if (element === "") {
                this.showAlert = true;
            }
        });
        if (this.showAlert == false) {
            this.showCarSpinner = true;
            this.car.mat = mat;
            this.authservice.put("/user/modifyCarOfLoggedUser/" + mat, this.car).subscribe(data => {
                document.getElementById('close').click();
                this.showCarsSpinner = true;
                this.ngOnInit();
            });
        }
    }



    deleteCar(mat: any) {
        this.authservice.delete("/user/deleteCarOfLoggedUser/" + mat).subscribe(data => {
            document.getElementById('close').click();
            this.showCarsSpinner = true;
            this.ngOnInit();
        });
    }

    newCar() {
        this.car = new car();
        this.isNewCar = true;
        this.showCarSpinner = false;
    }

    addCar() {
        this.showCarSpinner = true;
        const values = Object.keys(this.car).map(key => this.car[key]);
        this.showAlert = false;
        values.forEach(element => {
            if (element === "") {
                this.showAlert = true;
            }
        });
        if (this.showAlert == false) {
            this.authservice.post("/user/addCarToLoggedUser", this.car).subscribe(data => {
                document.getElementById('close').click();
                this.showCarsSpinner = true;
                this.ngOnInit();
            });
        }
    }


    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
    }


    onUpload() {
        if (this.selectedFile != undefined) {
            console.log(this.selectedFile);
            const uploadImageData = new FormData();
            uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
            this.authservice.post('/upload', uploadImageData)
                .subscribe((response) => {
                    this.ngOnInit();
                }
                );
        } else {
            this.ngOnInit();
        }
        this.successModify = true;
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