import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ShareTransfer, Shareholder, Company, CompanyShare, SharePayment} from '../../../shared/sdk/models/index';
import {
    ShareTransferApi,
    ShareholderApi,
    ShareTypeApi,
    CompanyApi,
    CompanyShareApi,
    SharePaymentApi
} from '../../../shared/sdk/services/index';
import {StorageBrowser} from '../../../shared/sdk/index';
import {ShareType} from "../../../shared/sdk/models/ShareType";
import {SharesApi} from "../../../shared/sdk/services/custom/Shares";
import {Shares} from "../../../shared/sdk/models/Shares";

import * as _ from 'underscore';
import {error} from "util";

@Component({
    selector: 'shareallotment-cmp',
    moduleId: module.id,
    styleUrls: ['shareallotment.component.css'],
    templateUrl: 'shareallotment.component.html',
    providers: [ShareTransferApi, ShareholderApi, ShareTypeApi, SharesApi, CompanyShareApi, CompanyApi, SharePaymentApi, StorageBrowser]
})

export class ShareAllotmentComponent implements OnInit {
    sharetransfer = new ShareTransfer();
    shareholders: Shareholder[];
    sharetypes: ShareType[];
    companyShare: CompanyShare[];
    sharePayment = new SharePayment();
    transferer_total_shares: number;


    company_name: string;
    company_id: number;

    constructor(private shareTransferApi: ShareTransferApi,
                private shareholderApi: ShareholderApi,
                private shareTypeApi: ShareTypeApi,
                private sharesApi: SharesApi,
                private companyShareApi: CompanyShareApi,
                private companyApi: CompanyApi,
                private sharePaymentApi: SharePaymentApi,
                private route: ActivatedRoute,
                private router: Router,
                private toastr: ToastsManager,
                private  storageBrowser: StorageBrowser) {
    }

    pd = 1;//payment description
    tab_num = "tab1";
    p_value;

    pdRequired(method) {
        this.pd = (method == 'Cash') ? 1 : (method == 'NonCash') ? 2 : 3;
    }

    updateParValue() {
        let id = this.sharetransfer.share_type_id;
        let p = 0;
        _.forEach(this.sharetypes, function (value) {
            if (value.id == id) {
                p = value.par_value;
                return;
            }
        })
        this.p_value = p;
    }

    showTab(index) {
        this.tab_num = "tab" + index;
    }

    showNextTab() {
        let tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    }

    showPrevTab() {
        let tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    }

    ngOnInit() {
        if (this.storageBrowser.get('company_id')) {
            this.company_id = this.storageBrowser.get('company_id');
            this.company_name = this.storageBrowser.get('company_name');
            this.getShareholders();
            this.getSharesTypes();
        }
        else {
            this.toastr.error('No company selected.', 'Error');
        }
    }

    getShareholders() {
        this.shareholderApi.find({where: {company_id: this.company_id}})
            .subscribe((shareholders: Shareholder[]) => {
                    this.shareholders = shareholders;
                },
                (error) => {
                    this.toastr.error('Something went wrong while fetching shareholders. Please reload to try again', 'Error')
                })
    }

    getSharesTypes() {
        this.shareTypeApi.find({where: {company_id: this.company_id}})
            .subscribe((shareTypes: ShareType[]) => {
                    this.sharetypes = shareTypes;
                },
                (error) => {
                    this.toastr.error('Something went wrong while fetching shares types. Please reload to try again.', 'Error');
                })

    }

    updateCashPayable(){
        /*let method = this.sharePayment.payment_method;
        if(!method){}*/
    }

    calculateTotalShares() {
        if (!this.sharetransfer.share_type_id) return;
        this.transferer_total_shares = 0;
        this.companyShareApi.findOne(
            {
                where: {company_id: this.company_id, share_type_id: this.sharetransfer.share_type_id},
                fields: ["unissued_shares"]
            })
            .subscribe((companyShare: CompanyShare[]) => {
                this.transferer_total_shares = companyShare['unissued_shares'];
            })
    }

    createOrUpdate() {
        if (this.storageBrowser.get('company_id')) {
            this.sharetransfer.company_id = this.storageBrowser.get("company_id");
            this.sharetransfer.transferer_type = 'company';
            this.sharetransfer.transferer_id = this.sharetransfer.company_id;

            if (this.sharePayment['payment_method'] == 'Cash') {
                this.sharePayment.amount = this.sharePayment['cash_amount'];
                this.sharePayment.payment_type = this.sharePayment['payment_method'];
            }
            if (this.sharePayment['payment_method'] == 'NonCash') {
                this.sharePayment.amount = this.sharePayment['non_cash_amount'];
                this.sharePayment.payment_type = this.sharePayment['payment_method'];
            }

            if (this.sharetransfer.id)
                this.updateShareAllotment(this.sharetransfer);
            else
                this.createShareAllotment(this.sharetransfer)
        } else {
            this.toastr.error('No company selected.', 'Error');
        }

    }

    createSharePayment(sharePayment: SharePayment) {
        this.sharePaymentApi.create(sharePayment)
            .subscribe((res) => {
                this.toastr.success('Share allotment created successfully. Please await approval', 'Success.');
                this.goToList();
            });
    }

    createShareAllotment(shareAllotment: ShareTransfer) {
        shareAllotment.par_value = this.p_value;
        this.shareTransferApi.create(shareAllotment).subscribe((shareAllotment: ShareTransfer) => {

                if (this.sharePayment['payment_method'] == 'Multiple') {
                    let sp1 = {id:null,amount:this.sharePayment['cash_amount'],payment_type:"Cash",share_transfer_id:shareAllotment.id};
                    let sp2 = {amount:this.sharePayment['non_cash_amount'],payment_type:"NonCash",share_transfer_id:shareAllotment.id};
                    let sp = [sp1,sp2]
                    this.sharePaymentApi.create(sp)
                        .subscribe((res) => {
                            this.toastr.success('Share allotment created successfully. Please await approval', 'Success.');
                            this.goToList();
                        });
                } else {
                    this.sharePayment.share_transfer_id = shareAllotment.id;
                    this.createSharePayment(this.sharePayment);
                }
            },
            this.handleError);
    }

    updateShareAllotment(shareAllotment: ShareTransfer) {
        this.shareTransferApi.updateAttributes(shareAllotment.id, shareAllotment)
            .subscribe((shareAllotment: ShareTransfer) => {
                    this.toastr.success('Shares transfer initiated successfully', 'Success.');
                },
                this.handleError);
    }

    goToList() {
        this.router.navigate(['en/dashboard/shareallotments']);
    }

    handleError(error) {
        this.toastr.error('Something went wrong.', 'Error.');
    }

    handleResultSelected (result) {
        console.log(result);
    }
}

