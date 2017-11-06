import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoopBackConfig } from './back/shared/sdk/index';
import { BASE_URL, API_VERSION } from './back/shared/base.url';
import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass: 'toast-top-right'
}

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToastsManager, {provide: ToastOptions, useClass: CustomOption}]
})
export class AppComponent {
  constructor(private toastr: ToastsManager, vRef: ViewContainerRef){
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
    this.toastr.setRootViewContainerRef(vRef);
  }
}
