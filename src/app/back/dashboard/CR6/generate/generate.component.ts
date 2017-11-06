import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { CR6Api } from "../../../shared/sdk/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url';

@Component({
  selector: 'generateCR6-cmp',
  templateUrl: 'generate.component.html',
  styleUrls: ['generate.component.css'],
    providers: [CR6Api, StorageBrowser]
})
export class GenerateCR6Component implements OnInit {
    companyId: number;
    companyName: String;
    cr6Config = new CR6Config();
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

    constructor(private cr6Api: CR6Api,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    onFromDateChanged(event): void {
        this.cr6Config.from = event;
    }

    onToDateChanged (event): void{
        this.cr6Config.to = event;
    }

    ngOnInit(){
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.cr6Config.companyId = this.companyId;
    }

    generate(){
        this.cr6Api.generateCR6(this.cr6Config.companyId,this.cr6Config.from.formatted, this.cr6Config.to.formatted)
            .subscribe((res) => {
                    if(res.data.success === 0){
                        //failed
                        this.toastr.warning(res.data.message);
                    }
                    else{
                        this.files = res.data.paths;
                        this.toastr.info(`Click on download for each CR6 forms generated to for ${this.companyName} to download.`);
                    }
                },
                (error) => {
                    this.toastr.error('Something went wrong. Please try again');
                });
    }

    download(fileUrl){
        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/CR6s/download/${fileUrl}`;
    }

}

export class CR6Config{
    "from": any;
    "to": any;
    "companyId": number;
}