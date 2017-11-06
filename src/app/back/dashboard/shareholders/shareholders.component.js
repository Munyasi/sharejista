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
var index_1 = require('../../shared/sdk/services/index');
var index_2 = require('../../shared/sdk/index');
var ShareholdersComponent = (function () {
    function ShareholdersComponent(shareholdersService, toastr, router, storageBrowser) {
        this.shareholdersService = shareholdersService;
        this.toastr = toastr;
        this.router = router;
        this.storageBrowser = storageBrowser;
    }
    ShareholdersComponent.prototype.ngOnInit = function () {
        this.getShareholders();
    };
    ShareholdersComponent.prototype.getShareholders = function () {
        var _this = this;
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.shareholdersService.find({ where: { company_id: this.storageBrowser.get("company_id") } })
                .subscribe(function (shareholders) {
                console.log(shareholders);
                _this.shareholders = shareholders;
            }, function (error) {
                _this.toastr.error('Something went wrong while fetching shareholders. Please reload to retry.');
            });
        }
        else {
            this.toastr.error('No company is selected.');
        }
    };
    ShareholdersComponent.prototype.goToDownloadList = function () {
        this.router.navigate(['/en/dashboard/shareholders/exportConfig']);
    };
    ShareholdersComponent = __decorate([
        core_1.Component({
            selector: 'shareholders-cmp',
            moduleId: module.id,
            styleUrls: ['shareholders.component.css', '../home/home.component.css'],
            templateUrl: 'shareholders.component.html',
            providers: [index_1.ShareholderApi, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.ShareholderApi, ng2_toastr_1.ToastsManager, router_1.Router, index_2.StorageBrowser])
    ], ShareholdersComponent);
    return ShareholdersComponent;
}());
exports.ShareholdersComponent = ShareholdersComponent;
//# sourceMappingURL=shareholders.component.js.map