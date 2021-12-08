import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {Usuario} from './usuario.model';

@model()
export class UsuariosXGrupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;  
  
  @property({
    type: 'string',
    default: true,
  })
  usuarioID?: string;

  @property({
    type: 'object',
    required: true,
  })
  calificacion: object;

  @property({
    type: 'string',
    required: true,
  })
  programaAcademicoId: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @belongsTo(() => Grupo)
  grupoId: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<UsuariosXGrupo>) {
    super(data);
  }
}

export interface UsuariosXGrupoRelations {
  // describe navigational properties here
}

export type UsuariosXGrupoWithRelations = UsuariosXGrupo & UsuariosXGrupoRelations;
