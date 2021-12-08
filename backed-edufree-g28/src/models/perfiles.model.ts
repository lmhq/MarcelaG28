import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model({settings: {strict: false}})
export class Perfiles extends Entity {
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

  @belongsTo(() => Usuario)
  usuarioId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Perfiles>) {
    super(data);
  }
}

export interface PerfilesRelations {
  // describe navigational properties here
}

export type PerfilesWithRelations = Perfiles & PerfilesRelations;
