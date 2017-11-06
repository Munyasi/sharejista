import {Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../shared/sdk/models/index';
import {CompanyApi} from '../../shared/sdk/services/index';
import {StorageBrowser} from '../../shared/sdk/index';
import {DayMonthService} from '../../daymonth.service';
import * as _ from "underscore";


@Component({
    selector: 'company-cmp',
    moduleId: module.id,
    styleUrls: ['company.component.css'],
    templateUrl: 'company.component.html',
    providers: [CompanyApi,StorageBrowser,DayMonthService]
})

export class CompanyComponent implements OnInit {
    company = new Company();
    companyType = {};
    months = this.dayMonth.getMonths();
    accounting_reference_date:string;
    annual_return_date:string;

    constructor(private companyApi: CompanyApi,
                private route: ActivatedRoute,
                private storageBrowser: StorageBrowser,
                private dayMonth: DayMonthService) {
    }

    tab_num = "tab1";


    showTab(index) {
        this.tab_num = "tab" + index;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.getCompanyById(params['id']);
            } else {
                this.getCurrentCompany();
            }
        });

    }

    shares:any;
    getCurrentCompany() {
        this.companyApi.findOne({where: {current: 1},include: ["CompanyType","CompanyShare","ShareType"]})
            .subscribe((company: Company) => {
                    this.company = company;
                    this.companyType = {id:company["CompanyType"].id,name:company["CompanyType"].name};
                    this.shares=this.aggregateShares(this.company["ShareType"],this.company["CompanyShare"]);
                    //console.log(this.shares);
                    this.accounting_reference_date = this.getDay(this.company.accounting_reference_day)+", "+this.months[(this.company.accounting_reference_month*1)-1];
                    this.annual_return_date = this.getDay(this.company.annual_return_day)+", "+this.months[(this.company.annual_return_month*1)-1];

                    this.storageBrowser.set("company_id",company.id);
                    this.storageBrowser.set("company_name",company.company_name);
                },
                ((error) => {
                    // console.log(error);
                }))
    }

    aggregateShares(shareType,cmpShares){
        let cmp_shares=[];
        let count=0;
        _.forEach(shareType,function (value,index) {
            _.forEach(cmpShares,function (value2,index2) {
                //console.log(value['id'],value2['share_type_id']);
                if(value['id']==value2['share_type_id']){
                    cmp_shares[count]={
                        unissued_shares:value2['unissued_shares'],
                        share_number:value2['share_number'],
                        par_value:value['par_value'],
                        type_name:value['name']
                    }
                    count++;
                }
            })
        })
        return cmp_shares;
    }

    getDay(number){
        let day;
        if(number==1){
            day = "1st";
        }else if(number==2){
            day ="2nd";
        }else if(number==3){
            day = "3rd";
        }else{
            day = number+"th";
        }
        return day;
    }

    getCompanyById(id: number) {
        this.companyApi.updateAll({current:1},{current:0})
            .subscribe(()=>{
                this.companyApi.updateAll({id:id},{current:1})
                    .subscribe(()=>{
                    })
            });

        this.companyApi.findById(id,{include: "CompanyType"})
            .subscribe((company: Company) => {
                    this.storageBrowser.set("company_id",id);
                    this.storageBrowser.set("company_name",company.company_name);

                    this.company = company;
                    this.companyType = {id:company["CompanyType"].id,name:company["CompanyType"].name};

                    this.accounting_reference_date = this.getDay(this.company.accounting_reference_day)+", "+this.months[(this.company.accounting_reference_month*1)-1];
                    this.annual_return_date = this.getDay(this.company.annual_return_day)+", "+this.months[(this.company.annual_return_month*1)-1];
                },
                ((error) => {
                    // console.log(error);
                }));
    }
}
