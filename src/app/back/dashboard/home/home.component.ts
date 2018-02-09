import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Company} from '../../shared/sdk/models/index';
import {CompanyApi, UserAccountApi} from '../../shared/sdk/services/index';
import {StorageBrowser} from '../../shared/sdk/index';
import {DayMonthService} from '../../daymonth.service';


declare var $: any;

@Component({
    selector: 'app-home-cmp',
    moduleId: module.id,
    styleUrls: ['home.component.css'],
    templateUrl: 'home.component.html',
    providers: [UserAccountApi, CompanyApi, StorageBrowser, DayMonthService]
})

export class HomeComponent implements OnInit {
    company = new Company();
    accounting_reference_date: string;
    months = this.dayMonth.getMonths();
    constructor(private companyApi: CompanyApi,
                private route: ActivatedRoute,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager,
                private dayMonth: DayMonthService,
                private user: UserAccountApi) {
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
    getCurrentCompany() {
        this.companyApi.findOne({where: {current: 1}, include: "CompanyType"})
            .subscribe((company: Company) => {
                    this.company = company;
                    this.accounting_reference_date = this.getDay(this.company.accounting_reference_day)+", "+this.months[(this.company.accounting_reference_month*1)-1];
                    this.storageBrowser.set("company_id",company.id);
                    this.storageBrowser.set("company_name",company.company_name);
                },
                ((error) => {
                    // console.log(error);
                }))
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
            })

        this.companyApi.findById(id,{include: "CompanyType"})
            .subscribe((company: Company) => {
                    this.company = company;
                    this.accounting_reference_date = this.getDay(this.company.accounting_reference_day)+", "+this.months[(this.company.accounting_reference_month*1)-1];
                    this.storageBrowser.set("company_id",id);
                    this.storageBrowser.set("company_name",company.company_name);
                },
                ((error) => {

                }));
    }
}
