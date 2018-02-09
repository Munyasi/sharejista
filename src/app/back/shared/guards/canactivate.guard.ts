import { Injectable, Component } from '@angular/core';
import { CanActivate, Router , ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { UserAccountApi } from '../sdk';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
    constructor(protected user:UserAccountApi,private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        if(this.user.isAuthenticated()){
            return true;
        }else{
            this.router.navigate(['login']);
            return false;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('can_activate_child');
        if(this.user.isAuthenticated()){
            return true;
        }else{
            this.router.navigate(['login']);
            return false;
        }
    }
}