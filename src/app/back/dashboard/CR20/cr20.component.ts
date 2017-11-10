import { Component, OnInit } from '@angular/core';
import { CR20, CR20Api } from '../../shared/sdk/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../shared/base.url';
@Component({
  selector: 'app-cr20',
  templateUrl: './cr20.component.html',
  styleUrls: ['./cr20.component.css'],
  providers: [CR20Api, StorageBrowser]
})

export class CR20ListComponent implements OnInit {
    CR20Items: CR20[];
    companyId: number;
    companyName: string;
    errorMessage = 'Something went wrong. Reload to try again.';
    /* pagination */
    p = 1; // set first page to 1
    itemsPerPage = 8; // number of items per page
    totalItems: number; // total items in the database
    constructor(private CR20Api: CR20Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.companyId = +this.storageBrowser.get('company_id');
        this.companyName = this.storageBrowser.get('company_name');
        this.getCount();
        this.getCR9Forms(this.p);
    }

    download(id: number){
        let p = this.CR20Api.generateCR20ById(id);
        p.subscribe( res => {
                let name = res.data.path;
                window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR20s/download/${name}`;
            },
            err => {
                this.toastr.error(this.errorMessage);
            });
    }

    getCR9Forms(page: number) {
        const skip = ( page - 1) * this.itemsPerPage;
        this.CR20Api.find({
            where:
                {
                    companyId: this.companyId
                },
            limit: this.itemsPerPage,
            skip: skip,
            order: 'date DESC'
        })
        .subscribe((cr20s: any[]) => {
                this.CR20Items = cr20s;
            },
            (err) => {
                this.toastr.error(this.errorMessage);
            });
    }

    getCount() {
        this.CR20Api.count({company_id: this.companyId }).subscribe((res) => {
            if (res) {
                this.totalItems = res.count;
            }
        });
    }

    pageChanged(page) {
        this.p = page;
        this.getCR9Forms(page);
    }
}
