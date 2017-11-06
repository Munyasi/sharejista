import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAccountApi} from '../back/shared/sdk';
@Component({
    selector: 'app-login-cmp',
    styleUrls: ['./css/font-awesome.css', 'login.component.css'],
    templateUrl: 'login.component.html',
    providers: [UserAccountApi]
})

export class LoginComponent implements OnInit {

    username: string;
    password: string;
    remember: string;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private user: UserAccountApi) {
          this.user.isAuthenticated() ? this.router.navigate(['en/dashboard']) : false;
    }

    ngOnInit() {
    }

    login() {
        this.user.login({
            username: this.username,
            password: this.password
        })
            .subscribe((res) => {
                //console.log(this.user.getCurrentToken());
                 this.router.navigate(['en/dashboard']);
            },
            (err) => {
                console.error(err);
            });
    }

}
