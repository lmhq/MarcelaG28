import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ProgramaAcademico} from './programa-academico.model';
import {Grupo} from './grupo.model';

@model()
export class Asignatura extends Entity {
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
    type: 'string',
    required: true,
  })
  profundizacion: string;

  @property({
    type: 'number',
    required: true,
  })
  creditos: number;

  @belongsTo(() => ProgramaAcademico)
  programaAcademicoId: string;

  @belongsTo(() => Grupo)
  grupoId: string;

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
