import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Programa, Usuario } from '../../modelos/modelo.index';

@Component({
  selector: 'app-perfil-programa',
  templateUrl: './perfil-programa.component.html',
  styles: []
})
export class PerfilProgramaComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario;
  public programa: Programa;
  constructor(
                public router: Router,
                public fb: FormBuilder,
                public _loginService: UsuarioService
  ) { }

  ngOnInit() {

    this.usuario = this._loginService.usuario;
    this.forma = this.fb.group({
      nombre: ['', [
        Validators.required
      ]],
      contenido: ['', [
        Validators.required
      ]],
      colaboradores: ['', [
        Validators.required
      ]]
    });
  }

  onSubmit() {
    console.log(this.forma.value);
  }

}
