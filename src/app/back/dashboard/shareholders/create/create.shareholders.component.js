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
var CreateShareholderComponent = (function () {
    function CreateShareholderComponent(shareholderApi, route, router, toastr, storageBrowser) {
        this.shareholderApi = shareholderApi;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.storageBrowser = storageBrowser;
        this.shareholder = new index_1.Shareholder();
        this.placeholder = 'assets/img/image_placeholder.jpg';
        this.myDate = {};
        this.myDatePickerOptions = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false
        };
        this.tab_num = "tab1";
        //set person to a officer
        this.shareholder.type = "";
    }
    CreateShareholderComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    CreateShareholderComponent.prototype.showNextTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    };
    CreateShareholderComponent.prototype.showPrevTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    };
    CreateShareholderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.getShareholderById(params['id']);
            }
        });
    };
    CreateShareholderComponent.prototype.getShareholderById = function (id) {
        var _this = this;
        this.shareholderApi.findById(id)
            .subscribe(function (shareholder) {
            _this.shareholder = shareholder;
            var check = moment(_this.shareholder.appointment_date);
            var month = check.month() + 1;
            var day = check.date();
            var year = check.year();
            _this.selDate = { year: year, month: month, day: day };
        }, (function (error) {
            // console.log(error);
        }));
    };
    CreateShareholderComponent.prototype.createOrUpdate = function () {
        this.shareholder.company_id = this.storageBrowser.get("company_id");
        this.shareholder.appointment_date = this.myDate["appointment_date"]["formatted"];
        console.log(this.shareholder);
        if (this.shareholder.id)
            this.updatePerson(this.shareholder);
        else
            this.createPerson(this.shareholder);
    };
    CreateShareholderComponent.prototype.createPerson = function (shareholder) {
        var _this = this;
        this.shareholderApi.create(shareholder).
            subscribe(function (shareholder) {
            _this.toastr.success('Officer created successfully', 'Success.');
            _this.goToList();
        }, this.handleError);
    };
    CreateShareholderComponent.prototype.updatePerson = function (shareholder) {
        var _this = this;
        this.shareholderApi.updateAttributes(shareholder.id, shareholder)
            .subscribe(function (shareholder) {
            _this.toastr.success('Officer updated successfully', 'Success.');
            _this.goToList();
        }, this.handleError);
    };
    CreateShareholderComponent.prototype.goToList = function () {
        this.router.navigate(['/en/dashboard/shareholders']);
    };
    CreateShareholderComponent.prototype.handleError = function (error) {
        this.toastr.error('Something went wrong.', 'Error.');
    };
    CreateShareholderComponent.prototype.setPlaceholder = function ($event) {
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
    CreateShareholderComponent.prototype.onDateChanged = function (event) {
        // Update value of selDate variable
        this.selDate = event.date;
    };
    CreateShareholderComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        this.placeholder = 'data:image/png;base64,' + btoa(binaryString);
        this.shareholder.profile_photo = this.placeholder;
    };
    CreateShareholderComponent = __decorate([
        core_1.Component({
            selector: 'shareholders-create-cmp',
            moduleId: module.id,
            styleUrls: ['create.shareholders.component.css'],
            templateUrl: 'create.shareholders.component.html',
            providers: [index_2.ShareholderApi, index_3.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_2.ShareholderApi, router_1.ActivatedRoute, router_1.Router, ng2_toastr_1.ToastsManager, index_3.StorageBrowser])
    ], CreateShareholderComponent);
    return CreateShareholderComponent;
}());
exports.CreateShareholderComponent = CreateShareholderComponent;
//# sourceMappingURL=create.shareholders.component.js.map