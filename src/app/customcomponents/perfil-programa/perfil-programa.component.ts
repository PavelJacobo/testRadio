import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../services/programa/programa.service';
import { Programa, Usuario } from '../../modelos/modelo.index';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-perfil-programa',
  templateUrl: './perfil-programa.component.html',
  styles: []
})
export class PerfilProgramaComponent implements OnInit  {

  public programas: Programa[];
  public usuario: Usuario;
  public programa: Programa;
  colaboradores: Array<any>;


 constructor(
   public _programaService: ProgramaService,
   public _usuarioService: UsuarioService
 ) {}
 ngOnInit() {
  this.usuario = this._usuarioService.usuario;
  this.programas = this._programaService.programas;
 }

 datoAHijo( programa: Programa ) {
    this.programa = new Programa(
      programa.nombre,
      programa.contenido,
      programa.colaboradores,
      programa.fecha,
      programa.img,
      programa._id
    );
    this.findColaboradores(programa.colaboradores);
 }

 findColaboradores(colaboradores) {
  this._usuarioService.findUser(colaboradores)
  .subscribe((res) => {
                  console.log(res);
                  this.colaboradores = res;
  });
 }
}
