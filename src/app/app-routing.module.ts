import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './services/guards/login.guard';
import { AdminRoutes } from './customcomponents/adminpanel/admin-routes';
import { HomeComponent,
         AboutComponent,
         RegisterComponent,
         LoginComponent,
         AdminpanelComponent
        } from './customcomponents/customcomponents.index';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminpanel', component: AdminpanelComponent, children: AdminRoutes, canActivate: [LoginGuard] },
  { path: 'registrar', component: RegisterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES)],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
