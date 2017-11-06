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
var Shares_1 = require("../../../shared/sdk/services/custom/Shares");
var ShareTransferComponent = (function () {
    function ShareTransferComponent(shareTransferApi, shareholderApi, shareTypeApi, sharesApi, companyApi, route, router, toastr, storageBrowser) {
        this.shareTransferApi = shareTransferApi;
        this.shareholderApi = shareholderApi;
        this.shareTypeApi = shareTypeApi;
        this.sharesApi = sharesApi;
        this.companyApi = companyApi;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.storageBrowser = storageBrowser;
        this.sharetransfer = new index_1.ShareTransfer();
        this.tab_num = "tab1";
    }
    ShareTransferComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    ShareTransferComponent.prototype.showNextTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    };
    ShareTransferComponent.prototype.showPrevTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    };
    ShareTransferComponent.prototype.ngOnInit = function () {
        if (this.storageBrowser.get('company_id')) {
            this.company_id = this.storageBrowser.get('company_id');
            this.company_name = this.storageBrowser.get('company_name');
            this.getShareholders();
            this.getSharesTypes();
        }
        else {
            this.toastr.error('No company selected.', 'Error');
        }
    };
    ShareTransferComponent.prototype.getShareholders = function () {
        var _this = this;
        this.shareholderApi.find({ where: { company_id: this.company_id } })
            .subscribe(function (shareholders) {
            _this.shareholders = shareholders;
        }, function (error) {
            console.log(error);
            _this.toastr.error('Something went wrong while fetching shareholders. Please reload to try again', 'Error');
        });
    };
    ShareTransferComponent.prototype.getSharesTypes = function () {
        var _this = this;
        this.shareTypeApi.find({ where: { company_id: this.company_id } })
            .subscribe(function (shareTypes) {
            _this.sharetypes = shareTypes;
        }, function (error) {
            _this.toastr.error('Something went wrong while fetching shares types. Please reload to try again.', 'Error');
        });
    };
    ShareTransferComponent.prototype.calculateTotalShares = function () {
        var _this = this;
        if (!(this.sharetransfer.transferer_id && this.sharetransfer.share_type_id))
            return;
        this.transferer_total_shares = 0;
        this.sharesApi.find({
            where: {
                and: [
                    { sharetype_id: this.sharetransfer.share_type_id },
                    { shareholder_id: this.sharetransfer.transferer_id }
                ]
            }
        })
            .subscribe(function (shares) {
            for (var _i = 0, shares_1 = shares; _i < shares_1.length; _i++) {
                var sh = shares_1[_i];
                _this.transferer_total_shares += parseInt(sh.number_of_shares.toString());
            }
        }, function (error) {
            _this.toastr.error('Something went wrong while fetching total shares.');
        });
    };
    ShareTransferComponent.prototype.createOrUpdate = function () {
        if (this.storageBrowser.get('company_id')) {
            this.sharetransfer.company_id = this.storageBrowser.get("company_id");
            this.sharetransfer.transferer_type = 'shareholder';
            if (this.sharetransfer.id)
                this.updateShareTransfer(this.sharetransfer);
            else
                this.createShareTransfer(this.sharetransfer);
        }
        else {
            this.toastr.error('No company selected.', 'Error');
        }
    };
    ShareTransferComponent.prototype.createShareTransfer = function (shareTransfer) {
        var _this = this;
        this.shareTransferApi.create(shareTransfer).
            subscribe(function (shareTransfer) {
            _this.toastr.success('Shares transfer created successfully. Please await approval', 'Success.');
            _this.goToList();
        }, this.handleError);
    };
    ShareTransferComponent.prototype.updateShareTransfer = function (shareTransfer) {
        var _this = this;
        this.shareTransferApi.updateAttributes(shareTransfer.id, shareTransfer)
            .subscribe(function (shareTransfer) {
            _this.toastr.success('Shares transfer initiated successfully', 'Success.');
        }, this.handleError);
    };
    ShareTransferComponent.prototype.goToList = function () {
        this.router.navigate(['en/dashboard/sharetransfers']);
    };
    ShareTransferComponent.prototype.handleError = function (error) {
        this.toastr.error('Something went wrong.', 'Error.');
    };
    ShareTransferComponent = __decorate([
        core_1.Component({
            selector: 'sharetransfer-cmp',
            moduleId: module.id,
            styleUrls: ['./sharetransfer.component.css'],
            templateUrl: './sharetransfer.component.html',
            providers: [index_2.ShareTransferApi, index_2.ShareholderApi, index_2.ShareTypeApi, Shares_1.SharesApi, index_2.CompanyApi, index_3.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_2.ShareTransferApi, index_2.ShareholderApi, index_2.ShareTypeApi, Shares_1.SharesApi, index_2.CompanyApi, router_1.ActivatedRoute, router_1.Router, ng2_toastr_1.ToastsManager, index_3.StorageBrowser])
    ], ShareTransferComponent);
    return ShareTransferComponent;
}());
exports.ShareTransferComponent = ShareTransferComponent;
//# sourceMappingURL=sharetransfer.component.js.map