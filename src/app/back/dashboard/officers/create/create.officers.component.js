"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var index_1 = require('../../../shared/sdk/models/index');
var index_2 = require('../../../shared/sdk/services/index');
var index_3 = require('../../../shared/sdk/index');
var moment = require('moment/moment');
var CreateOfficerComponent = (function () {
    function CreateOfficerComponent(personApi, route, router, toastr, personChangesApi, storageBrowser) {
        this.personApi = personApi;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.personChangesApi = personChangesApi;
        this.storageBrowser = storageBrowser;
        this.person = new index_1.Person();
        this.placeholder = 'assets/img/image_placeholder.jpg';
        this.uneditedPerson = new index_1.Person();
        this.myDate = {};
        this.myDatePickerOptions = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false
        };
        this.tab_num = "tab1";
    }
    CreateOfficerComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    CreateOfficerComponent.prototype.showNextTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    };
    CreateOfficerComponent.prototype.showPrevTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    };
    CreateOfficerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.getPersonById(params['id']);
            }
        });
    };
    CreateOfficerComponent.prototype.getPersonById = function (id) {
        var _this = this;
        this.personApi.findById(id)
            .subscribe(function (person) {
            if (person.person_type === 'Director') {
                Object.assign(_this.uneditedPerson, person);
                _this.trackChanges = true;
            }
            _this.person = person;
            var check = moment(_this.person.date_of_birth);
            _this.selDate = {
                year: check.year(),
                month: check.month() + 1,
                day: check.day()
            };
            var checkAppointment = moment(_this.person.appointment_date);
            _this.selDateAppointment = {
                year: checkAppointment.year(),
                month: checkAppointment.month() + 1,
                day: checkAppointment.day()
            };
        }, (function (error) {
            // console.log(error);
        }));
    };
    CreateOfficerComponent.prototype.createOrUpdate = function () {
        if (this.storageBrowser.get("company_id")) {
            this.person.company_id = this.storageBrowser.get("company_id");
            this.person.date_of_birth = this.myDate["date_of_birth"]["formatted"];
            this.person.appointment_date = this.myDate["appointment_date"]["formatted"];
            if (this.person.id)
                this.updatePerson(this.person);
            else
                this.createPerson(this.person);
        }
        else {
            this.toastr.error('No company selected.', 'Failed.');
        }
    };
    CreateOfficerComponent.prototype.createPerson = function (person) {
        var _this = this;
        this.personApi.create(person).
            subscribe(function (person) {
            _this.toastr.success('Officer created successfully', 'Success.');
            _this.goToList();
        }, this.handleError);
    };
    CreateOfficerComponent.prototype.updatePerson = function (person) {
        var _this = this;
        var personChanges = Array();
        if (this.trackChanges) {
            for (var _i = 0, _a = Object.keys(person); _i < _a.length; _i++) {
                var key = _a[_i];
                if (person.hasOwnProperty(key)) {
                    //check difference
                    //exclude profile photo changes
                    if (person[key] !== this.uneditedPerson[key] && key != 'profile_photo') {
                        var personChange = new index_1.PersonChanges();
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
            .subscribe(function (updatePerson) {
            if (_this.trackChanges) {
                _this.personChangesApi.createMany(personChanges).subscribe(function (ps) {
                    _this.toastr.success('Officer updated successfully', 'Success.');
                    _this.goToList();
                }, _this.handleError);
            }
            else {
                _this.toastr.success('Officer updated successfully', 'Success.');
                _this.goToList();
            }
        }, this.handleError);
    };
    CreateOfficerComponent.prototype.goToList = function () {
        this.router.navigate(['/en/dashboard/officers']);
    };
    CreateOfficerComponent.prototype.handleError = function (error) {
        this.toastr.error('Something went wrong.', 'Error.');
    };
    CreateOfficerComponent.prototype.onDateChanged = function (event) {
        // Update value of selDate variable
        this.selDate = event.date;
    };
    CreateOfficerComponent.prototype.onDateChangedAppointment = function (event) {
        // Update value of selDate variable
        this.selDateAppointment = event.date;
    };
    CreateOfficerComponent.prototype.setPlaceholder = function ($event) {
        var files = $event.target.files;
        var file = files[0];
        this.error = '';
        if (files && file) {
            if (!(file.size > 512000)) {
                var reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsBinaryString(file);
            }
            else {
                this.error = 'Image too large. Try again';
                this.placeholder = 'assets/img/image_placeholder.jpg';
            }
        }
    };
    CreateOfficerComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.placeholder = 'data:image/png;base64,' + btoa(binaryString);
        this.person.profile_photo = this.placeholder;
    };
    CreateOfficerComponent = __decorate([
        core_1.Component({
            selector: 'officer-create-cmp',
            moduleId: module.id,
            styleUrls: ['create.officers.component.css'],
            templateUrl: 'create.officers.component.html',
            providers: [index_2.PersonApi, index_2.PersonChangesApi, index_3.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_2.PersonApi, router_1.ActivatedRoute, router_1.Router, ng2_toastr_1.ToastsManager, index_2.PersonChangesApi, index_3.StorageBrowser])
    ], CreateOfficerComponent);
    return CreateOfficerComponent;
}());
exports.CreateOfficerComponent = CreateOfficerComponent;
//# sourceMappingURL=create.officers.component.js.map