import { Component, OnInit } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth-service.service';
import { profile } from 'src/assets/classes/profile';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent {
    title(title: any) {
      throw new Error('Method not implemented.');
    }
    location: any;
    routerSubscription: any;

    constructor(private router: Router,
                private authservice:AuthService) {
    }

    ngOnInit(){
        this.recallJsFuntions();
        if(localStorage.getItem("refresh_token") != undefined && !this.authservice.tokenExpired(localStorage.getItem("refresh_token"))){
            this.authservice.isAuthenticated=true; 
        }else{
            this.authservice.isAuthenticated=false; 
        }
        // this.authservice.getAccess_token(); 
    }

    recallJsFuntions() {
        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            $.getScript('../assets/js/main.js');
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}