import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Programa, Usuario } from '../../modelos/modelo.index';
import Swal from 'sweetalert2';
import { ProgramaService } from '../../services/programa/programa.service';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-gestion-programas',
  templateUrl: './gestion-programas.component.html',
  styles: []
})
export class GestionProgramasComponent implements OnInit {

  formaPrograma: FormGroup;
  @Input() public usuario: Usuario;
  @Input() public programa: Programa;
  @Input() public colaboradores: Usuario[];
  public imagenTemp: string | ArrayBuffer | null;
  public imagenSubir: File;
  constructor(
                public router: Router,
                public fb: FormBuilder,
                public _programaService: ProgramaService,
                public _usuarioService: UsuarioService
  ) {

  }

  ngOnInit() {

  }
  onSubmit(programa: Programa) {
    if (this.imagenSubir !== undefined) {
      this.cambiarImagen().then((res: any) => {
        console.log(res);
        this.programa.nombre = programa.nombre;
        this.programa.contenido = programa.contenido;
        this.programa.img = res.programa.img;
        console.log(this.programa);
        this._programaService.updatePrograma(this.programa, this._usuarioService.token)
                             .subscribe(() => {
                              this.programa = undefined;
                              this.colaboradores = undefined;
                              this.imagenTemp = null;
                              this.colaboradores = undefined;
                             });
    })
    .catch((res: any) => {
       console.log(res);
    });
    } else {
      this.programa.nombre = programa.nombre;
      this.programa.contenido = programa.contenido;
      this._programaService.updatePrograma(this.programa, this._usuarioService.token)
                           .subscribe(() => {
                            this.programa = undefined;
                            this.colaboradores = undefined;
                            this.imagenTemp = null;
                            this.colaboradores = undefined;
                           });
    }
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
  return this._programaService.cambiarImagen( this.imagenSubir, 'programa', this.programa._id);
  }

  cancelar() {
  this.programa = undefined;
  this.colaboradores = undefined;
  this.imagenTemp = null;
  this.colaboradores = undefined;
  console.log(this.programa);
  return;
  }
}
