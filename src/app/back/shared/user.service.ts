// user.service.ts
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { UserApi } from './sdk';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Injectable()
export class UserService {
    private loggedIn = false;
    username: string;
    password: string;
    remember: string;
    constructor(protected user:UserApi,private router: Router,private toastr: ToastsManager) {
        this.loggedIn = this.user.isAuthenticated();
    }

    login(email, password) {
        return this.user.login({
            username: this.username,
            password: this.password,

        })
            .subscribe((res) => {
                    this.loggedIn = true;
                },
                (err) => {
                    this.loggedIn = false;
                });
    }

    logout() {
        this.user.logout().subscribe((res) => {
            this.loggedIn = false;
        });
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}