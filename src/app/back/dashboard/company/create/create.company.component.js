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
var daymonth_service_1 = require('../../../daymonth.service');
var moment = require("moment");
var _ = require("underscore");
var index_1 = require('../../../shared/sdk/models/index');
var index_2 = require('../../../shared/sdk/services/index');
var CreateCompanyComponent = (function () {
    function CreateCompanyComponent(companyApi, companyTypeApi, shareTypeApi, companyShareApi, route, router, toastr, dayMonth) {
        this.companyApi = companyApi;
        this.companyTypeApi = companyTypeApi;
        this.shareTypeApi = shareTypeApi;
        this.companyShareApi = companyShareApi;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.dayMonth = dayMonth;
        this.company = new index_1.Company();
        this.myDate = [];
        this.myDatePickerOptions = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false
        };
        this.myDatePickerOptions2 = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false
        };
        this.tab_num = "tab1";
        this.months = [];
        this.returnDays = [];
        this.referenceDays = [];
    }
    CreateCompanyComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    CreateCompanyComponent.prototype.showNextTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    };
    CreateCompanyComponent.prototype.showPrevTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    };
    CreateCompanyComponent.prototype.updateReturnDays = function (monthDay) {
        this.totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.returnDays = [];
        for (var d = 1; d <= this.totalDays; d++) {
            this.returnDays.push(d);
        }
    };
    CreateCompanyComponent.prototype.updateReferenceDays = function (monthDay) {
        this.totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.referenceDays = [];
        for (var d = 1; d <= this.totalDays; d++) {
            this.referenceDays.push(d);
        }
    };
    CreateCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.months = this.dayMonth.getMonths();
        this.shareTypeApi.getShareTypes().subscribe(function (sharesTypes) {
            _this.shareTypes = sharesTypes['data'];
        });
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.companyApi.findById(params['id']).subscribe(function (company) {
                    _this.company = company;
                });
            }
        });
        this.companyTypeApi.find()
            .subscribe(function (companyType) {
            _this.companyType = companyType;
        });
    };
    CreateCompanyComponent.prototype.updateNominalShareCapital = function () {
        var total = 0;
        _.each(this.shareTypes, function (data, index) {
            if (data['value'] > 0 && data['par_value'] > 0) {
                total += data['value'] * data['par_value'];
            }
        });
        this.company.nominal_share_capital = total;
    };
    CreateCompanyComponent.prototype.create = function () {
        var _this = this;
        this.company.incorporation_date = this.myDate["incorporation_date"]["formatted"];
        var companyObj = {
            'company': this.company,
            'share_types': this.shareTypes
        };
        this.companyApi.addCompany(companyObj)
            .subscribe(function (company) {
            _this.company = company['data'];
            _this.toastr.success('Company details added successfully', 'Success.');
            _this.goToList();
        }, function (error) {
            _this.toastr.error('Something went wrong');
        });
    };
    CreateCompanyComponent.prototype.goToList = function () {
        this.router.navigate(['/en/dashboard/' + this.company.id + '/home']);
    };
    CreateCompanyComponent = __decorate([
        core_1.Component({
            selector: 'company-create-cmp',
            moduleId: module.id,
            styleUrls: ['create.company.component.css'],
            templateUrl: 'create.company.component.html',
            providers: [index_2.CompanyApi, index_2.CompanyTypeApi, index_2.ShareTypeApi, index_2.CompanyShareApi, daymonth_service_1.DayMonthService]
        }), 
        __metadata('design:paramtypes', [index_2.CompanyApi, index_2.CompanyTypeApi, index_2.ShareTypeApi, index_2.CompanyShareApi, router_1.ActivatedRoute, router_1.Router, ng2_toastr_1.ToastsManager, daymonth_service_1.DayMonthService])
    ], CreateCompanyComponent);
    return CreateCompanyComponent;
}());
exports.CreateCompanyComponent = CreateCompanyComponent;
//# sourceMappingURL=create.company.component.js.map