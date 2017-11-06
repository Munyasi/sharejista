import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Person } from '../../shared/sdk/models/index';
import { PersonApi } from '../../shared/sdk/services/index';
import {StorageBrowser} from '../../shared/sdk/index';

@Component({
    selector: 'officers-cmp',
    moduleId: module.id,
    styleUrls: ['officers.component.css'],
    templateUrl: 'officers.component.html',
    providers: [PersonApi,StorageBrowser]
})

export class OfficersComponent implements OnInit{
    officers: Person[];
    company_name: string;
    company_id: number;
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 5; // number of items per page
    totalItems: number; // total items in the database

    //search
    searching: boolean = false;
    term = new FormControl();

    constructor(private personApi: PersonApi,
                private toastr: ToastsManager,
                private storageBrowser: StorageBrowser) {
    }

    ngOnInit(){
        this.company_id = this.storageBrowser.get("company_id");
        this.company_name = this.storageBrowser.get("company_name");
        this.getCount();
        this.getOfficers(this.p);

        //listen for search input change
        this.searchInputChange();
    }

    searchInputChange(){
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
                    this.getOfficers(this.p);
                }
            });
    }

    getOfficers(page: number){
        if(this.storageBrowser.get("company_id")){
            let skip = ( page - 1) * this.itemsPerPage;
            this.personApi.find({ where: { company_id: this.company_id}, limit: this.itemsPerPage, skip: skip})
                .subscribe((officers: any[]) => {
                        this.officers = officers;
                    },
                    (error) => {
                        this.toastr.error('Something went wrong while fetching officers. Please reload to retry.');
                    });
        }else{
            this.toastr.error('No company selected.');
        }
    }

    getCount(){
        this.personApi.count({ company_id: this.company_id}).subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        });
    }

    pageChanged(page: number) {
        this.p = page;
        if (this.term.value)
            this.search(this.term.value, page);
        else
            this.getOfficers(page);
    }

    search(term: string, page:number){
        let skip = ( page - 1) * this.itemsPerPage;
        let s = this.personApi.search(term, this.company_id, this.itemsPerPage, skip);
        s.subscribe( results => {
                this.totalItems = results.data.total;
                this.officers = results.data.officers;
                this.searching = false;
            },
            err => {
                this.toastr.error('Something went wrong when searching. Please try again.')
            })
    }
}
