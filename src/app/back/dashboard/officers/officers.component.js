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
var index_1 = require('../../shared/sdk/services/index');
var index_2 = require('../../shared/sdk/index');
var OfficersComponent = (function () {
    function OfficersComponent(personService, toastr, storageBrowser) {
        this.personService = personService;
        this.toastr = toastr;
        this.storageBrowser = storageBrowser;
    }
    OfficersComponent.prototype.ngOnInit = function () {
        this.getOfficers();
    };
    OfficersComponent.prototype.getOfficers = function () {
        var _this = this;
        if (this.storageBrowser.get("company_id")) {
            this.company_name = this.storageBrowser.get("company_name");
            this.personService.find({ where: { company_id: this.storageBrowser.get("company_id") } })
                .subscribe(function (officers) {
                _this.officers = officers;
            }, function (error) {
                _this.toastr.error('Something went wrong while fetching officers. Please reload to retry.');
            });
        }
        else {
            this.toastr.error('No company selected.');
        }
    };
    OfficersComponent = __decorate([
        core_1.Component({
            selector: 'officers-cmp',
            moduleId: module.id,
            styleUrls: ['officers.component.css'],
            templateUrl: 'officers.component.html',
            providers: [index_1.PersonApi, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.PersonApi, ng2_toastr_1.ToastsManager, index_2.StorageBrowser])
    ], OfficersComponent);
    return OfficersComponent;
}());
exports.OfficersComponent = OfficersComponent;
//# sourceMappingURL=officers.component.js.map