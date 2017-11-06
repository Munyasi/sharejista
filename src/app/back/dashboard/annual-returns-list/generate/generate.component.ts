import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { CompanyApi } from "../../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url';

@Component({
  selector: 'app-generate-annual-return',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
    providers: [CompanyApi, StorageBrowser]
})
export class GenerateAnnualReturnComponent implements OnInit {
    companyId: number;
    companyName: String;
    annualReturnConfig = new AnnualReturnConfig();
    files: string[];

    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false,
        showTodayBtn: true
    };

    toDateOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false,
        showTodayBtn: true
    };

    constructor(private companyApi: CompanyApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    onFromDateChanged(event){
        this.annualReturnConfig.from = event;
    }

    onToDateChanged(event){
        this.annualReturnConfig.to = event;
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.annualReturnConfig.companyId = this.companyId;
    }

    generate(){
        let d = new Date();
        let today = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
        this.companyApi.annualReturn(this.annualReturnConfig.companyId,this.annualReturnConfig.from.formatted, this.annualReturnConfig.to.formatted, today)
            .subscribe((res) => {
                    if(res.data.success === 0){
                        //failed
                        this.toastr.warning(res.data.message);
                    }
                    else{
                        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/annual_returns/download/${res.data.path}`;
                        this.toastr.info(`Downloading annual return form for ${this.companyName}`);
                    }
                },
                (error) => {
                    this.toastr.error('Something went wrong. Please try again');
                });
    }

    download(fileUrl){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/annual_returns/download/${fileUrl}`;
    }

}

export class AnnualReturnConfig{
    "from": any;
    "to": any;
    "companyId": number;
}