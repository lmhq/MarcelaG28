import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

interface Usuario {
  nombre: string,
  apellidos: string
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: any;
  titulo: string = 'Iniciar sesión';

  usuario: Usuario = {nombre: '',apellidos:''};
  usuario2: Usuario = {nombre: '',apellidos:''};

  constructor(
    private fromBuilder: FormBuilder, 
    private servicioBackend: BackendService,
    private router: Router
  ) {

    this.formLogin = this.fromBuilder.group(
      {
        correo:['', Validators.required],
        contrasenia: ['', Validators.required],
      }

    );
   }

  ngOnInit(): void {
  }

  login(): void {

    const contraseniaEncriptada = Md5.hashStr(this.formLogin.controls.contrasenia.value);
    const credenciales = this.formLogin.getRawValue();
    credenciales.contrasenia = contraseniaEncriptada;

    this.servicioBackend.autenticateRequest(JSON.stringify(credenciales)).subscribe(
      {
        next: (datos: any) => {
          const token = datos['tk'];
          localStorage.setItem('tokenedu', token);
          this.servicioBackend.isAutenticate = true;
          this.servicioBackend.token = token;
          this.router.navigate(['/admin-usuarios']);

          Swal.fire(
            'Bienvenido',
            'Tu acceso ha sido válido!',
            'success'
          );
        },
        error: (e) => {
          Swal.fire(
            'Error',
            'Lo sentimos, tus datos son erroneos!',
            'error'
          );
        },
        complete: () => {

        }
      }
    );
  }


}