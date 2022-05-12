import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { profile } from 'src/assets/classes/profile';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  constructor(public authservice: AuthService, private http: HttpClient) { }

  public profile: any;
  public profilePic:any;
  showSpinner = true;

  ngOnInit(): void {
    this.authservice.get("/user/profile").subscribe(data => {
      this.profile = data;
      if(this.profile.photoProfile!=null){
         this.profilePic=this.authservice.host+"/download/"+this.profile.photoProfile["id"];
      }else{
          this.profilePic="assets/img/user1.jpg";
      }
      this.showSpinner = false;
      console.log(this.profile)
  });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
