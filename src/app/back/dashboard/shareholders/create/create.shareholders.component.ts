import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Shareholder } from '../../../shared/sdk/models/index';
import { ShareholderApi } from '../../../shared/sdk/services/index';
import {StorageBrowser} from '../../../shared/sdk/index';
import {IMyDpOptions, IMyDate, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment-mini';

@Component({
    selector: 'shareholders-create-cmp',
    moduleId: module.id,
    styleUrls: ['create.shareholders.component.css'],
    templateUrl: 'create.shareholders.component.html',
    providers: [ShareholderApi,StorageBrowser]
})

export class CreateShareholderComponent implements OnInit{
    shareholder = new  Shareholder();
    placeholder = 'assets/img/image_placeholder.jpg';
    error: string;
    myDate = {};
    private selDate: IMyDate;

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy/mm/dd',
        editableDateField: false
    };

    constructor(private shareholderApi: ShareholderApi,
                private route: ActivatedRoute,
                private router: Router,
                private toastr: ToastsManager ,
                private  storageBrowser: StorageBrowser) {
        //set person to a officer
        this.shareholder.type = "";
    }

    tab_num = "tab1";

    showTab(index){
        this.tab_num = "tab"+index;
    }

    showNextTab(){
        let tabIndex = parseInt(this.tab_num.slice(-1))+1;
        this.tab_num = "tab"+tabIndex;
    }

    showPrevTab(){
        let tabIndex = parseInt(this.tab_num.slice(-1))-1;
        this.tab_num = "tab"+tabIndex;
    }

    ngOnInit(){
        this.route.params.subscribe(params => {
            if(params['id']){
                this.getShareholderById(params['id']);
            }
        });
    }

    getShareholderById(id: number){
        this.shareholderApi.findById(id)
            .subscribe((shareholder: Shareholder) => {
                    this.shareholder = shareholder;

                    let check = moment(this.shareholder.appointment_date);
                    let month = check.month() + 1;
                    let day   = check.date();
                    let year  = check.year();
                    this.selDate = {year: year, month: month, day: day};

                },
                ((error) => {
                    // console.log(error);
                }));
    }

    createOrUpdate(){
        this.shareholder.company_id = this.storageBrowser.get("company_id");
        this.shareholder.appointment_date = this.myDate["appointment_date"]["formatted"];
        console.log(this.shareholder);
        if(this.shareholder.id)
            this.updatePerson(this.shareholder);
        else
            this.createPerson(this.shareholder)
    }

    createPerson(shareholder: Shareholder){
        this.shareholderApi.create(shareholder).
        subscribe((shareholder: Shareholder) => {
                this.toastr.success('Officer created successfully', 'Success.');
                this.goToList();
            },
            this.handleError);
    }

    updatePerson(shareholder: Shareholder){
        this.shareholderApi.updateAttributes(shareholder.id, shareholder)
            .subscribe((shareholder: Shareholder) =>{
                    this.toastr.success('Officer updated successfully', 'Success.');
                    this.goToList();
                },
                this.handleError);
    }

    goToList(){
        this.router.navigate(['/en/dashboard/shareholders']);
    }

    handleError(error){
        this.toastr.error('Something went wrong.', 'Error.');
    }

    setPlaceholder($event){
        let files = $event.target.files;
        let file = files[0];
        this.error = '';
        if (files && file) {
            if(!(file.size > 512000)){
                let reader = new FileReader();
                reader.onload =this._handleReaderLoaded.bind(this);
                reader.readAsBinaryString(file);
            }
            else{
                this.error = 'Image too large. Try again';
                this.placeholder =  'assets/img/image_placeholder.jpg';
            }
        }
    }

    onDateChanged(event: IMyDateModel) {
        // Update value of selDate variable
        this.selDate = event.date;
    }

    _handleReaderLoaded(readerEvt) {
        let binaryString = readerEvt.target.result;
        this.placeholder= 'data:image/png;base64,' + btoa(binaryString);
        this.shareholder.profile_photo = this.placeholder;
    }
}

