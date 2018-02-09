import { Component, OnInit } from '@angular/core';
import {CompanyApi, UserAccountApi} from '../back/shared/sdk/services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-en',
    templateUrl: 'en.component.html',
    providers: [UserAccountApi],
})

export class EnComponent implements OnInit {
    constructor(private user: UserAccountApi,private router: Router) {
    }
    ngOnInit() {
        if(!this.user.isAuthenticated())
            this.router.navigate(['login'])
    }
}
