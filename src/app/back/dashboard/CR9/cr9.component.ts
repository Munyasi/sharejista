import { Component, OnInit } from '@angular/core';
import {  } from "../../shared/sdk/index";
import { CR9, CR9Api } from "../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../shared/base.url'
@Component({
  selector: 'app-cr9',
  templateUrl: './cr9.component.html',
  styleUrls: ['./cr9.component.css'],
  providers: [CR9Api,StorageBrowser]
})
export class CR9ListComponent implements OnInit {
    CR9Items: CR9[];
    companyId: number;
    companyName: string;
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 8; // number of items per page
    totalItems: number; // total items in the database
    constructor(private CR9Api: CR9Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get('company_id');
        this.companyName = this.storageBrowser.get('company_name');
        this.getCount();
        this.getCR9Forms(this.p);
    }

    download(name){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR9s/download/${name}`;
    }

    getCR9Forms(page: number){
        let skip = ( page - 1) * this.itemsPerPage;
        this.CR9Api.find({
            where:
                {
                    companyId: this.companyId
                },
            limit: this.itemsPerPage,
            skip: skip,
            order: 'date DESC'
        })
        .subscribe((cr9s: any[]) => {
                this.CR9Items = cr9s;
            },
            (err) => {
                this.toastr.error('Something went wrong. Reload to try again.');
            })
    }

    getCount(){
        this.CR9Api.count({company_id: this.companyId }).subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        });
    }

    pageChanged(page){
        this.p = page;
        this.getCR9Forms(page);
    }
}
