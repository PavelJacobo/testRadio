import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/authService/usuario.service';
import { Usuario} from '../../modelos/usuario.modelo';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})

export class RegisterComponent implements OnInit {
public forma: FormGroup;

constructor(
    public fb: FormBuilder,
    public _loginService: UsuarioService
  ) { }

  ngOnInit() {

    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      password2: ['', [
        Validators.required
      ]],
      terminos: false
    });
  }

  get nombre() {
    return this.forma.get('nombre');
  }

  get email() {
    return this.forma.get('email');
  }

  get password () {
    return this.forma.get('password');
  }

  get terminos () {
    return this.forma.get('terminos');
  }

  onSubmit() {
    console.log(this.forma.controls.nombre.value);

    const usuario = new Usuario(
    this.forma.controls.nombre.value,
    this.forma.controls.email.value,
    this.forma.controls.password.value
    );
    this._loginService.createUser(usuario).subscribe(res => console.log(res));

  }

}
