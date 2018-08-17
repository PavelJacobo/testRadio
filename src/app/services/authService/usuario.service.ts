import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario.modelo';
import { LoginUsuario } from '../../modelos/login-usuario.modelo';
import { map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin/admin.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;

    constructor(
        public router: Router,
        public http: HttpClient,
        public _adminService: AdminService
    ) {
        this.cargarStorage();
    }

    isLogged() {
        return ( this.token.length > 5 ) ? true : false;
    }

    cargarStorage() {
        console.log('AQUI LLEGÓ');
        if ( localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.usuario = JSON.parse(localStorage.getItem('usuario'));
        } else {
          this.token = '';
          this.usuario = null;
        }
      }

    guardarStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
    }

    login(usuario: LoginUsuario, recordar: boolean = false) {

        if ( recordar ) {
            localStorage.setItem('email', usuario.email );
          } else {
            localStorage.removeItem('email');
          }
        const url = `${URL_SERVICE}/login`;
        return this.http.post(url, usuario)
        .pipe(map((res: any) => {
            this.guardarStorage(res.id, res.token, res.usuario );
            return true;
          }));
    }

    logout() {
        this.usuario = null;
        this.token = '';
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
    }



    createUser(usuario: Usuario) {
        const url = `${URL_SERVICE}/usuario`;
        console.log('URL ', url);
        return this.http.post(url, usuario);
    }

    updateUser( usuario: Usuario) {
        let url = URL_SERVICE + '/usuario/' + this.usuario._id;
        url += '?token=' + this.token;
        return this.http.put( url, usuario ).pipe(map(( res: any ) => {
            this.usuario = res.usuario;
            const usuarioDB: Usuario = res.usuario;
            this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
            Swal('Usuario actializado', usuario.nombre, 'success');
            return true;
        }));
    }

    cambiarImagen( archivo: File, id: string ) {

        this._adminService.subirArchivo( archivo, 'usuario', id )
                                 .then((res: any) => {
                                     console.log(res);
                                    this.usuario.img = res.usuario.img;
                                    Swal('Imagen actualizada', this.usuario.nombre, 'success');
                                    this.guardarStorage(id, this.token, this.usuario );
                                 })
                                 .catch((res: any) => {
                                    console.log(res);
                                 });
       }
}
