import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/authService/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styles: []
})
export class NoticiasComponent implements OnInit {
  forma: FormGroup;
  constructor(public router: Router,
    public fb: FormBuilder,
    public _loginService: UsuarioService) { }

  ngOnInit() {
    this.forma = this.fb.group({
      titulo: [ '', [
        Validators.required
      ]],
      resumen: [ '', [
        Validators.required
      ]],
      contenido: [ '', [
        Validators.required
      ]],
      tags: [ '', [
        Validators.required
      ]],
    });
  }

}
