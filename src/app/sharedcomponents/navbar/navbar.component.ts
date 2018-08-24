import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/authService/usuario.service';
import { Usuario } from '../../modelos/usuario.modelo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }


}
