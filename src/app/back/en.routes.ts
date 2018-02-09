import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EnComponent} from './en.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './dashboard/home/home.component';
import {CompanyComponent} from './dashboard/company/company.component';
import {OfficersComponent} from './dashboard/officers/officers.component';
import {ShareholdersComponent} from './dashboard/shareholders/shareholders.component';
import { ShareholdersUploadComponent } from './dashboard/shareholders/shareholders-upload/shareholders-upload.component'
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
import { CanActivateViaAuthGuard } from './shared/guards/canactivate.guard';

export const routes: Routes = [
    {
        path: '', component: EnComponent,
        canActivateChild: [CanActivateViaAuthGuard],
        children: [
            {
                path: 'dashboard', component: DashboardComponent,
                canActivateChild: [CanActivateViaAuthGuard],
                children: [
                    {path: 'home', component: HomeComponent},
                    {path: ':id/home', component: HomeComponent},
                    {path: 'company', component: CompanyComponent},
                    {path: ':id/company', component: CompanyComponent},
                    {path: 'officers', component: OfficersComponent},
                    {path: 'shareholders', component: ShareholdersComponent},
                    {path: 'shareholders/exportConfig', component: ExportShareholdersComponent},
                    {path: 'shareclasses', component: ShareClassesComponent},
                    {path: 'shareallotments', component: ShareAllotmentListComponent},
                    {path: 'sharetransfers', component: ShareTransferListComponent},
                    {path: 'cr7forms', component: CR7ListComponent},
                    {path: 'cr7forms/generate', component: GenerateCR7Component},
                    {path: 'cr6forms', component: CR6ListComponent},
                    {path: 'cr6forms/generate', component: GenerateCR6Component},
                    {path: 'cr8forms', component: CR8ListComponent},
                    {path: 'cr8forms/generate', component: GenerateCR8Component},
                    {path: 'cr9forms', component: CR9ListComponent},
                    {path: 'cr9forms/generate', component: GenerateCR9Component},
                    {path: 'cr20forms/generate', component: GenerateCR20Component},
                    {path: 'cr20forms', component: CR20ListComponent},
                    {path: 'annual_returns', component: AnnualReturnsListComponent},
                    {path: 'annual_returns/generate', component: GenerateAnnualReturnComponent},
                    {path: '', redirectTo: 'home', pathMatch: 'full'}
                ]
            },
            {path: 'shareallotment', component: ShareAllotmentComponent},
            {path: 'sharetransfer', component: ShareTransferComponent},
            {path: 'shareholders/add', component: CreateShareholderComponent},
            {path: 'shareholders/upload', component: ShareholdersUploadComponent},
            {path: 'shareholders/:id', component: ShareholderComponent},
            {path: 'shareholders/:id/edit', component: CreateShareholderComponent},
            {path: 'officers/add', component: CreateOfficerComponent},
            {path: 'officers/:id', component: OfficerComponent},
            {path: 'officers/:id/edit', component: CreateOfficerComponent, data: {name: 'edit'}},
            {path: 'officers/:id/appoint', component: AppointSecretaryComponent},
            {path: 'officers/:id/terminate', component: TerminateDirectorComponent},
            {path: 'companies', component: CompanysListComponent},
            {path: 'company/add', component: CreateCompanyComponent},
            {path: 'company/:id/update', component: UpdateCompanyComponent},
            {path: 'shareclasses/add', component: CreateShareClassComponent},
            {path: 'shareclasses/:id/edit', component: CreateShareClassComponent},
            {path: 'wizard', component: WizardComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EnRoutingModule {
}
