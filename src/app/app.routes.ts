import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from './back/shared/guards/canactivate.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: './front/login.module#LoginModule'
    },
    {
        path: 'en',
        canActivate: [CanActivateViaAuthGuard],
        loadChildren: './back/en.module#EnModule'
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
