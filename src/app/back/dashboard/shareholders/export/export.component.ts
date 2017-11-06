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
    exportConfig = new ExportConfig();
    constructor(private shareholderApi: ShareholderApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.companyId = this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get('company_name');
        this.exportConfig.field = 'name';
        this.exportConfig.order = 'asc';
        this.exportConfig.type = 'doc'
    }

    downloadList(){
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

export class ExportConfig{
    "field": string;
    "order": string;
    "type": string;
}