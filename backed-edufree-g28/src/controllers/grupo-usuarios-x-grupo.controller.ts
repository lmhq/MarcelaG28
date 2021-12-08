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
  UsuariosXGrupo,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoUsuariosXGrupoController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/usuarios-x-grupos', {
    responses: {
      '200': {
        description: 'Array of Grupo has many UsuariosXGrupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UsuariosXGrupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UsuariosXGrupo>,
  ): Promise<UsuariosXGrupo[]> {
    return this.grupoRepository.usuariosXGrupos(id).find(filter);
  }

  @post('/grupos/{id}/usuarios-x-grupos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuariosXGrupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXGrupo, {
            title: 'NewUsuariosXGrupoInGrupo',
            exclude: ['grupoId'],
            optional: ['grupoId']
          }),
        },
      },
    }) usuariosXGrupo: Omit<UsuariosXGrupo, 'grupoId'>,
  ): Promise<UsuariosXGrupo> {
    return this.grupoRepository.usuariosXGrupos(id).create(usuariosXGrupo);
  }

  @patch('/grupos/{id}/usuarios-x-grupos', {
    responses: {
      '200': {
        description: 'Grupo.UsuariosXGrupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXGrupo, {partial: true}),
        },
      },
    })
    usuariosXGrupo: Partial<UsuariosXGrupo>,
    @param.query.object('where', getWhereSchemaFor(UsuariosXGrupo)) where?: Where<UsuariosXGrupo>,
  ): Promise<Count> {
    return this.grupoRepository.usuariosXGrupos(id).patch(usuariosXGrupo, where);
  }

  @del('/grupos/{id}/usuarios-x-grupos', {
    responses: {
      '200': {
        description: 'Grupo.UsuariosXGrupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UsuariosXGrupo)) where?: Where<UsuariosXGrupo>,
  ): Promise<Count> {
    return this.grupoRepository.usuariosXGrupos(id).delete(where);
  }
}
