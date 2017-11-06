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
var index_1 = require("../../../shared/sdk/index");
var ng2_toastr_1 = require('ng2-toastr/ng2-toastr');
var index_2 = require('../../../shared/sdk/index');
var base_url_1 = require('../../../shared/base.url');
var GenerateCR7Component = (function () {
    function GenerateCR7Component(cr7Api, storageBrowser, toastr) {
        this.cr7Api = cr7Api;
        this.storageBrowser = storageBrowser;
        this.toastr = toastr;
        this.cr7Config = new CR7Config();
        this.myDatePickerOptions = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false,
            showTodayBtn: true
        };
        this.toDateOptions = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false,
            showTodayBtn: true
        };
    }
    GenerateCR7Component.prototype.onFromDateChanged = function (event) {
        this.cr7Config.from = event;
    };
    GenerateCR7Component.prototype.onToDateChanged = function (event) {
        this.cr7Config.to = event;
    };
    GenerateCR7Component.prototype.ngOnInit = function () {
        this.companyId = +this.storageBrowser.get("company_id");
        this.companyName = this.storageBrowser.get("company_name");
        this.cr7Config.companyId = this.companyId;
    };
    GenerateCR7Component.prototype.generate = function () {
        var _this = this;
        this.cr7Api.generateCR7(this.cr7Config.companyId, this.cr7Config.from.formatted, this.cr7Config.to.formatted)
            .subscribe(function (res) {
            console.log(res);
            if (res.data.success === 0) {
                //failed
                _this.toastr.warning(res.data.message);
            }
            else {
                var filePath = res.data.path;
                window.location.href = base_url_1.BASE_URL + "/" + base_url_1.API_VERSION + "/outputs/CR7s/download/" + filePath;
                _this.toastr.info("Downloading CR7 form for " + _this.companyName);
            }
        }, function (error) {
            _this.toastr.error('Something went wrong. Please try again');
        });
    };
    GenerateCR7Component = __decorate([
        core_1.Component({
            selector: 'generateCR7-cmp',
            moduleId: module.id,
            styleUrls: ['generate.component.css'],
            templateUrl: 'generate.component.html',
            providers: [index_1.CR6Api, index_2.StorageBrowser]
        }), 
        __metadata('design:paramtypes', [index_1.CR6Api, index_2.StorageBrowser, ng2_toastr_1.ToastsManager])
    ], GenerateCR7Component);
    return GenerateCR7Component;
}());
exports.GenerateCR7Component = GenerateCR7Component;
var CR7Config = (function () {
    function CR7Config() {
    }
    return CR7Config;
}());
exports.CR7Config = CR7Config;
//# sourceMappingURL=generate.component.js.map