import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ShareTransfer, Shareholder, Company, SharePayment } from '../../../shared/sdk/models/index';
import { ShareTransferApi, ShareholderApi, ShareTypeApi, CompanyApi, SharePaymentApi } from '../../../shared/sdk/services/index';
import {StorageBrowser} from '../../../shared/sdk/index';
import {ShareType} from "../../../shared/sdk/models/ShareType";
import {SharesApi} from "../../../shared/sdk/services/custom/Shares";
import {Shares} from "../../../shared/sdk/models/Shares";
import * as _ from "underscore";

@Component({
    selector: 'sharetransfer-cmp',
    moduleId: module.id,
    styleUrls: ['./sharetransfer.component.css'],
    templateUrl: './sharetransfer.component.html',
    providers: [ShareTransferApi, ShareholderApi, ShareTypeApi, SharesApi, CompanyApi, SharePaymentApi, StorageBrowser]
})

export class ShareTransferComponent implements OnInit{
    sharetransfer = new  ShareTransfer();
    shareholders: Shareholder[];
    sharetypes: ShareType[];
    transferer_total_shares: number;
    sharePayment = new SharePayment();

    company_name: string;
    company_id: number;
    constructor(private shareTransferApi: ShareTransferApi,
                private shareholderApi: ShareholderApi,
                private shareTypeApi: ShareTypeApi,
                private sharesApi: SharesApi,
                private companyApi: CompanyApi,
                private sharePaymentApi: SharePaymentApi,
                private route: ActivatedRoute,
                private router: Router,
                private toastr: ToastsManager ,
                private  storageBrowser: StorageBrowser) {
    }

    pd = 1;//payment description
    tab_num = "tab1";
    p_value;

    pdRequired(method){
        this.pd = (method == 'Cash') ? 1 : (method == 'NonCash') ? 2 : 3;
    }

    updateParValue(){
        let id = this.sharetransfer.share_type_id;
        let p = 0;
        _.forEach(this.sharetypes,function (value) {
            if(value.id==id){
                p = value.par_value;
                return;
            }
        })
        this.p_value = p;
    }

    showTab(index){
        this.tab_num = "tab"+index;
    }

    showNextTab(){
        let tabIndex = parseInt(this.tab_num.slice(-1))+1;
        this.tab_num = "tab"+tabIndex;
    }

    showPrevTab(){
        let tabIndex = parseInt(this.tab_num.slice(-1))-1;
        this.tab_num = "tab"+tabIndex;
    }

    ngOnInit(){
        if(this.storageBrowser.get('company_id')){
             this.company_id = this.storageBrowser.get('company_id');
             this.company_name = this.storageBrowser.get('company_name');
            this.getShareholders();
            this.getSharesTypes();
        }
        else{
            this.toastr.error('No company selected.','Error');
        }
    }

    getShareholders(){
        this.shareholderApi.find({where: { company_id: this.company_id }})
            .subscribe((shareholders: Shareholder[]) => {
                    this.shareholders = shareholders;
                },
                (error) => {
                    console.log(error);
                    this.toastr.error('Something went wrong while fetching shareholders. Please reload to try again', 'Error')
                })
    }

    getSharesTypes(){
        this.shareTypeApi.find({where: { company_id: this.company_id }})
            .subscribe((shareTypes: ShareType[]) => {
                    this.sharetypes = shareTypes;
                },
                (error) =>{
                    this.toastr.error('Something went wrong while fetching shares types. Please reload to try again.','Error');
                })

    }

    calculateTotalShares(){
        if(!(this.sharetransfer.transferer_id && this.sharetransfer.share_type_id))
            return;
            this.transferer_total_shares = 0;
            this.sharesApi.find({
                where:{
                    and:[
                        {sharetype_id: this.sharetransfer.share_type_id},
                        {shareholder_id:this.sharetransfer.transferer_id}
                    ]
                }
            })
                .subscribe((shares: Shares[])=>{
                        for(let sh of shares)
                            this.transferer_total_shares += parseInt( sh.number_of_shares.toString());
                    },
                    (error) => {
                        this.toastr.error('Something went wrong while fetching total shares.')
                    });
    }

    createOrUpdate(){
        if(this.storageBrowser.get('company_id')){
            this.sharetransfer.company_id = this.storageBrowser.get("company_id");
            this.sharetransfer.transferer_type = 'shareholder';

            if (this.sharePayment['payment_method'] == 'Cash') {
                this.sharePayment.amount = this.sharePayment['cash_amount'];
                this.sharePayment.payment_type = this.sharePayment['payment_method'];
            }
            if (this.sharePayment['payment_method'] == 'NonCash') {
                this.sharePayment.amount = this.sharePayment['non_cash_amount'];
                this.sharePayment.payment_type = this.sharePayment['payment_method'];
            }

            if(this.sharetransfer.id)
                this.updateShareTransfer(this.sharetransfer);
            else
                this.createShareTransfer(this.sharetransfer)
        }else{
            this.toastr.error('No company selected.','Error');
        }

    }

    createSharePayment(sharePayment: SharePayment) {
        this.sharePaymentApi.create(sharePayment)
            .subscribe((res) => {
                this.toastr.success('Share transfer created successfully. Please await approval', 'Success.');
                this.goToList();
            });
    }

    createShareTransfer(shareTransfer: ShareTransfer){
        shareTransfer.par_value = this.p_value;
        this.shareTransferApi.create(shareTransfer).
        subscribe((shareTransfer: ShareTransfer) => {
                if (this.sharePayment['payment_method'] == 'Multiple') {
                    let sp1 = {id:null,amount:this.sharePayment['cash_amount'],payment_type:"Cash",share_transfer_id:shareTransfer.id};
                    let sp2 = {amount:this.sharePayment['non_cash_amount'],payment_type:"NonCash",share_transfer_id:shareTransfer.id};
                    let sp = [sp1,sp2]
                    this.sharePaymentApi.create(sp)
                        .subscribe((res) => {
                            this.toastr.success('Share transfer created successfully. Please await approval', 'Success.');
                            this.goToList();
                        });
                } else {
                    this.sharePayment.share_transfer_id = shareTransfer.id;
                    this.createSharePayment(this.sharePayment);
                }
                },
            this.handleError);
    }

    updateShareTransfer(shareTransfer: ShareTransfer){
        this.shareTransferApi.updateAttributes(shareTransfer.id, shareTransfer)
            .subscribe((shareTransfer: ShareTransfer) =>{
                    this.toastr.success('Shares transfer initiated successfully', 'Success.');
                },
                this.handleError);
    }

    goToList(){
        this.router.navigate(['en/dashboard/sharetransfers']);
    }

    handleError(error){
        this.toastr.error('Something went wrong.', 'Error.');
    }
}

