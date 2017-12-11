import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Shareholder } from '../../../shared/sdk/models/index';
import { ShareholderApi,UserAccountApi, ShareTransferApi } from '../../../shared/sdk/services/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url';
import {StorageBrowser} from '../../../shared/sdk/index';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'shareholders-cmp',
    moduleId: module.id,
    styleUrls: ['shareholder.component.css', '../../home/home.component.css'],
    templateUrl: 'shareholder.component.html',
    providers: [ShareholderApi,UserAccountApi,StorageBrowser, ShareTransferApi]
})

export class ShareholderComponent implements OnInit{
    shareholder: Shareholder;
    company_name: string;
    company_id: number;
    tab_num = "tab1";
    all_transfers = [];
    transfers = [];

    /* pagination */
    p: number = 1; // set first page to 1
    transfersPerPage: number = 5; // number of items per page
    totalTransfers: number; // total items in the database

    constructor(private shareholdersService:ShareholderApi,
                private toastr: ToastsManager,
                private route: ActivatedRoute,
                private shareTransferApi: ShareTransferApi,
                private user:UserAccountApi,
                private storageBrowser: StorageBrowser){
        this.shareholder = new Shareholder();
    }

    showTab(index) {
        this.tab_num = "tab" + index;
    }

    ngOnInit(){
        if(this.storageBrowser.get('company_id')){
            this.company_id = this.storageBrowser.get('company_id');
            this.company_name = this.storageBrowser.get('company_name');
            this.getShareholder();
        }
        else{
            this.toastr.error('No company selected.','Error');
        }
    }

    getShareholder(){
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this.shareholdersService.findById(id)
                .subscribe((shareholder: Shareholder) => {
                        this.shareholder = shareholder;
                        this.totalTransfers = this.shareholder['transfers'].length;
                        this.all_transfers = this.shareholder['transfers'];
                        this.transfers = this.getTransfers(this.p);
                },
                (error) => {
                    this.toastr.error('Something went wrong while fetching shareholders. Please reload to retry.');
                })
        });
    }

    downloadMLedger(member_id){
        this.shareholdersService.generateMemberLedger(this.company_id,member_id)
            .subscribe((res)=>{
                console.log(res);
                window.location.href = `${BASE_URL}/${API_VERSION}/outputs/ledgers/download/${res.data}`;

            })
    }

    getTransfers(p: number){
        let start = this.transfersPerPage * (p - 1);
        let end = this.transfersPerPage * p;
        return this.all_transfers.slice(start, end);
    }

    pageChanged(page: number){
        this.p = page;
        this.transfers = this.getTransfers(page);
    }

  generateCertificate(id) {
    this.shareTransferApi.generateShareCertificate(id).subscribe( res => {
      window.location.href = `${BASE_URL}/${API_VERSION}/outputs/share_certificates/download/${res.data.path}`;
    });
  }

}
