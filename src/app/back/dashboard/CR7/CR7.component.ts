import { Component, OnInit} from '@angular/core';
import {  } from "../../shared/sdk/index";
import { CR7, CR7Api } from "../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../shared/base.url'

@Component({
    selector: 'cr7-cmp',
    moduleId: module.id,
    styleUrls: ['CR7.component.css'],
    templateUrl: 'CR7.component.html',
    providers: [CR7Api, StorageBrowser]
})

export class CR7ListComponent implements OnInit{
    CR7Items: CR7[];
    companyId: number;
    companyName: string;
    errorMessage: string = 'Something went wrong. Reload to try again.';
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 8; // number of items per page
    totalItems: number; // total items in the database

    constructor(private CR7Api: CR7Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get('company_id');
        this.companyName = this.storageBrowser.get('company_name');
        this.getCount();
        this.getCR7Forms(this.p);
    }

    download(id: number){
        let p = this.CR7Api.generateCR7ById(id);
        p.subscribe( res => {
            let name = res.data.path;
            window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR7s/download/${name}`;
        },
        err => {
           this.errorHandler(err);
        });
    }

    getCR7Forms(page: number){
        let skip = ( page - 1) * this.itemsPerPage;
        this.CR7Api.find({
            where:
                {
                    companyId: this.companyId,
                    type: 'CR7'
                },
            limit: this.itemsPerPage,
            skip: skip,
            order: 'date DESC'
        })
        .subscribe((cr7s: any[]) => {
                this.CR7Items = cr7s;
            },
            err => {
                this.errorHandler(err);
            });
    }

    getCount(){
        let p = this.CR7Api.count({
            company_id: this.companyId,
            type: 'CR7'
        });

        p.subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        },
        err => {
            this.errorHandler(err);
        });
    }

    pageChanged(page){
        this.p = page;
        this.getCR7Forms(page);
    }

    errorHandler(err) {
        this.toastr.error(this.errorMessage);
    }
}