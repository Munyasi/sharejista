import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Shareholder } from '../../shared/sdk/models/index';
import { ShareholderApi } from '../../shared/sdk/services/index';
import {StorageBrowser} from '../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../shared/base.url';

@Component({
    selector: 'shareholders-cmp',
    moduleId: module.id,
    styleUrls: ['shareholders.component.css', '../home/home.component.css'],
    templateUrl: 'shareholders.component.html',
    providers: [ShareholderApi,StorageBrowser]
})

export class ShareholdersComponent implements OnInit{
    shareholders: Shareholder[];
    company_name: string;
    company_id: number;
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 10; // number of items per page
    totalItems: number; // total items in the database

    //search
    searching: boolean = false;
    term = new FormControl();

    constructor(private shareholderApi:ShareholderApi,
                private toastr: ToastsManager,
                private router: Router,
                private storageBrowser: StorageBrowser){
    }

    ngOnInit(){
        this.company_name = this.storageBrowser.get("company_name");
        this.company_id = this.storageBrowser.get("company_id");
        this.getShareholders(this.p);
        this.getCount();

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
                    this.getShareholders(this.p);
                }
            });
    }

    getShareholders(page: number){
        if(this.storageBrowser.get("company_id")){
            let skip = ( page - 1) * this.itemsPerPage;
            this.shareholderApi.find({where: {company_id: this.company_id}, limit: this.itemsPerPage, skip:skip})
                .subscribe((shareholders: Shareholder[]) => {
                        this.shareholders = shareholders;
                    },
                    (error) => {
                        this.toastr.error('Something went wrong while fetching shareholders. Please reload to retry.');
                    })
        }
        else{
            this.toastr.error('No company is selected.');
        }
    }

    goToDownloadList(){
        this.router.navigate(['/en/dashboard/shareholders/exportConfig']);
    }

    getCount(){
        this.shareholderApi.count({ company_id: this.company_id}).subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        });
    }

    downloadMSLedger(){
        this.shareholderApi.generateMembersLedger(this.company_id)
            .subscribe((res)=>{
                window.location.href = `${BASE_URL}/${API_VERSION}/outputs/ledgers/download/${res.data}`;
            })
    }

    pageChanged(page){
        this.p = page;
        this.getShareholders(page);
    }

    search(term: string, page:number){
        let skip = ( page - 1) * this.itemsPerPage;
        let s = this.shareholderApi.search(term, this.company_id, this.itemsPerPage, skip);
        s.subscribe( results => {
                this.totalItems = results.data.total;
                this.shareholders = results.data.shareholders;
                this.searching = false;
            },
            err => {
                this.toastr.error('Something went wrong when searching. Please try again.')
            })
    }
}
