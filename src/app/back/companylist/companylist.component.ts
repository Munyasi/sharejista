import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormControl } from '@angular/forms'
import 'rxjs/add/operator/debounceTime';
import { Company } from '../shared/sdk/models/index';
import { CompanyApi } from '../shared/sdk/services/index';
import { DayMonthService } from '../daymonth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'companylist-cmp',
    moduleId: module.id,
    styleUrls: ['companylist.component.css'],
    templateUrl: 'companylist.component.html',
    providers:[CompanyApi, DayMonthService]
})

export class CompanysListComponent implements OnInit{
    companies: Company[];
    months = this.dayMonth.getMonths();
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 5; // number of items per page
    totalItems: number; // total items in the database

    //search
    searching: boolean = false;
    term = new FormControl();


    constructor(private companyApi: CompanyApi,
                public dayMonth: DayMonthService,
                private router: Router,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.getCount();
        this.getCompanies(this.p);
        this.searchInputChange();
    }

    searchInputChange() {
        this.term.valueChanges
            .debounceTime(400)
            .subscribe( term => {
                if(term){
                    this.searching = true;
                    this.search(term, this.p);
                }
                else{
                    this.p = 1; //reset page
                    this.getCount();
                    this.getCompanies(this.p);
                }
            });
    }

    getCount(){
        this.companyApi.count().subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        })
    }

    getCompanies(page: number){
        let skip = ( page - 1) * this.itemsPerPage;
        this.companyApi.find({
            include: 'CompanyType',
            limit: this.itemsPerPage,
            skip: skip
        })
        .subscribe((companies: Company[]) => {
                this.companies = companies;
            },
            ((error) => {
                this.toastr.error('Something went wrong. Reload to try again.');
            }))
    }

    getDay(number){
        let day;

        if(number === 1){
            day = "1st";
        }
        else if(number === 2){
            day = "2nd";
        }
        else if(number === 3){
            day = "3rd";
        }
        else {
            day = number + "th";
        }

        return day;
    }

    selectCompany(id: number){
        this.router.navigate([`/en/dashboard/${id}/home`]);
    }

    pageChanged(page: number) {
        this.p = page;
        if (this.term.value)
            this.search(this.term.value, page);
        else
            this.getCompanies(page);
    }

    search(term: string, page:number){
        let skip = ( page - 1) * this.itemsPerPage;
        let s = this.companyApi.search(term, this.itemsPerPage, skip);
        s.subscribe( results => {
            this.totalItems = results.data.total;
            this.companies = results.data.companies;
            this.searching = false;
        },
        err => {
            this.toastr.error('Something went wrong when searching. Please try again.')
        })
    }
}
