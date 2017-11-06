import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { Company } from '../../shared/sdk/models/index';
import { CompanyApi, SystemUserApi } from '../../shared/sdk/services/index';
import {StorageBrowser} from '../../shared/sdk/index';
import {skip} from 'rxjs/operator/skip';

@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html',
    providers: [CompanyApi, SystemUserApi, StorageBrowser]
})

export class NavbarComponent implements OnInit {
    company_name: string;
    company_id: number;

    location: Location;

    companyList: Company[];
    term = new FormControl();
    totalItems = 5;
    skip = 0;

    constructor(private router: Router, location: Location, private companyApi: CompanyApi, private user: SystemUserApi,  private storageBrowser: StorageBrowser) {
        this.location = location;
        this.getCompanies();
    }
    ngOnInit() {
        let name = this.storageBrowser.get("company_name");
        let initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
       this.searchInputChange();
    }

    searchInputChange() {
        this.term.valueChanges
            .debounceTime(400)
            .subscribe( term => {
                if (term)
                    this.search(term);
                else
                    this.getCompanies();
            });
    }

    getCompanies() {
        this.companyApi.find({fields: { id: true, company_name: true}, order: 'id DESC', limit: 5})
            .subscribe((companies: Company[]) => {
                    this.companyList = companies;
                },
                (error => {
                }));
    }

    logout(){
        this.user.logout().subscribe((res) => {
            this.router.navigate(['login'])
        });
    }

    search(term: string){
        let s = this.companyApi.search(term, this.totalItems, this.skip);
        s.subscribe( results => {
                this.companyList = results.data.companies;
        })
    }
}