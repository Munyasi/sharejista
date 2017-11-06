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
var index_1 = require("../../shared/sdk/services/custom/index");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var index_2 = require('../../shared/sdk/index');
var ShareClassesComponent = (function () {
    function ShareClassesComponent(shareTypeApi, storageBrowser, toastr) {
        this.shareTypeApi = shareTypeApi;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
    }
    ShareClassesComponent.prototype.ngOnInit = function () {
        this.getShareClasses();
    };
    ShareClassesComponent.prototype.getShareClasses = function () {
        var _this = this;
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.shareTypeApi.find({ where: { 'company_id': this.storageBrowser.get("company_id") } }).subscribe(function (shareClasses) {
                _this.shareClasses = shareClasses;
            }, function (error) {
                _this.toastr.error('Something went wrong while fetching share classes, please reload to retry.');
            });
        }
        else {
            this.toastr.error('No company is selected.');
        }
    };
    ShareClassesComponent = __decorate([
        core_1.Component({
            selector: 'shareclasses-cmp',
            moduleId: module.id,
            styleUrls: ['shareclasses.component.css'],
            templateUrl: 'shareclasses.component.html',
            providers: [index_1.ShareTypeApi, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.ShareTypeApi, index_2.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], ShareClassesComponent);
    return ShareClassesComponent;
}());
exports.ShareClassesComponent = ShareClassesComponent;
//# sourceMappingURL=shareclasses.component.js.map