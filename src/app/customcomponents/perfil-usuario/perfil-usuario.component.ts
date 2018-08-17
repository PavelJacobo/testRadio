import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/authService/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario.modelo';
import { Programa } from '../../modelos/modelo.index';
import { AdminService } from '../../services/admin/admin.service';

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
  diasSemana: DiasSemana[] = [
  {value: 0, viewValue: 'Domingo'},
  {value: 1, viewValue: 'Lunes'},
  {value: 2, viewValue: 'Martes'},
  {value: 3, viewValue: 'Miércoles'},
  {value: 4, viewValue: 'Jueves'},
  {value: 5, viewValue: 'Viernes'},
  {value: 6, viewValue: 'Sábado'},
  ];
  forma: FormGroup;
  formProgram: FormGroup;
  public username: string;
  public usuario: Usuario;
  public open: boolean;
  public imagenSubir: File;

  constructor(  public router: Router,
                public fb: FormBuilder,
                public _usuarioService: UsuarioService,
                public _adminService: AdminService) {
                  this.open = false;
                 }

  ngOnInit() {
    this.username = localStorage.getItem('email') || '';
    this.usuario = this._usuarioService.usuario;
    this.forma = this.fb.group({
      nombre: [this.usuario.nombre, [
        Validators.required
      ]],
      email: [ this.username, [
        Validators.required,
        Validators.email
      ]],
      programa: ['']
    });

    this.formProgram = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      fechas: this.fb.array([]),
      colaboradores: [this.usuario._id, Validators.required],
    });
  }
 // GETS Variables

   get nombrePrograma() {
     return this.formProgram.get('nombre');
   }

   get fechasForm() {
     return this.formProgram.get('fechas') as FormArray;
   }

   get contenidoPrograma() {
     return this.formProgram.get('contenido');
   }

   get colaboradoresPrograma() {
     return this.formProgram.get('colaboradores');
   }
    get nombre() {
      return this.forma.get('nombre');
    }

    get programa() {
      return this.forma.get('programa');
    }

    get email() {
      return this.forma.get('email');
    }


  onSubmit() {
    this.usuario.nombre = this.nombre.value;
    this.usuario.email = this.email.value;

    this._usuarioService.updateUser(this.usuario)
                      .subscribe((res) => console.log(res));
  }

  seleccionImagen( archivo: File ) {
    console.log ( archivo );
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    this.cambiarImagen();
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

  onSubmitPrograma() {
    const programa = new Programa (
      this.nombrePrograma.value,
      this.contenidoPrograma.value,
      this.colaboradoresPrograma.value,
      this.fechasForm.value
    );
 console.log(programa);
//  this._adminService.crearPrograma(programa).subscribe((res) => console.log(res));
  }

  addFecha() {
    const fecha = this.fb.group({
      dia: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFin: ['', [Validators.required]]
    });

    this.fechasForm.push(fecha);
  }

  deleteFecha( i ) {
    this.fechasForm.removeAt( i );
  }

  viewPrograma() {
  this.open = !this.open;
  }

}
