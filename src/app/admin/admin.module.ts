import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthService } from "./shared/services/auth-service.service";
import { SharedNodule } from "../shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { SearchPipe } from "./shared/pipes/search.pipe";
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from "./shared/services/alert-service.service";
import { SingupComponent } from "./shared/components/singup/singup.component";

@NgModule({
    imports: [
        CommonModule,
        SharedNodule,
        RouterModule.forChild([
            {
                path: '', 
                component: AdminLayoutComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/admin/login',
                        pathMatch: 'full',
                    },
                    {
                        path: 'singup',
                        component: SingupComponent,
                    },
                    {
                        path: 'login', 
                        component: LoginPageComponent,
                    },
                    {
                        path: 'dashboard',
                        component: DashboardPageComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'create',
                        component: CreatePageComponent,
                        canActivate: [AuthGuard],
                    },
                    {
                        path: 'post/:id/edit',
                        component: EditPageComponent,
                        canActivate: [AuthGuard]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule,
    ],
    declarations: [
        AdminLayoutComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        LoginPageComponent,
        SingupComponent,
        SearchPipe,
        AlertComponent
    ],
    providers: [
        AuthService,
        AlertService,
        AuthGuard,
    ]
})

export class AdminModule {

}