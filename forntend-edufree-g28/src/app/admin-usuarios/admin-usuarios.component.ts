import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {


  tiposDeUsuarios = [
    {
      codigo: 'estudiante',
      texto: 'Estudiante',
    },
    {
      codigo: 'docente',
      texto: 'Docente',
    },
    {
      codigo: 'administrador',
      texto: 'Administrador',
    }
  ];

  listaUsuarios: any = [];

  openModalCrear = false;
  formGroupUsuario;
  tipo: any = '';
  modoFormulario = 'adicion';
  id = '';

  constructor(
    public servicioBackend: BackendService,
    private formBuilder: FormBuilder
  ) {

    this.obtenerUsuarios();

    this.formGroupUsuario = this.formBuilder.group(
      {
        correo: ['', Validators.required],
        nombre: ['', Validators.required],
        tipo: ['estudiante'],
        contrasenia: ['ssassdsds']

      }
    );

  }

  ngOnInit(): void {
  }


  crearUsuario() {

    if(!this.tipo) {
      Swal.fire(
        'Ojo',
        'Debes seleccionar el tipo de usuario!',
        'warning'
      );
      return;
    }

    const usuario = this.formGroupUsuario.getRawValue();
    usuario['tipo'] = this.tipo;

    this.servicioBackend.postRequest('usuarios', JSON.stringify(usuario)).subscribe(
      {
        next: (datos) => {
          this.listaUsuarios.push(usuario);
          Swal.fire(
            'Que bien',
            'Usuario agregado!',
            'success'
          );

        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            this.servicioBackend.autorized = false;
            Swal.fire(
              'error',
              'Usuario No autorizado!',
              'error'
            );
          } else {
            Swal.fire(
              'error',
              'Usuario No agregado!',
              'error'
            );
          }
        },
        complete: () => {

        }
      }

    );
  }

  obtenerUsuarios(): void {
    this.servicioBackend.getRequest('usuarios').subscribe(
      {
        next: (datos) => {
          this.listaUsuarios = datos;
        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            this.servicioBackend.autorized = false;
            Swal.fire(
              'error',
              'Usuario No autorizado!',
              'error'
            );
          }
        },
        complete: () => {

        }
      }

    )
  }


  abrirFormulario(): void {
    this.openModalCrear = !this.openModalCrear;
  }

  entrarModoEdicion(usuario: any): void {
    this.formGroupUsuario.patchValue(usuario);
    this.id = usuario.id;
    this.openModalCrear = true;
    this.modoFormulario = 'edicion';
  }

  cambiarModoAdicion(): void {
    this.modoFormulario = 'adicion';
  }

  editarUsuario(): void {

    const usuario = this.formGroupUsuario.getRawValue();
    usuario['tipo'] = this.tipo;

    this.servicioBackend.patchRequest('usuarios', this.id, JSON.stringify(usuario)).subscribe(
      {
        next: (datos) => {
          Swal.fire(
            'Que bien',
            'Usuario editado!',
            'success'
          );

          this.obtenerUsuarios();
        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            this.servicioBackend.autorized = false;
            Swal.fire(
              'error',
              'Usuario No autorizado!',
              'error'
            );
          } else {
            Swal.fire(
              'error',
              'Usuario No editado!',
              'error'
            );
          }
        },
        complete: () => {

        }
      }
    );
  }
  
  eliminarUsuario(id: string): void {

    this.servicioBackend.deleteRequest('usuarios', id).subscribe(
      {
        next: (datos) => {          
          Swal.fire(
            'Que bien',
            'Usuario eliminado!',
            'success'
          );

          this.obtenerUsuarios();
        },
        error: (e) => {
          console.log(e);

          if (e.statusCode == 401) {
            this.servicioBackend.autorized = false;
            Swal.fire(
              'error',
              'Usuario No autorizado!',
              'error'
            );
          } else {
            Swal.fire(
              'error',
              'Usuario No eliminar!',
              'error'
            );
          }
        },
        complete: () => {

        }
      }

    );
  }

}
