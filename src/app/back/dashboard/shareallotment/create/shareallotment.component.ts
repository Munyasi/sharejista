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
    selected_share_type: string;


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
    cash_read_only = false;
    non_cash_read_only = false;

    pdRequired(method) {
        this.pd = (method === 'Cash') ? 1 : (method === 'NonCash') ? 2 : 3;
    }



    updateParValue() {
        let id = this.sharetransfer.share_type_id;
        let p = 0;
        let s = "";
        _.forEach(this.sharetypes, function (value) {
            if (value.id == id) {
                p = value.par_value;
                s = value.name;
                return;
            }
        })
        this.p_value = p;
        this.selected_share_type = s;
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
            this.sharetransfer['payment_status'] = 'Full';
            this.sharetransfer['payment_method'] = 'Cash';
        }
        else {
            this.toastr.error('No company selected.', 'Error');
        }
    }

    amountPayable(){
        if(this.sharetransfer['payment_method']==='Cash'){
            this.sharetransfer['cash_payable']=(this.sharetransfer.number_of_shares*(this.sharetransfer.share_price||0)||0)
            this.sharetransfer.total_cash_amount = this.sharetransfer['cash_payable'];
            this.cash_read_only = true;
        }else if(this.sharetransfer['payment_method'] === 'NonCash'){
            this.sharetransfer['non_cash_payable']=(this.sharetransfer.number_of_shares*(this.sharetransfer.share_price||0)||0)
            this.sharetransfer.total_non_cash_amount = this.sharetransfer['non_cash_payable'];
            this.non_cash_read_only = true;
        }else{
            this.cash_read_only = false;
            this.non_cash_read_only = false;
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

            /*if (this.sharePayment['payment_method'] == 'Cash') {
                this.sharePayment.amount = this.sharePayment['cash_amount'];
                this.sharePayment.payment_type = this.sharePayment['payment_method'];
            }
            if (this.sharePayment['payment_method'] == 'NonCash') {
                this.sharePayment.amount = this.sharePayment['non_cash_amount'];
                this.sharePayment.payment_type = this.sharePayment['payment_method'];
            }*/

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

                var shareObj = {
                    certificate_no:this.uniqueNumber(),
                    number_of_shares:shareAllotment.number_of_shares,
                    action:'ALLOTMENT',
                    status:'VALID',
                    dated:null,
                    sharetype_id:shareAllotment.share_type_id,
                    company_id: shareAllotment.company_id,
                    sharetransfer_id:shareAllotment.id,
                    shareholder_id:shareAllotment.transferee_id
                }

                this.sharesApi.create(shareObj)
                    .subscribe((res) => {
                        this.toastr.success('Share allotment created successfully', 'Success.');
                        this.goToList();
                    });
               /* if (this.sharePayment['payment_method'] == 'Multiple') {
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
                }*/
            },
            this.handleError);
    }

    uniqueNumber() {
        var uniqueNumber = {};
        var date = Date.now();
        uniqueNumber['previous'] = 0;
        if (date <= uniqueNumber['previous']) {
            date = ++uniqueNumber['previous'];
        } else {
            uniqueNumber['previous'] = date;
        }

        return date;
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

