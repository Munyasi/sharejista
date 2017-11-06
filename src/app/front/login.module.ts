import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing Module
import { LoginRoutingModule } from './login.routes';

import { LoginComponent } from './login.component';


@NgModule({
    imports: [
        CommonModule, LoginRoutingModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: []
})

export class LoginModule { }
