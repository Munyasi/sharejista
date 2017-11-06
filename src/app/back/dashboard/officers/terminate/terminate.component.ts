import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {IMyDpOptions, IMyDate} from 'mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Person, PersonApi, StorageBrowser } from '../../../shared/sdk/index';
import * as moment from 'moment-mini';

@Component({
  selector: 'app-terminate-director',
  templateUrl: './terminate.component.html',
  styleUrls: ['./terminate.component.css'],
    providers: [PersonApi, StorageBrowser]
})
export class TerminateDirectorComponent implements OnInit {
    person: Person = new Person();
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false,
        showTodayBtn: true
    };
    date = {
        resignation_date: ''
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

                if(this.person.resignation_date){
                    let check = moment(this.person.resignation_date);

                    this.selDate = {
                        year: check.year(),
                        month: check.month() + 1,
                        day: check.date()
                    };
                }
            },
            (err) => {
                this.toastr.error('Something went wrong while fetching officer.');
            });
    }

    onToDateChanged(event){
        this.person.resignation_date = event.formatted;
    }

    terminate(){
        this.personApi.updateAttributes(this.person.id, this.person)
            .subscribe((success) =>{
                    this.toastr.success('Director successfully terminated.');
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
