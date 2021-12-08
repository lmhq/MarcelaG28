// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { service } from '@loopback/core';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Credenciales } from '../models';
import { SeguridadService } from '../services';

export class LoginController {
  constructor(
    @service(SeguridadService)
    public servicioSeguridad: SeguridadService
   ) {}

  @post('/autenticar', {
    responses: {
      '200': {
        descripction: 'OK'
      }
    }
  })
  async login(@requestBody() credenciales: Credenciales) {
    console.log('usuario:' + credenciales);
    let usuarioEncontrado = await this.servicioSeguridad.Validarusuario(credenciales);

    if (usuarioEncontrado) {
      //GEnerar token
      const token = await this.servicioSeguridad.GenerarToken(usuarioEncontrado);

      if (token) {
        return {
          data: usuarioEncontrado,
          tk: token
        }
      } else {
        throw new HttpErrors[401]('Datos inválidos');
      }
    }
    else {
      throw new HttpErrors[401]('Datos inválidos');
    }
  }

}

