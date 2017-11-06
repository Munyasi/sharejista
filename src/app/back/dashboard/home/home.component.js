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
var index_1 = require('../../shared/sdk/models/index');
var index_2 = require('../../shared/sdk/services/index');
var index_3 = require('../../shared/sdk/index');
var HomeComponent = (function () {
    function HomeComponent(companyApi, route, storageBrowser, toastr) {
        this.companyApi = companyApi;
        this.route = route;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
        this.company = new index_1.Company();
    }
    HomeComponent.prototype.ngOnInit = function () {
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
    HomeComponent.prototype.getCurrentCompany = function () {
        var _this = this;
        this.companyApi.findOne({ where: { current: 1 }, include: "CompanyType" })
            .subscribe(function (company) {
            _this.company = company;
            _this.storageBrowser.set("company_id", company.id);
            _this.storageBrowser.set("company_name", company.company_name);
        }, (function (error) {
            // console.log(error);
        }));
    };
    HomeComponent.prototype.getCompanyById = function (id) {
        var _this = this;
        this.companyApi.updateAll({ current: 1 }, { current: 0 })
            .subscribe(function () {
            _this.companyApi.updateAll({ id: id }, { current: 1 })
                .subscribe(function () {
            });
        });
        this.companyApi.findById(id, { include: "CompanyType" })
            .subscribe(function (company) {
            _this.company = company;
            _this.storageBrowser.set("company_id", id);
            _this.storageBrowser.set("company_name", company.company_name);
        }, (function (error) {
        }));
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-cmp',
            moduleId: module.id,
            styleUrls: ['home.component.css'],
            templateUrl: 'home.component.html',
            providers: [index_2.CompanyApi, index_3.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_2.CompanyApi, router_1.ActivatedRoute, index_3.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map