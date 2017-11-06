import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SDKBrowserModule } from './back/shared/sdk/index';

import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';


import { FooterModule } from './back/shared/footer/footer.module';

// Routing Module
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FooterModule,
    ToastModule.forRoot(),
    SDKBrowserModule.forRoot(),
    ReactiveFormsModule,
    NgProgressModule
  ],
  providers: [{ provide: BrowserXhr, useClass: NgProgressBrowserXhr }],
  bootstrap: [AppComponent]
})
export class AppModule { }
