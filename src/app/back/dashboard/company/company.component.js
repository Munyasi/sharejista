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
var index_1 = require('../../shared/sdk/models/index');
var index_2 = require('../../shared/sdk/services/index');
var index_3 = require('../../shared/sdk/index');
var daymonth_service_1 = require('../../daymonth.service');
var CompanyComponent = (function () {
    function CompanyComponent(companyApi, route, storageBrowser, dayMonth) {
        this.companyApi = companyApi;
        this.route = route;
        this.storageBrowser = storageBrowser;
        this.dayMonth = dayMonth;
        this.company = new index_1.Company();
        this.companyType = {};
        this.months = this.dayMonth.getMonths();
        this.tab_num = "tab1";
    }
    CompanyComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.getCompanyById(params['id']);
            }
            else {
                _this.getCurrentCompany();
            }
        });
    };
    CompanyComponent.prototype.getCurrentCompany = function () {
        var _this = this;
        this.companyApi.findOne({ where: { current: 1 }, include: "CompanyType" })
            .subscribe(function (company) {
            _this.company = company;
            _this.companyType = { id: company["CompanyType"].id, name: company["CompanyType"].name };
            _this.accounting_reference_date = _this.getDay(_this.company.accounting_reference_day) + ", " + _this.months[(_this.company.accounting_reference_month * 1) - 1];
            _this.annual_return_date = _this.getDay(_this.company.annual_return_day) + ", " + _this.months[(_this.company.annual_return_month * 1) - 1];
            _this.storageBrowser.set("company_id", company.id);
            _this.storageBrowser.set("company_name", company.company_name);
        }, (function (error) {
            // console.log(error);
        }));
    };
    CompanyComponent.prototype.getDay = function (number) {
        var day;
        if (number == 1) {
            day = "1st";
        }
        else if (number == 2) {
            day = "2nd";
        }
        else if (number == 3) {
            day = "3rd";
        }
        else {
            day = number + "th";
        }
        return day;
    };
    CompanyComponent.prototype.getCompanyById = function (id) {
        var _this = this;
        this.companyApi.updateAll({ current: 1 }, { current: 0 })
            .subscribe(function () {
            _this.companyApi.updateAll({ id: id }, { current: 1 })
                .subscribe(function () {
            });
        });
        this.companyApi.findById(id, { include: "CompanyType" })
            .subscribe(function (company) {
            _this.storageBrowser.set("company_id", id);
            _this.storageBrowser.set("company_name", company.company_name);
            _this.company = company;
            _this.companyType = { id: company["CompanyType"].id, name: company["CompanyType"].name };
            _this.accounting_reference_date = _this.getDay(_this.company.accounting_reference_day) + ", " + _this.months[(_this.company.accounting_reference_month * 1) - 1];
            _this.annual_return_date = _this.getDay(_this.company.annual_return_day) + ", " + _this.months[(_this.company.annual_return_month * 1) - 1];
        }, (function (error) {
            // console.log(error);
        }));
    };
    CompanyComponent = __decorate([
        core_1.Component({
            selector: 'company-cmp',
            moduleId: module.id,
            styleUrls: ['company.component.css'],
            templateUrl: 'company.component.html',
            providers: [index_2.CompanyApi, index_3.StorageBrowser, daymonth_service_1.DayMonthService]
        }), 
        __metadata('design:paramtypes', [index_2.CompanyApi, router_1.ActivatedRoute, index_3.StorageBrowser, daymonth_service_1.DayMonthService])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map