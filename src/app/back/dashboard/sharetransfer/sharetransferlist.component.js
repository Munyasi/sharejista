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
var ShareTransferListComponent = (function () {
    function ShareTransferListComponent(shareTransferApi, shareholderApi, storageBrowser, toastr) {
        this.shareTransferApi = shareTransferApi;
        this.shareholderApi = shareholderApi;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
    }
    ShareTransferListComponent.prototype.ngOnInit = function () {
        this.getShareTransfers();
    };
    ShareTransferListComponent.prototype.getShareTransfers = function () {
        var _this = this;
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.shareTransferApi.listTransfers(this.storageBrowser.get('company_id'))
                .subscribe(function (shareTransfers) {
                _this.shareTransfers = shareTransfers['data'];
            }, function (error) {
                _this.toastr.error('Something went wrong while fetching share transfers, please reload to retry.');
            });
        }
    };
    ShareTransferListComponent.prototype.approveTransfer = function (shareTransferId, transferer_type, action) {
        var _this = this;
        this.shareTransferApi.approveTransfer(shareTransferId, transferer_type, action)
            .subscribe(function (res) {
            if (res.data.name === "INADEQUATE_SHARES") {
                return _this.toastr.error(res.data.message);
            }
            else {
                _this.toastr.success('Share transfer successfully approved');
                _this.getShareTransfers(); //reload share transfer list
            }
        }, function (error) {
            _this.toastr.error('Something went wrong in the share transfer approval. Please try again.');
        });
    };
    ShareTransferListComponent = __decorate([
        core_1.Component({
            selector: 'sharetransferlist-cmp',
            moduleId: module.id,
            styleUrls: ['sharetransferlist.component.css'],
            templateUrl: 'sharetransferlist.component.html',
            providers: [index_1.ShareTransferApi, index_1.ShareholderApi, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.ShareTransferApi, index_1.ShareholderApi, index_2.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], ShareTransferListComponent);
    return ShareTransferListComponent;
}());
exports.ShareTransferListComponent = ShareTransferListComponent;
//# sourceMappingURL=sharetransferlist.component.js.map