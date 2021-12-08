import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Perfiles} from './perfiles.model';
import {UsuariosXGrupo} from './usuarios-x-grupo.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  perfilId: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;


  @property({
    type: 'string',
    required: false,
  })
  programaAcademicoId: string;

  @hasMany(() => Perfiles)
  perfiles: Perfiles[];

  @belongsTo(() => UsuariosXGrupo)
  usuariosXGrupoId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
