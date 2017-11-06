import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAccountApi} from '../back/shared/sdk';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
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
                 private user: UserAccountApi,
                private toastr: ToastsManager) {
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
                 this.toastr.success('Logged in successfully, Redirecting ...', 'Success');
                    setTimeout( () => {
                        this.router.navigate(['en/dashboard']);
                    }, 1000);
            },
            (err) => {
                this.toastr.error('Invalid username or password', 'Login Failed');
            });
    }

}
