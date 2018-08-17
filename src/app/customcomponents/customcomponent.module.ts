import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './login/register.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { OcupacionLocalComponent } from './ocupacion-local/ocupacion-local.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilProgramaComponent } from './perfil-programa/perfil-programa.component';
import { PipeModule } from '../pipes/pipes.module';


@NgModule({
    declarations: [
        LoginComponent,
        AboutComponent,
        HomeComponent,
        RegisterComponent,
        AdminpanelComponent,
        NoticiasComponent,
        ProgramacionComponent,
        OcupacionLocalComponent,
        PerfilUsuarioComponent,
        PerfilProgramaComponent
    ],
    imports: [
        CommonModule,
        PipeModule,
        AngularMaterialModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginComponent,
        PipeModule,
        AboutComponent,
        HomeComponent,
        HttpClientModule,
        RegisterComponent,
        AdminpanelComponent
    ],
    providers: [],
})
export class CustomcomponentModule {}
