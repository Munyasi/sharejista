import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { CR7Api } from "../../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url';

@Component({
  selector: 'generateCR8-cmp',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
    providers: [CR7Api, StorageBrowser]
})
export class GenerateCR8Component implements OnInit {
    companyId: number;
    companyName: String;
    cr8Config = new CR8Config();
    files: string[] = [];

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
        this.cr8Config.from = event;
    }

    onToDateChanged(event){
        this.cr8Config.to = event;
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.cr8Config.companyId = this.companyId;
    }

    generate(){
        this.cr7Api.generateCR8(this.cr8Config.companyId,this.cr8Config.from.formatted, this.cr8Config.to.formatted)
            .subscribe((res) => {
                    if(res.data.success === 0){
                        //failed
                        this.toastr.warning(res.data.message);
                    }
                    else{
                        this.files = res.data.paths;
                        this.toastr.info(`Click on download for each CR8 forms generated to for ${this.companyName} to download.`);
                    }
                },
                (error) => {
                    this.toastr.error('Something went wrong. Please try again');
                });
    }

    download(fileUrl){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR8s/download/${fileUrl}`;
    }

}

export class CR8Config{
    "from": any;
    "to": any;
    "companyId": number;
}