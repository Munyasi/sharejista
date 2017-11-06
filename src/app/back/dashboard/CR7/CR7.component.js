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
var index_1 = require("../../shared/sdk/index");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var index_2 = require('../../shared/sdk/index');
var base_url_1 = require('../../shared/base.url');
var CR7ListComponent = (function () {
    function CR7ListComponent(CR7Api, storageBrowser, toastr) {
        this.CR7Api = CR7Api;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
        this.companyId = +this.storageBrowser.get('company_id');
        this.companyName = this.storageBrowser.get('company_name');
    }
    CR7ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.CR7Api.find({ where: { companyId: this.companyId }, order: 'date DESC' })
            .subscribe(function (cr7s) {
            _this.CR7Items = cr7s;
        }, function (err) {
            console.log(err);
        });
    };
    CR7ListComponent.prototype.download = function (name) {
        window.location.href = base_url_1.BASE_URL + "/" + base_url_1.API_VERSION + "/outputs/CR7s/download/" + name;
    };
    CR7ListComponent = __decorate([
        core_1.Component({
            selector: 'cr7-cmp',
            moduleId: module.id,
            styleUrls: ['CR7.component.css'],
            templateUrl: 'CR7.component.html',
            providers: [index_1.CR6Api, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.CR6Api, index_2.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], CR7ListComponent);
    return CR7ListComponent;
}());
exports.CR7ListComponent = CR7ListComponent;
//# sourceMappingURL=CR7.component.js.map