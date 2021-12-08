import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
const jwt = require('jsonwebtoken');

@injectable({ scope: BindingScope.TRANSIENT })
export class SeguridadService {

  llaveSecreta = '@1234edcf2323$';
  constructor(
    @repository(UsuarioRepository) public usuarioRepositorio: UsuarioRepository
  ) { }

  /*
   * Add service methods here
   */

  //Validar que un usuario exista
  //Generar un token
  //Verificar que un token sea valido

  async Validarusuario(credenciales: Credenciales) {

    try {
      console.log(credenciales.correo);
      let usuarioEncontrado = await this.usuarioRepositorio.findOne(
        {
          where: {
            correo: credenciales.correo,
            contrasenia: credenciales.contrasenia
          }
        }
      );

      if (usuarioEncontrado) {
        return;
      } else {
        return false;
      }

    } catch (error) {
      return false;
    }
    
  }

  async GenerarToken(usuario: Usuario){
    try{
      const token = jwt.sing({
        email: usuario.correo,
        nombre: usuario.nombre
      }, this.llaveSecreta); 
      return token;
    } catch (error) {
      return false;
       
    }
    
  }

  VerificarToken(token: string){
    try{
      const datos = jwt.verify(token, this.llaveSecreta )
      return datos;
    }catch (error) {
      return false;
    }

  }

}
