import {Component, OnInit} from '@angular/core';
import {AnnualReturn, AnnualReturnApi} from "../../shared/sdk/index";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {StorageBrowser} from '../../shared/sdk/index';
import {BASE_URL, API_VERSION} from '../../shared/base.url'
@Component({
    selector: 'app-annual-returns-list',
    templateUrl: './annual-returns-list.component.html',
    styleUrls: ['./annual-returns-list.component.css'],
    providers: [AnnualReturnApi, StorageBrowser]
})
export class AnnualReturnsListComponent implements OnInit {
    annualReturnItems: AnnualReturn[];
    companyId: number;
    companyName: string;
    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 8; // number of items per page
    totalItems: number; // total items in the database
    constructor(private annualReturnApi: AnnualReturnApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.companyId = +this.storageBrowser.get('company_id');
        this.companyName = this.storageBrowser.get('company_name');
        this.getCount();
        this.getAnnualReturns(this.p);
    }

    download(name){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR9s/download/${name}`;
    }

    getAnnualReturns(page: number){
        let skip = ( page - 1) * this.itemsPerPage;
        this.annualReturnApi.find({
            where:
                {
                    companyId: this.companyId
                },
            limit: this.itemsPerPage,
            skip: skip,
            order: 'date DESC'
        })
            .subscribe((annual_returns: any[]) => {
                    this.annualReturnItems = annual_returns;
                },
                (err) => {
                    this.toastr.error('Something went wrong. Reload to try again.');
                })
    }

    getCount(){
        this.annualReturnApi.count({company_id: this.companyId }).subscribe((res) => {
            if(res)
                this.totalItems = res.count;
        });
    }

    pageChanged(page){
        this.p = page;
        this.getAnnualReturns(page);
    }

}
