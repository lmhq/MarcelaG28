import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Grupo,
  Asignatura,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoAsignaturaController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Array of Grupo has many Asignatura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asignatura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asignatura>,
  ): Promise<Asignatura[]> {
    return this.grupoRepository.asignaturas(id).find(filter);
  }

  @post('/grupos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignatura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {
            title: 'NewAsignaturaInGrupo',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) asignatura: Omit<Asignatura, 'id'>,
  ): Promise<Asignatura> {
    return this.grupoRepository.asignaturas(id).create(asignatura);
  }

  @patch('/grupos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Grupo.Asignatura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {partial: true}),
        },
      },
    })
    asignatura: Partial<Asignatura>,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.grupoRepository.asignaturas(id).patch(asignatura, where);
  }

  @del('/grupos/{id}/asignaturas', {
    responses: {
      '200': {
        description: 'Grupo.Asignatura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.grupoRepository.asignaturas(id).delete(where);
  }
}
