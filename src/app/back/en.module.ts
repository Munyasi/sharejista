import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDatePickerModule } from 'mydatepicker';
import { Ng2OrderModule } from 'ng2-order-pipe';
/*import { OrderBy } from './pipes/orderby.pipes';*/
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FooterModule} from './shared/footer/footer.module';

import { NgUploaderModule } from './shared/ngx-uploader/module/ngx-uploader.module';

import {EnComponent} from './en.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './dashboard/home/home.component';
import {CompanyComponent} from './dashboard/company/company.component';
import {OfficersComponent} from './dashboard/officers/officers.component';
import {ShareholdersComponent} from './dashboard/shareholders/shareholders.component';
import { ShareholdersUploadComponent } from './dashboard/shareholders/shareholders-upload/shareholders-upload.component';
import {ShareClassesComponent} from './dashboard/shareclasses/shareclasses.component';
import {WizardComponent} from './wizard/wizard.component';
import {CreateShareholderComponent} from './dashboard/shareholders/create/create.shareholders.component';
import {CreateOfficerComponent} from './dashboard/officers/create/create.officers.component';
import {CompanysListComponent} from './companylist/companylist.component';
import {CreateCompanyComponent} from './dashboard/company/create/create.company.component';
import {UpdateCompanyComponent} from './dashboard/company/update/update.company.component';
import {CreateShareClassComponent} from './dashboard/shareclasses/create/create.shareclass.component';
import {ShareTransferComponent} from './dashboard/sharetransfer/create/sharetransfer.component';
import {ShareTransferListComponent} from './dashboard/sharetransfer/sharetransferlist.component';
import {ShareAllotmentComponent} from './dashboard/shareallotment/create/shareallotment.component';
import {ShareAllotmentListComponent} from './dashboard/shareallotment/shareallotmentlist.component';
import {ShareholderComponent} from './dashboard/shareholders/shareholder/shareholder.component';
import {ExportShareholdersComponent} from './dashboard/shareholders/export/export.component';
import {CR7ListComponent} from './dashboard/CR7/CR7.component';
import {GenerateCR7Component} from './dashboard/CR7/generate/generate.component';
import {OfficerComponent} from './dashboard/officers/officer/officer.component';
import {CR6ListComponent} from './dashboard/CR6/cr6.component';
import {GenerateCR6Component} from './dashboard/CR6/generate/generate.component';
import {CR8ListComponent} from './dashboard/CR8/cr8.component';
import {GenerateCR8Component} from './dashboard/CR8/generate/generate.component';
import {AppointSecretaryComponent} from './dashboard/officers/appoint/appoint.component';
import {TerminateDirectorComponent} from './dashboard/officers/terminate/terminate.component';
import {CR9ListComponent} from './dashboard/CR9/cr9.component';
import {GenerateCR9Component} from './dashboard/CR9/generate/generate.component';
import {CR20ListComponent} from './dashboard/CR20/cr20.component';
import {GenerateCR20Component} from './dashboard/CR20/generate/generate.component';
import {AnnualReturnsListComponent} from './dashboard/annual-returns-list/annual-returns-list.component';
import {GenerateAnnualReturnComponent} from './dashboard/annual-returns-list/generate/generate.component';

// Routing Module
import { EnRoutingModule } from './en.routes';
import { CanActivateViaAuthGuard } from './shared/guards/canactivate.guard';


@NgModule({
    imports: [
        CommonModule, EnRoutingModule, FormsModule, ReactiveFormsModule, MyDatePickerModule,
        NavbarModule,
        FooterModule,
        NgUploaderModule,
        Ng2OrderModule,
        NgxPaginationModule,
        NgxTypeaheadModule],
    declarations: [
        EnComponent,
        DashboardComponent,
        HomeComponent,
        CompanyComponent,
        OfficersComponent,
        ShareholdersComponent,
        ShareholdersUploadComponent,
        ShareClassesComponent,
        WizardComponent,
        CreateShareholderComponent,
        CreateOfficerComponent,
        CompanysListComponent,
        CreateCompanyComponent,
        UpdateCompanyComponent,
        CreateShareClassComponent,
        ShareAllotmentComponent,
        ShareAllotmentListComponent,
        ShareTransferComponent,
        ShareTransferListComponent,
        ShareholderComponent,
        ExportShareholdersComponent,
        CR7ListComponent,
        GenerateCR7Component,
        OfficerComponent,
        CR6ListComponent,
        GenerateCR6Component,
        CR8ListComponent,
        GenerateCR8Component,
        AppointSecretaryComponent,
        TerminateDirectorComponent,
        CR9ListComponent,
        GenerateCR9Component,
        CR20ListComponent,
        GenerateCR20Component,
        AnnualReturnsListComponent,
        GenerateAnnualReturnComponent
    ],
    providers: [CanActivateViaAuthGuard]
})

export class EnModule { }
