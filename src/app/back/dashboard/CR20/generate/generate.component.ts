import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { CR20Api } from "../../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url';

@Component({
  selector: 'app-generate-cr9',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'],
    providers: [CR20Api, StorageBrowser]
})
export class GenerateCR20Component implements OnInit {
    companyId: number;
    companyName: String;
    cr20Config = new CR20Config();
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

    constructor(private cr20Api: CR20Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    onFromDateChanged(event){
        this.cr20Config.from = event;
    }

    onToDateChanged(event){
        this.cr20Config.to = event;
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.cr20Config.companyId = this.companyId;
    }

    generate(){
        this.cr20Api.generateCR20(this.cr20Config.companyId,this.cr20Config.from.formatted, this.cr20Config.to.formatted)
            .subscribe((res) => {
                    if(res.data.success === 0){
                        //failed
                        this.toastr.warning(res.data.message);
                    }
                    else{
                        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR20s/download/${res.data.path}`;
                        this.toastr.info(`Downloading CR20 form for ${this.companyName}`);
                    }
                },
                (error) => {
                    this.toastr.error('Something went wrong. Please try again');
                });
    }

    download(fileUrl){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR20s/download/${fileUrl}`;
    }

}

export class CR20Config{
    "from": any;
    "to": any;
    "companyId": number;
}