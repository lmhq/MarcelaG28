import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {UsuariosXGrupo} from './usuarios-x-grupo.model';
import {Asignatura} from './asignatura.model';

@model()
export class Grupo extends Entity {
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
  nombre: string;

  @property({
    type: 'object',
    required: true,
  })
  horario: object;

  @hasMany(() => Usuario, {through: {model: () => UsuariosXGrupo}})
  usuarios: Usuario[];

  @hasMany(() => Asignatura)
  asignaturas: Asignatura[];

  @hasMany(() => UsuariosXGrupo)
  usuariosXGrupos: UsuariosXGrupo[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
