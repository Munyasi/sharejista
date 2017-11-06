import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShareTransfer } from "../../shared/sdk/models/index";
import { ShareTransferApi, ShareholderApi } from "../../shared/sdk/services/custom/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';

@Component({
    selector: 'shareallotmentlist-cmp',
    moduleId: module.id,
    styleUrls: ['shareallotmentlist.component.css'],
    templateUrl: 'shareallotmentlist.component.html',
    providers: [ShareTransferApi, ShareholderApi,StorageBrowser]
})

export class ShareAllotmentListComponent implements OnInit{
    shareTransfers: ShareTransfer[];
    company_name: string;
    company_id: number;

    /* pagination */
    p: number = 1; // set first page to 1
    itemsPerPage: number = 5; // number of items per page
    totalItems: number; // total items in the database

    //search
    searching: boolean = false;
    term = new FormControl();
    transfer_type = 'company';

    constructor(private shareTransferApi: ShareTransferApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.company_id = +this.storageBrowser.get('company_id');
        this.company_name = this.storageBrowser.get("company_name");
        this.getCount();
        this.getShareAllotment(this.p);

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
                    this.getShareAllotment(this.p);
                }
            });
    }

    getShareAllotment(page: number) {
        let skip = (page - 1) * this.itemsPerPage;
        let limit = this.itemsPerPage;
        if(this.storageBrowser.get("company_id")){
            this.shareTransferApi.listAllotments(this.company_id, skip, limit)
                .subscribe((shareTransfers: ShareTransfer[]) => {
                        this.shareTransfers = shareTransfers['data'];
                    },
                    (error) => {
                        this.toastr.error('Something went wrong while fetching share transfers, please reload to retry.')
                    });
        }
    }

    getCount(){
        let where = {
            company_id: this.company_id,
            transferer_type: 'company'
        };

        this.shareTransferApi.count(where).subscribe((res) => {
                if(res)
                    this.totalItems = res.count;
            },
            (error) => {
                this.toastr.error('Something went wrong while fetching share transfers, please reload to retry.')
            });
    }

    approveTransfer(shareTransferId,transferer_type,action){
        this.shareTransferApi.approveAllotment(shareTransferId,action)
            .subscribe((res) => {
                    if(res.data.name === "INADEQUATE_SHARES"){
                        return this.toastr.error(res.data.message);
                    }
                    else{
                        this.toastr.success('Share transfer successfully approved');
                        this.getShareAllotment(this.p); //reload share transfer list
                    }
                },
                (error) => {
                    this.toastr.error('Something went wrong in the share transfer approval. Please try again.');
                })
    }

    pageChanged(page: number){
        this.p = page;
        this.getShareAllotment(page);
    }

    search(term: string, page:number){
        let skip = ( page - 1) * this.itemsPerPage;
        let s = this.shareTransferApi.search(term, this.company_id, this.transfer_type,this.itemsPerPage, skip);
        s.subscribe( results => {
                this.totalItems = results.data.total;
                this.shareTransfers = results.data.shareallotments;
                this.searching = false;
            },
            err => {
                this.toastr.error('Something went wrong when searching. Please try again.')
            })
    }
}