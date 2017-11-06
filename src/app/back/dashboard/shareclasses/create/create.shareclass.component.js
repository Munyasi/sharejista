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
var CreateShareClassComponent = (function () {
    function CreateShareClassComponent(sharesTypeApi, route, router, storageBrowser, toastr) {
        this.sharesTypeApi = sharesTypeApi;
        this.route = route;
        this.router = router;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
        this.sharetype = new index_1.ShareType();
    }
    CreateShareClassComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.route.params.subscribe(function (params) {
                if (params['id']) {
                    _this.getShareClassById(params['id']);
                }
            });
        }
        else {
            this.toastr.error('No company is selected.');
        }
    };
    CreateShareClassComponent.prototype.getShareClassById = function (id) {
        var _this = this;
        this.sharesTypeApi.findById(id)
            .subscribe(function (sc) {
            _this.sharetype = sc;
        }, (function (error) {
            // console.log(error);
        }));
    };
    CreateShareClassComponent.prototype.createOrUpdate = function () {
        if (this.storageBrowser.get('company_id')) {
            this.sharetype.company_id = this.storageBrowser.get('company_id');
            if (this.sharetype.id)
                this.updateShareClass(this.sharetype);
            else
                this.createShareClass(this.sharetype);
        }
    };
    CreateShareClassComponent.prototype.createShareClass = function (shareclass) {
        var _this = this;
        this.sharesTypeApi.create(shareclass).subscribe(function (sharetype) {
            _this.toastr.success('Share class created successfully', 'Success.');
            _this.goToList();
        }, this.handleError);
    };
    CreateShareClassComponent.prototype.updateShareClass = function (sharetype) {
        var _this = this;
        this.sharesTypeApi.upsert(sharetype)
            .subscribe(function (updatedShareType) {
            _this.toastr.success('Share class updated successfully', 'Success.');
            _this.goToList();
        }, this.handleError);
    };
    CreateShareClassComponent.prototype.goToList = function () {
        this.router.navigate(['/en/dashboard/shareclasses']);
    };
    CreateShareClassComponent.prototype.handleError = function (error) {
        this.toastr.error('Something went wrong.', 'Error.');
    };
    CreateShareClassComponent = __decorate([
        core_1.Component({
            selector: 'officer-create-cmp',
            moduleId: module.id,
            styleUrls: ['create.shareclass.component.css'],
            templateUrl: 'create.shareclass.component.html',
            providers: [index_2.ShareTypeApi, index_3.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_2.ShareTypeApi, router_1.ActivatedRoute, router_1.Router, index_3.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], CreateShareClassComponent);
    return CreateShareClassComponent;
}());
exports.CreateShareClassComponent = CreateShareClassComponent;
//# sourceMappingURL=create.shareclass.component.js.map