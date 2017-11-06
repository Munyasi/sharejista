import { Injectable, Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserApi } from '../sdk';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(protected user:UserApi,private router: Router) {}
    canActivate() {
        if(this.user.isAuthenticated()){
            return true;
        }else{
            this.router.navigate(['login']);
        }
    }
}