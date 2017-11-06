import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Person } from '../../../shared/sdk/models/index';
import { PersonApi } from '../../../shared/sdk/services/index';
import {StorageBrowser} from '../../../shared/sdk/index';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'shareholders-cmp',
    moduleId: module.id,
    styleUrls: ['officer.component.css', '../../home/home.component.css'],
    templateUrl: 'officer.component.html',
    providers: [PersonApi,StorageBrowser]
})

export class OfficerComponent implements OnInit{
    person: Person;
    company_name: string;
    tab_num = "tab1";
    constructor(private personApi:PersonApi,
                private toastr: ToastsManager,
                private route: ActivatedRoute,
                private storageBrowser: StorageBrowser){
        this.person = new Person();
    }

    showTab(index) {
        this.tab_num = "tab" + index;
    }

    ngOnInit(){
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.getShareholder();
        }else {
            this.toastr.error('No company selected.', 'Failed.');
        }
    }

    getShareholder(){
        this.route.params.subscribe(params => {
            let id = +params['id'];
            console.log(id);
            this.personApi.findById(id)
                .subscribe((person: Person) => {
                        console.log(person);
                        this.person = person;
                },
                (error) => {
                    this.toastr.error('Something went wrong while fetching officer. Please reload to retry.');
                })
        });
    }

}
