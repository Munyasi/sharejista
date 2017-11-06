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
var index_1 = require("../../../shared/sdk/services/custom/index");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var index_2 = require('../../../shared/sdk/index');
var base_url_1 = require('../../../shared/base.url');
var ExportShareholdersComponent = (function () {
    function ExportShareholdersComponent(shareholderApi, storageBrowser, toastr) {
        this.shareholderApi = shareholderApi;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
        this.exportConfig = new ExportConfig();
    }
    ExportShareholdersComponent.prototype.ngOnInit = function () {
        this.companyId = this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get('company_name');
        this.exportConfig.field = 'name';
        this.exportConfig.order = 'asc';
        this.exportConfig.type = 'doc';
    };
    ExportShareholdersComponent.prototype.downloadList = function () {
        var _this = this;
        console.log(this.exportConfig);
        var container = 'shareholders_list';
        var file = 'list_of_shareholders.docx';
        this.shareholderApi.generatelist(this.companyId, this.exportConfig)
            .subscribe(function (res) {
            if (res.data.success) {
                var fileUrl = base_url_1.BASE_URL + "/" + base_url_1.API_VERSION + "/outputs/shareholders_list/download/" + file;
                window.location.href = fileUrl;
            }
        }, function (err) {
            _this.toastr.error('Something went wrong. Please try again.');
        });
    };
    ExportShareholdersComponent = __decorate([
        core_1.Component({
            selector: 'exportshareholders-cmp',
            moduleId: module.id,
            styleUrls: ['export.component.css'],
            templateUrl: 'export.component.html',
            providers: [index_1.ShareholderApi, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.ShareholderApi, index_2.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], ExportShareholdersComponent);
    return ExportShareholdersComponent;
}());
exports.ExportShareholdersComponent = ExportShareholdersComponent;
var ExportConfig = (function () {
    function ExportConfig() {
    }
    return ExportConfig;
}());
exports.ExportConfig = ExportConfig;
//# sourceMappingURL=export.component.js.map