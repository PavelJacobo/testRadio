import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/authService/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario.modelo';
import { AdminService } from '../../services/admin/admin.service';
import Swal from 'sweetalert2';
import { ProgramaService } from '../../services/programa/programa.service';

export interface DiasSemana {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styles: []
})
export class PerfilUsuarioComponent implements OnInit {

  public forma: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemp: string | ArrayBuffer | null;
  // programas: Programa[];

  constructor(  public router: Router,
                public fb: FormBuilder,
                public _usuarioService: UsuarioService,
                public _programaService: ProgramaService,
                public _adminService: AdminService) {}

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;

    this.forma = this.fb.group({
      programas: [this._usuarioService.usuario.programas],
      nombre: [this.usuario.nombre, [
        Validators.required
      ]],
      email: [ this._usuarioService.usuario.email, [
        Validators.required,
        Validators.email
      ]]
    });

  }
 // GETS Variables

    get nombre() {
      return this.forma.get('nombre');
    }

    get programas() {
      return this.forma.get('programas');
    }

    get email() {
      return this.forma.get('email');
    }


  onSubmit() {
    this.usuario.nombre = this.nombre.value;
    this.usuario.email = this.email.value;
    this.usuario.programas = this.programas.value;
    this.cambiarImagen();
    this._usuarioService.updateUser(this.usuario)
                      .subscribe((res) => {
                        console.log(res);
                        this.programas.setValue(this._usuarioService.usuario.programas);
                      });
  }


  seleccionImagen( archivo: File ) {
    console.log ( archivo );
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, 'usuario', this.usuario._id);
  }

//   onSubmitPrograma() {
//     const programa = new Programa (
//       this.nombrePrograma.value,
//       this.contenidoPrograma.value,
//       this.colaboradoresPrograma.value,
//       this.fechasForm.value
//     );
//  console.log(programa);
// //  this._adminService.crearPrograma(programa).subscribe((res) => console.log(res));
//   }

  // addFecha() {
  //   const fecha = this.fb.group({
  //     dia: ['', [Validators.required]],
  //     horaInicio: ['', [Validators.required]],
  //     horaFin: ['', [Validators.required]]
  //   });

  //   this.fechasForm.push(fecha);
  // }

  // deleteFecha( i ) {
  //   this.fechasForm.removeAt( i );
  // }

  // viewPrograma() {
  // this.open = !this.open;
  // }

  compareWithFunc(a, b) {
    return a === b._id;
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

}
