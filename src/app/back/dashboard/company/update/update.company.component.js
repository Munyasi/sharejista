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
var moment = require('moment/moment');
var daymonth_service_1 = require('../../../daymonth.service');
var _ = require("underscore");
var index_1 = require('../../../shared/sdk/models/index');
var index_2 = require('../../../shared/sdk/services/index');
var UpdateCompanyComponent = (function () {
    function UpdateCompanyComponent(companyApi, companyTypeApi, shareTypeApi, route, router, toastr, dayMonth) {
        this.companyApi = companyApi;
        this.companyTypeApi = companyTypeApi;
        this.shareTypeApi = shareTypeApi;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.dayMonth = dayMonth;
        this.company = new index_1.Company();
        this.myDate = [];
        this.myDatePickerOptions = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false
        };
        this.myDatePickerOptions2 = {
            dateFormat: 'yyyy/mm/dd',
            editableDateField: false
        };
        this.tab_num = "tab1";
        this.months = this.dayMonth.getMonths();
        this.returnDays = [];
        this.referenceDays = [];
        this.changed_indexes = [];
    }
    UpdateCompanyComponent.prototype.showTab = function (index) {
        this.tab_num = "tab" + index;
    };
    UpdateCompanyComponent.prototype.showNextTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) + 1;
        this.tab_num = "tab" + tabIndex;
    };
    UpdateCompanyComponent.prototype.showPrevTab = function () {
        var tabIndex = parseInt(this.tab_num.slice(-1)) - 1;
        this.tab_num = "tab" + tabIndex;
    };
    UpdateCompanyComponent.prototype.updateReturnDays = function (monthDay) {
        var totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.returnDays = [];
        for (var d = 1; d <= totalDays; d++) {
            this.returnDays.push(d);
        }
    };
    UpdateCompanyComponent.prototype.updateReferenceDays = function (monthDay) {
        var totalDays = moment(moment().year() + "-" + (monthDay * 1 + 1), "YYYY-MM").daysInMonth();
        this.referenceDays = [];
        for (var d = 1; d <= totalDays; d++) {
            this.referenceDays.push(d);
        }
    };
    UpdateCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.companyApi.findById(params['id'], { include: ["CompanyType", "CompanyShare", "ShareType"] }).
                    subscribe(function (company) {
                    _this.company = company;
                    _this.shares = _this.aggregateShares(_this.company["ShareType"], _this.company["CompanyShare"], company.id);
                    _this.shares_orig = JSON.parse(JSON.stringify(_this.shares));
                    _this.updateReturnDays(_this.company.annual_return_month);
                    _this.updateReferenceDays(_this.company.accounting_reference_month);
                    var check = moment(_this.company.incorporation_date);
                    var month = check.month() + 1;
                    var day = check.date();
                    var year = check.year();
                    _this.selDate = { year: year, month: month, day: day };
                    _this.myDate["incorporation_date"] = { date: { year: year, month: month, day: day } };
                });
            }
        });
        this.companyTypeApi.find()
            .subscribe(function (companyType) {
            _this.companyType = companyType;
        });
    };
    UpdateCompanyComponent.prototype.aggregateShares = function (shareType, cmpShares, company_id) {
        var cmp_shares = [];
        var count = 0;
        _.forEach(shareType, function (value, index) {
            _.forEach(cmpShares, function (value2, index2) {
                if (value['id'] == value2['share_type_id']) {
                    cmp_shares[count] = {
                        id: value2['id'],
                        company_id: company_id,
                        share_type_id: value2['share_type_id'],
                        share_type_description: value['description'],
                        share_type_transferrable: value['transferrable'],
                        unissued_shares: value2['unissued_shares'],
                        share_number: value2['share_number'],
                        par_value: value['par_value'],
                        type_name: value['name']
                    };
                    count++;
                }
            });
        });
        if (shareType.length > cmpShares.length) {
            var new_shares = shareType.slice(-(shareType.length - cmpShares.length));
            _.forEach(new_shares, function (value, index) {
                cmp_shares[count] = {
                    company_id: company_id,
                    share_type_id: value['id'],
                    unissued_shares: null,
                    share_number: null,
                    par_value: null,
                    type_name: value['name'],
                    share_type_description: value['description'],
                    share_type_transferrable: value['transferrable'],
                    new_type: true
                };
                count++;
            });
        }
        return cmp_shares;
    };
    UpdateCompanyComponent.prototype.updateChangedIndex = function (index) {
        this.changed_indexes.push(index);
        this.changed_indexes = _.uniq(this.changed_indexes);
    };
    UpdateCompanyComponent.prototype.isChangedIndex = function (index, changedIndexes) {
        if (changedIndexes.length > 0) {
            _.forEach(changedIndexes, function (value2, index2) {
                if (index == value2) {
                    return true;
                }
            });
        }
        return false;
    };
    UpdateCompanyComponent.prototype.getDiff = function (shares, shares_orig, changedIndexes) {
        var changed = [];
        var count = 0;
        _.forEach(shares, function (value, index) {
            _.forEach(shares_orig, function (value2, index2) {
                if (index == index2) {
                    if (changedIndexes.length > 0) {
                        //check if value was adjusted
                        _.forEach(changedIndexes, function (value3, index3) {
                            if (index == value3) {
                                //unissued shares holds the new value of unissued shares
                                var unissued_shares = void 0;
                                if (value['new_type']) {
                                    unissued_shares = value['share_number'];
                                }
                                else {
                                    unissued_shares = value2['unissued_shares'] + (value['share_number'] - value2['share_number']);
                                }
                                if (unissued_shares >= 0) {
                                    value['unissued_shares'] = unissued_shares;
                                    changed[count] = value;
                                    count++;
                                }
                            }
                        });
                    }
                }
            });
        });
        return changed;
    };
    UpdateCompanyComponent.prototype.updateNominalShareCapital = function () {
        var total = 0;
        _.each(this.shares, function (data, index) {
            if (data['share_number'] > 0 && data['par_value'] > 0) {
                total += data['share_number'] * data['par_value'];
            }
        });
        this.company.nominal_share_capital = total;
    };
    UpdateCompanyComponent.prototype.onDateChanged = function (event) {
        this.selDate = event.date;
        var incorporation_date = new Date(event.date.year + "/" + event.date.month + "/" + event.date.day);
        this.company.incorporation_date = incorporation_date;
    };
    UpdateCompanyComponent.prototype.updateCompany = function () {
        var _this = this;
        event.preventDefault();
        var shares = this.getDiff(this.shares, this.shares_orig, this.changed_indexes);
        this.companyApi.updateCompany({ company: this.company, company_shares: shares })
            .subscribe(function (updateCompany) {
            _this.toastr.success('Company details updated successfully', 'Success.');
            _this.goToList();
        });
    };
    UpdateCompanyComponent.prototype.goToList = function () {
        this.router.navigate(['/en/dashboard/company']);
    };
    UpdateCompanyComponent = __decorate([
        core_1.Component({
            selector: 'company-update-cmp',
            moduleId: module.id,
            styleUrls: ['update.company.component.css'],
            templateUrl: 'update.company.component.html',
            providers: [index_2.CompanyApi, index_2.CompanyTypeApi, index_2.ShareTypeApi, daymonth_service_1.DayMonthService]
        }), 
        __metadata('design:paramtypes', [index_2.CompanyApi, index_2.CompanyTypeApi, index_2.ShareTypeApi, router_1.ActivatedRoute, router_1.Router, ng2_toastr_1.ToastsManager, daymonth_service_1.DayMonthService])
    ], UpdateCompanyComponent);
    return UpdateCompanyComponent;
}());
exports.UpdateCompanyComponent = UpdateCompanyComponent;
//# sourceMappingURL=update.company.component.js.map