import { Component, OnInit } from '@angular/core';
import { CR6, CR6Api } from "../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../shared/base.url'

@Component({
  selector: 'app-cr6',
  templateUrl: './cr6.component.html',
  styleUrls: ['./cr6.component.css'],
  providers: [CR6Api,StorageBrowser]
})
export class CR6ListComponent implements OnInit {
    CR6Items: CR6[];
    companyId: number;
    companyName: string;
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 8; // number of items per page
    totalItems: number; // total items in the database

    //downloads
    files = [];
    constructor(private CR6Api: CR6Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get('company_id');
        this.companyName = this.storageBrowser.get('company_name');
        this.getCount();
        this.getCR6Forms(this.p);
    }

    getFileNames(id: number){
        let p = this.CR6Api.generateCR6ById(id);
        p.subscribe( paths =>{
            if(paths.data.length === 0)
                this.toastr.error('We could not generate the CR6 forms for this record. Please try again later.');
            else
                this.files = paths.data;
        },
        err => {
            this.toastr.error('Something went wrong. Please try again.');
        });
    }

    download(name: string){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR6s/download/${name}`;
        this.toastr.info(`Downloading ${name}...`,'Success');
    }

    getCR6Forms(page: number){
        let skip = ( page - 1) * this.itemsPerPage;
        this.CR6Api.find({
            where:
                {
                    companyId: this.companyId
                },
            limit: this.itemsPerPage,
            skip: skip,
            order: 'date DESC'
        })
            .subscribe((cr6s: any[]) => {
                    this.CR6Items = cr6s;
                },
                (err) => {
                    this.toastr.error('Something went wrong. Reload to try again.');
                })
    }

    getCount(){
        this.CR6Api.count({company_id: this.companyId }).subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        });
    }

    pageChanged(page){
        this.p = page;
        this.getCR6Forms(page);
    }

    goBackToCR6Forms(){
        this.files = [];
    }
}
