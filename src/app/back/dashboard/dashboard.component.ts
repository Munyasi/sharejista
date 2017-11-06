import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    currentUrl:String;
    constructor(private router: Router) {
    }

    ngOnInit(){
        this.router.events.subscribe((route:any) => this.currentUrl = route.url);
    }

}