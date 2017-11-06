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
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var index_1 = require('../../../shared/sdk/models/index');
var index_2 = require('../../../shared/sdk/services/index');
var index_3 = require('../../../shared/sdk/index');
var router_1 = require('@angular/router');
var ShareholderComponent = (function () {
    function ShareholderComponent(shareholdersService, toastr, route, storageBrowser) {
        this.shareholdersService = shareholdersService;
        this.toastr = toastr;
        this.route = route;
        this.storageBrowser = storageBrowser;
        this.tab_num = "tab1";
        this.shareholder = new index_1.Shareholder();
    }
    ShareholderComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    ShareholderComponent.prototype.ngOnInit = function () {
        this.getShareholder();
    };
    ShareholderComponent.prototype.getShareholder = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = +params['id'];
            console.log(id);
            _this.shareholdersService.findById(id)
                .subscribe(function (shareholder) {
                console.log(shareholder);
                _this.shareholder = shareholder;
            }, function (error) {
                _this.toastr.error('Something went wrong while fetching shareholders. Please reload to retry.');
            });
        });
    };
    ShareholderComponent = __decorate([
        core_1.Component({
            selector: 'shareholders-cmp',
            moduleId: module.id,
            styleUrls: ['shareholder.component.css', '../../home/home.component.css'],
            templateUrl: 'shareholder.component.html',
            providers: [index_2.ShareholderApi, index_3.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_2.ShareholderApi, ng2_toastr_1.ToastsManager, router_1.ActivatedRoute, index_3.StorageBrowser])
    ], ShareholderComponent);
    return ShareholderComponent;
}());
exports.ShareholderComponent = ShareholderComponent;
//# sourceMappingURL=shareholder.component.js.map