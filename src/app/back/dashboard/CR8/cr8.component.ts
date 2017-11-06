import { Component, OnInit } from '@angular/core';
import {  } from "../../shared/sdk/index";
import { CR7, CR7Api } from "../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../shared/base.url'
@Component({
  selector: 'app-cr8',
  templateUrl: './cr8.component.html',
  styleUrls: ['./cr8.component.css'],
  providers: [CR7Api,StorageBrowser]
})
export class CR8ListComponent implements OnInit {
    CR8Items: CR7[];
    companyId: number;
    companyName: string;
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
        this.getCR8Forms(this.p)
    }

    download(name){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR8s/download/${name}`;
    }

    getCR8Forms(page: number) {
        let skip = ( page - 1) * this.itemsPerPage;
        this.CR7Api.find({
            where: {
                companyId: this.companyId,
                type: 'CR8'
            },
            limit: this.itemsPerPage,
            skip: skip,
            order: 'date DESC'
        })
        .subscribe((cr8s: any[]) => {
                this.CR8Items = cr8s;
            },
            (err) => {
                console.log(err);
            })
    }

    getCount(){
        this.CR7Api.count({company_id: this.companyId,  type: 'CR8' }).subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        });
    }

    pageChanged(page){
        this.p = page;
        this.getCR8Forms(page);
    }
}
