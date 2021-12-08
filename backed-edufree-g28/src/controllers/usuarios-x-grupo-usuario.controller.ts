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
  UsuariosXGrupo,
  Usuario,
} from '../models';
import {UsuariosXGrupoRepository} from '../repositories';

export class UsuariosXGrupoUsuarioController {
  constructor(
    @repository(UsuariosXGrupoRepository) protected usuariosXGrupoRepository: UsuariosXGrupoRepository,
  ) { }

  @get('/usuarios-x-grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of UsuariosXGrupo has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuariosXGrupoRepository.usuarios(id).find(filter);
  }

  @post('/usuarios-x-grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'UsuariosXGrupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UsuariosXGrupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInUsuariosXGrupo',
            exclude: ['id'],
            optional: ['usuariosXGrupoId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.usuariosXGrupoRepository.usuarios(id).create(usuario);
  }

  @patch('/usuarios-x-grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'UsuariosXGrupo.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuariosXGrupoRepository.usuarios(id).patch(usuario, where);
  }

  @del('/usuarios-x-grupos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'UsuariosXGrupo.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuariosXGrupoRepository.usuarios(id).delete(where);
  }
}
