import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Person, PersonChanges} from '../../../shared/sdk/models/index';
import {PersonApi, PersonChangesApi} from '../../../shared/sdk/services/index';
import {StorageBrowser} from '../../../shared/sdk/index';
import {IMyDpOptions, IMyDate, IMyDateModel} from 'mydatepicker';
import {CountryService} from '../../../country.service';
import * as moment from 'moment-mini';

@Component({
    selector: 'officer-create-cmp',
    moduleId: module.id,
    styleUrls: ['create.officers.component.css'],
    templateUrl: 'create.officers.component.html',
    providers: [PersonApi, PersonChangesApi, StorageBrowser, CountryService]
})

export class CreateOfficerComponent implements OnInit {
    person = new Person();
    placeholder = 'assets/img/image_placeholder.jpg';
    error: String;
    trackChanges: boolean;
    uneditedPerson = new Person();
    myDate = {};
    countries = [];
    update = false;
    company_name: string;
    company_id: number;
    directors = [];
    alt_director = false;
    selDate: IMyDate;
    selDateAppointment: IMyDate;
    myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false
    };

    constructor(private personApi: PersonApi,
                private route: ActivatedRoute,
                private router: Router,
                private toastr: ToastsManager,
                private personChangesApi: PersonChangesApi,
                private  storageBrowser: StorageBrowser,
                private countryService: CountryService) {
    }

    tab_num = "tab1";

    showTab(index) {
        this.tab_num = "tab" + index;
    }

    showNextTab() {
        let tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    }

    showPrevTab() {
        let tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    }

    ngOnInit() {
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.company_id = this.storageBrowser.get("company_id");
            this.countries = this.countryService.getCountry();
            this.route.params.subscribe(params => {
                if (params['id']) {
                    this.getPersonById(params['id']);
                    this.update = true;
                } else {
                    this.update = false;
                }
            });

            this.personApi.find({where:{company_id:this.company_id},fields:['id','salutation','surname','other_names','person_type']})
                .subscribe((persons : Person[])=>{
                    this.directors = persons;
                })


        } else {
            this.toastr.error('No company selected.', 'Failed.');
        }
    }

    changedOfficerType(type){
        this.alt_director = type == 'Alternate Director';
    }

    getPersonById(id: number) {
        this.personApi.findById(id)
            .subscribe((person: Person) => {
                    if (person.person_type === 'Director') {
                        Object.assign(this.uneditedPerson, person);
                        this.trackChanges = true;
                    }

                    if (person.person_type === 'Alternate Director'){
                        this.alt_director = true;
                    }

                    this.person = person;
                    let check = moment(this.person.date_of_birth);

                    this.selDate = {
                        year: check.year(),
                        month: check.month() + 1,
                        day: check.date()
                    };

                    let checkAppointment = moment(this.person.appointment_date);
                    this.selDateAppointment = {
                        year: checkAppointment.year(),
                        month: checkAppointment.month() + 1,
                        day: checkAppointment.date()
                    };
                },
                ((error) => {
                    // console.log(error);
                }));
    }

    createOrUpdate() {
        if (this.storageBrowser.get("company_id")) {
            this.person.company_id = this.storageBrowser.get("company_id");
            this.person.date_of_birth = this.myDate["date_of_birth"]["formatted"];
            this.person.appointment_date = this.myDate["appointment_date"]["formatted"];
            if (this.person.id)
                this.updatePerson(this.person);
            else
                this.createPerson(this.person)
        } else {
            this.toastr.error('No company selected.', 'Failed.');
        }
    }

    createPerson(person: Person) {
        this.personApi.create(person).subscribe((person: Person) => {
                this.toastr.success('Officer created successfully', 'Success.');
                this.goToList();
            },
            this.handleError);
    }

    updatePerson(person: Person) {
        let personChanges = Array<PersonChanges>();
        if (this.trackChanges) {
            for (let key of Object.keys(person)) {
                if (person.hasOwnProperty(key)) {
                    //check difference
                    //exclude profile photo changes
                    if (person[key] !== this.uneditedPerson[key] && key != 'profile_photo') {
                        let personChange = new PersonChanges();
                        personChange.personId = person.id;
                        personChange.companyId = this.storageBrowser.get("company_id");
                        personChange.key = key;
                        personChange.value = person[key];
                        personChange.date_modified = new Date();

                        personChanges.push(personChange);
                    }
                }
            }
        }

        this.personApi.updateAttributes(person.id, person)
            .subscribe((updatePerson: Person) => {
                    if (this.trackChanges) {
                        this.personChangesApi.createMany(personChanges).subscribe((ps) => {
                                this.toastr.success('Officer updated successfully', 'Success.');
                                this.goToList();
                            },
                            this.handleError)
                    }
                    else {
                        this.toastr.success('Officer updated successfully', 'Success.');
                        this.goToList();
                    }
                },
                this.handleError);
    }

    goToList() {
        this.router.navigate(['/en/dashboard/officers']);
    }

    handleError(error) {
        this.toastr.error('Something went wrong.', 'Error.');
    }

    onDateChanged(event: IMyDateModel) {
        // Update value of selDate variable
        this.selDate = event.date;
    }

    onDateChangedAppointment(event: IMyDateModel) {
        // Update value of selDate variable
        this.selDateAppointment = event.date;
    }

    setPlaceholder($event) {
        let files = $event.target.files;
        let file = files[0];
        this.error = '';
        if (files && file) {
            if (!(file.size > 512000)) {
                let reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsBinaryString(file);
            }
            else {
                this.error = 'Image too large. Try again';
                this.placeholder = 'assets/img/image_placeholder.jpg';
            }
        }
    }

    _handleReaderLoaded(readerEvt) {
        let binaryString = readerEvt.target.result;
        this.placeholder = 'data:image/png;base64,' + btoa(binaryString);
        this.person.profile_photo = this.placeholder;
    }
}