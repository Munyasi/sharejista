import { Component, OnInit } from '@angular/core';
import {ShareType} from "../../shared/sdk/models/index";
import { ShareTypeApi } from "../../shared/sdk/services/custom/index";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { StorageBrowser } from '../../shared/sdk/index';

@Component({
    selector: 'shareclasses-cmp',
    moduleId: module.id,
    styleUrls: ['shareclasses.component.css'],
    templateUrl: 'shareclasses.component.html',
    providers: [ShareTypeApi, StorageBrowser]
})

export class ShareClassesComponent implements OnInit{
    shareClasses: ShareType[];
    company_name: string;

    constructor(private shareTypeApi: ShareTypeApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager){
    }

    ngOnInit(){
        this.getShareClasses();
    }

    getShareClasses() {
        if(this.storageBrowser.get("company_id")){
            this.company_name = this.storageBrowser.get("company_name");
            this.shareTypeApi.find({where: {'company_id': this.storageBrowser.get("company_id")}}).subscribe((shareClasses: ShareType[]) => {
                    this.shareClasses = shareClasses
                },
                (error) => {
                    this.toastr.error('Something went wrong while fetching share classes, please reload to retry.')
                });
        }else{
            this.toastr.error('No company is selected.');
        }
    }
}
