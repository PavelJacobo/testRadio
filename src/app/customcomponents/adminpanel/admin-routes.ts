import {  Routes } from '@angular/router';
import { PerfilProgramaComponent } from '../perfil-programa/perfil-programa.component';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';
import { NoticiasComponent } from '../noticias/noticias.component';
import { OcupacionLocalComponent } from '../ocupacion-local/ocupacion-local.component';
import { ProgramacionComponent } from '../programacion/programacion.component';

export const AdminRoutes: Routes = [
    { path: 'add_noticia', component: NoticiasComponent },
    { path: 'perfil_usuario', component: PerfilUsuarioComponent },
    { path: 'ocupacion_local', component: OcupacionLocalComponent },
    { path: 'perfil_programa', component: PerfilProgramaComponent },
    { path: 'add_programacion', component: ProgramacionComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'add_noticia' },
];


