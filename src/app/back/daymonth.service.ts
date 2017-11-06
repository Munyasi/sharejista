import { Injectable } from '@angular/core';


@Injectable()
export class DayMonthService {

    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    getMonths() {
        return this.months;
    }



}