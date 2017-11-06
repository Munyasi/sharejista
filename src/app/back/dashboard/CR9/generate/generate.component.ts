import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { CR9Api } from "../../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url';

@Component({
  selector: 'app-generate-cr9',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
    providers: [CR9Api, StorageBrowser]
})
export class GenerateCR9Component implements OnInit {
    companyId: number;
    companyName: String;
    cr9Config = new CR9Config();
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

    constructor(private cr9Api: CR9Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    onFromDateChanged(event){
        this.cr9Config.from = event;
    }

    onToDateChanged(event){
        this.cr9Config.to = event;
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.cr9Config.companyId = this.companyId;
    }

    generate(){
        this.cr9Api.generateCR9(this.cr9Config.companyId,this.cr9Config.from.formatted, this.cr9Config.to.formatted)
            .subscribe((res) => {
                    if(res.data.success === 0){
                        //failed
                        this.toastr.warning(res.data.message);
                    }
                    else{
                        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR9s/download/${res.data.path}`;
                        this.toastr.info(`Downloading CR9 form for ${this.companyName}`);
                    }
                },
                (error) => {
                    this.toastr.error('Something went wrong. Please try again');
                });
    }

    download(fileUrl){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR9s/download/${fileUrl}`;
    }

}

export class CR9Config{
    "from": any;
    "to": any;
    "companyId": number;
}