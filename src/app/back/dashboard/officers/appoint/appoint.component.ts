import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IMyDpOptions, IMyDate} from 'mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Person, PersonApi, StorageBrowser } from '../../../shared/sdk/index';
import * as moment from 'moment-mini';

@Component({
    selector: 'appoint-cmp',
    styleUrls: ['appoint.component.css'],
    templateUrl: 'appoint.component.html',
    providers: [PersonApi, StorageBrowser]
})

export class AppointSecretaryComponent implements OnInit {
    person: Person = new Person();
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false,
        showTodayBtn: true
    };
    date = {
        app_date: ''
    };

    selDate: IMyDate = {year: 0, month: 0, day: 0};

    constructor(private route: ActivatedRoute,
                private router: Router,
                private personApi:PersonApi,
                private storageBrowser: StorageBrowser,
                private toastr: ToastsManager) {
    }

    ngOnInit(){
        this.route.params.subscribe((params) => {
            if(params['id']){
                this.getPersonById(params['id']);
            }
        })
    }

    getPersonById(id: number) {
        let promise = this.personApi.findById(id);
        promise.subscribe((person: Person) => {
                this.person = person;

                let check = moment(this.person.appointment_date);

                this.selDate = {
                    year: check.year(),
                    month: check.month() + 1,
                    day: check.date()
                };
            },
            (err) => {
                this.toastr.error('Something went wrong while fetching officer.');
            });
    }

    onToDateChanged(event){
        console.log(event.formatted);
        this.person.appointment_date = event.formatted;
    }

    appoint(){
        this.person.person_type = 'Secretary';
        this.personApi.updateAttributes(this.person.id, this.person)
            .subscribe((success) =>{
                this.toastr.success('Director successfully appointed as Secretary');
                this.goToList();
            },
            (err) => {
               this.toastr.error('Something went wrong. Please try again');
            });
    }

    goToList() {
        this.router.navigate(['/en/dashboard/officers']);
    }
}