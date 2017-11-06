import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
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
    this.toastr.setRootViewContainerRef(vRef);
  }
}
