import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {IMyDpOptions} from 'mydatepicker';
import {DayMonthService} from '../../../daymonth.service';
import * as moment from "moment-mini";
import * as _ from "underscore";

import {Company, CompanyType, ShareType,CompanyShare} from '../../../shared/sdk/models/index';
import {CompanyApi, CompanyTypeApi, ShareTypeApi,CompanyShareApi} from '../../../shared/sdk/services/index';

@Component({
    selector: 'company-create-cmp',
    styleUrls: ['create.company.component.css'],
    templateUrl: 'create.company.component.html',
    providers: [CompanyApi, CompanyTypeApi, ShareTypeApi,CompanyShareApi,DayMonthService]
})

export class CreateCompanyComponent implements OnInit {
    company = new Company();
    shareTypes: ShareType[];
    companyType: CompanyType[];
    companyShares: CompanyShare[];
    myDate = [];
    shares:any;

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false
    };

    private myDatePickerOptions2: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false
    };

    constructor(
        private companyApi: CompanyApi,
        private companyTypeApi: CompanyTypeApi,
        private shareTypeApi: ShareTypeApi,
        private companyShareApi: CompanyShareApi,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastsManager,
        private dayMonth: DayMonthService) {


    }

    tab_num = "tab1";

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

    months = [];
    returnDays = [];
    referenceDays = [];

    totalDays: number;

    updateReturnDays(monthDay) {
        this.totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.returnDays = [];
        for (let d = 1; d <= this.totalDays; d++) {
            this.returnDays.push(d);
        }
    }

    updateReferenceDays(monthDay) {
        this.totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.referenceDays = [];
        for (let d = 1; d <= this.totalDays; d++) {
            this.referenceDays.push(d);
        }
    }


    ngOnInit() {
        this.months = this.dayMonth.getMonths();

        this.shareTypeApi.getShareTypes().subscribe((sharesTypes:ShareType[])=>{
            this.shareTypes = sharesTypes['data'];
        })

        this.route.params.subscribe(params => {
            if (params['id']) {
                this.companyApi.findById(params['id']).subscribe((company: Company) => {
                    this.company = company;
                });
            }
        });

        this.companyTypeApi.find()
            .subscribe((companyType: CompanyType[]) => {
                this.companyType = companyType;
            })
    }

    updateNominalShareCapital() {
        let total= 0;
        _.each(this.shareTypes,function (data,index) {
            if(data['value']>0&&data['par_value']>0){
                total+=data['value']*data['par_value'];
            }
        })
        this.company.nominal_share_capital = total;
    }

    create() {
        this.company.incorporation_date = this.myDate["incorporation_date"]["formatted"];
        let companyObj = {
            'company':this.company,
            'share_types':this.shareTypes
        }

        this.companyApi.addCompany(companyObj)
            .subscribe((company:Company)=>{
                this.company = company['data'];
                this.toastr.success('Company details added successfully', 'Success.');
                this.goToList();
            },
            error=>{
                this.toastr.error('Something went wrong','Error');
            })
    }
    goToList() {
        this.router.navigate(['/en/dashboard/' + this.company.id + '/home']);
    }
}
