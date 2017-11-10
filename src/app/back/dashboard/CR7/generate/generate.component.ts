import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { CR7Api } from "../../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url'
@Component({
    selector: 'generateCR7-cmp',
    moduleId: module.id,
    styleUrls: ['generate.component.css'],
    templateUrl: 'generate.component.html',
    providers: [CR7Api, StorageBrowser]
})

export class GenerateCR7Component implements OnInit{
    companyId: number;
    companyName: String;
    cr7Config = new CR7Config();
    filePath: string;

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

    constructor(private cr7Api: CR7Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    onFromDateChanged(event){
        this.cr7Config.from = event;
    }

    onToDateChanged(event){
        this.cr7Config.to = event;
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.cr7Config.companyId = this.companyId;
    }

    generate(){
        this.cr7Api.generateCR7(this.cr7Config.companyId,this.cr7Config.from.formatted, this.cr7Config.to.formatted)
            .subscribe((res) => {
                if(res.data.success === 0){
                    //failed
                    this.toastr.warning(res.data.message);
                }
                else{
                    this.filePath = res.data.path;
                    window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR7s/download/${this.filePath}`;
                    this.toastr.info(`Downloading CR7 form for ${this.companyName}`);
                }
            },
            (error) => {
                this.toastr.error('Something went wrong. Please try again');
            });
    }

}

export class CR7Config{
    "from": any;
    "to": any;
    "companyId": number;
}