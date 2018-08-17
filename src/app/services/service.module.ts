import { UsuarioService } from './authService/usuario.service';
import { AdminService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    AdminService,
    LoginGuard
  ],
  declarations: []
})
export class ServiceModule { }
