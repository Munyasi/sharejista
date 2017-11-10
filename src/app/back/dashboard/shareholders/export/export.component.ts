import { Component, OnInit } from '@angular/core';

import { ShareholderApi } from "../../../shared/sdk/services/custom/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../../shared/sdk/index';
import { BASE_URL, API_VERSION } from '../../../shared/base.url'
@Component({
    selector: 'exportshareholders-cmp',
    moduleId: module.id,
    styleUrls: ['export.component.css'],
    templateUrl: 'export.component.html',
    providers: [ShareholderApi,StorageBrowser]
})

export class ExportShareholdersComponent implements OnInit{
    companyName: String;
    companyId: String;
    showFilters = {
        name: false,
        shares: false,
        sharesRange: false
    };
    exportConfig = new ExportConfig();
    constructor(private shareholderApi: ShareholderApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.companyId = this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get('company_name');
        this.exportConfig.type = 'doc';
        this.exportConfig.shares = '';
        this.exportConfig.name = '';
        this.exportConfig.sharesRange = {
            min: null,
            max: null
        };

    }

    noneChanged(event){
        if(event.target.checked) {
            this.showFilters = {
                name: false,
                shares: false,
                sharesRange: false
            };
        }
    }

    downloadList(){
        console.log(this.exportConfig);
        this.shareholderApi.generatelist(this.companyId, this.exportConfig)
            .subscribe((res) => {
                    if(res.data.success === 1){
                        window.location.href = `${BASE_URL}/${API_VERSION}/outputs/shareholders_list/download/${res.data.path}`;
                    }
                },
                (err) => {
                    this.toastr.error('Something went wrong. Please try again.');
                });
    }
}

export class ExportConfig {
    'type': string;
    'name': string;
    'shares': string;
    'sharesRange': {
        'min': number,
        'max': number
    }
}