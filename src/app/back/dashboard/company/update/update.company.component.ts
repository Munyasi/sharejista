import { Component, OnInit } from '@angular/core';
import {IMyDateModel, IMyDate, IMyDpOptions} from 'mydatepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment-mini';
import {DayMonthService} from '../../../daymonth.service';
import * as _ from "underscore";
import { Company,CompanyType,ShareType } from '../../../shared/sdk/models/index';
import { CompanyApi,CompanyTypeApi,ShareTypeApi } from '../../../shared/sdk/services/index';

@Component({
    selector: 'company-update-cmp',
    moduleId: module.id,
    styleUrls: ['update.company.component.css'],
    templateUrl: 'update.company.component.html',
    providers: [CompanyApi,CompanyTypeApi,ShareTypeApi,DayMonthService]
})

export class UpdateCompanyComponent implements OnInit{
    company = new Company();
    companyType: CompanyType[];
    shareTypes: ShareType[];
    myDate = [];

    private selDate: IMyDate;
    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField:false
    };

    private myDatePickerOptions2: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField:false
    };


    constructor(
        private companyApi: CompanyApi,
        private companyTypeApi: CompanyTypeApi,
        private shareTypeApi:ShareTypeApi,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private dayMonth: DayMonthService
    ){

    }



    tab_num = "tab1";

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

    months = this.dayMonth.getMonths();
    returnDays = [];
    referenceDays = [];

    updateReturnDays(monthDay) {
        let totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.returnDays = [];
        for (let d = 1; d <= totalDays; d++) {
            this.returnDays.push(d);
        }
    }

    updateReferenceDays(monthDay) {
        let totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.referenceDays = [];
        for (let d = 1; d <= totalDays; d++) {
            this.referenceDays.push(d);
        }
    }
    shares:any;
    shares_orig:any;


    ngOnInit(){
        this.route.params.subscribe(params => {
            if(params['id']){
                this.companyApi.findById(params['id'],{include: ["CompanyType","CompanyShare","ShareType"]}).
                subscribe((company: Company) => {
                    this.company = company;
                    this.shares=this.aggregateShares(this.company["ShareType"],this.company["CompanyShare"],company.id);
                    this.shares_orig = JSON.parse(JSON.stringify(this.shares));
                    this.updateReturnDays(this.company.annual_return_month);
                    this.updateReferenceDays(this.company.accounting_reference_month);
                    let check = moment(this.company.incorporation_date);
                    let month = check.month() + 1;
                    let day   = check.date();
                    let year  = check.year();
                    this.selDate = {year: year, month: month, day: day};
                    this.myDate["incorporation_date"] = { date: { year: year, month: month, day: day } };
                });
            }
        });

        this.companyTypeApi.find()
            .subscribe((companyType: CompanyType[]) => {
                this.companyType = companyType;
            })
    }

    aggregateShares(shareType,cmpShares,company_id){
        let cmp_shares=[];
        let count=0;
        _.forEach(shareType,function (value,index) {
            _.forEach(cmpShares,function (value2,index2) {
                if(value['id']==value2['share_type_id']){
                    cmp_shares[count]={
                        id:value2['id'],
                        company_id:company_id,
                        share_type_id:value2['share_type_id'],
                        share_type_description:value['description'],
                        share_type_transferrable:value['transferrable'],
                        unissued_shares:value2['unissued_shares'],
                        share_number:value2['share_number'],
                        par_value:value['par_value'],
                        type_name:value['name']
                    }
                    count++;
                }
            })
        })

        if(shareType.length>cmpShares.length){
            let new_shares = shareType.slice(-(shareType.length-cmpShares.length));
            _.forEach(new_shares,function (value,index) {
                cmp_shares[count] = {
                    company_id:company_id,
                    share_type_id:value['id'],
                    unissued_shares:null,
                    share_number:null,
                    par_value:null,
                    type_name:value['name'],
                    share_type_description:value['description'],
                    share_type_transferrable:value['transferrable'],
                    new_type:true
                }
                count++;
            })
        }
        return cmp_shares;
    }

    changed_indexes=[];
    updateChangedIndex(index){
        this.changed_indexes.push(index)
        this.changed_indexes = _.uniq(this.changed_indexes);
    }

    isChangedIndex(index,changedIndexes){
        if(changedIndexes.length>0){
            _.forEach(changedIndexes,function (value2,index2) {
                if(index==value2){
                    return true;
                }
            })
        }
        return false;
    }

    getDiff(shares,shares_orig,changedIndexes){
       let changed=[];
       let count=0;
        _.forEach(shares,function (value,index) {
            _.forEach(shares_orig,function (value2,index2) {
                if(index==index2){
                    if(changedIndexes.length>0){
                        //check if value was adjusted
                        _.forEach(changedIndexes,function (value3,index3) {
                            if(index==value3){
                                //unissued shares holds the new value of unissued shares
                                let unissued_shares
                                if(value['new_type']){
                                    unissued_shares = value['share_number'];
                                }else{
                                    unissued_shares = value2['unissued_shares']+(value['share_number']-value2['share_number']);
                                }
                                if(unissued_shares>=0){
                                    value['unissued_shares'] = unissued_shares;
                                    changed[count]= value;
                                    count++;
                                }
                            }
                        })
                    }
                }
            })
        })
        return changed;
    }

    updateNominalShareCapital() {
        let total= 0;
        _.each(this.shares,function (data,index) {
            if(data['share_number']>0&&data['par_value']>0){
                total+=data['share_number']*data['par_value'];
            }
        })
        this.company.nominal_share_capital = total;
    }

    onDateChanged(event: IMyDateModel) {
        this.selDate = event.date;
        var incorporation_date = new Date(event.date.year+"/"+event.date.month+"/"+event.date.day);
        this.company.incorporation_date = incorporation_date;
    }

    updateCompany(){
        event.preventDefault();
        let shares = this.getDiff(this.shares,this.shares_orig,this.changed_indexes);
        this.companyApi.updateCompany({company:this.company,company_shares:shares})
            .subscribe((updateCompany: Company) =>{
                this.toastr.success('Company details updated successfully', 'Success.');
                this.goToList();
        });
    }

    goToList() {
        this.router.navigate(['/en/dashboard/company']);
    }
}
