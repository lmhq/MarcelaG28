import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
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
} from '@loopback/rest';
import {UsuariosXGrupo} from '../models';
import {UsuariosXGrupoRepository} from '../repositories';

export class UsuariosXGrupoController {
  constructor(
    @repository(UsuariosXGrupoRepository)
    public usuariosXGrupoRepository : UsuariosXGrupoRepository,
  ) {}

  @post('/usuarios-x-grupos')
  @response(200, {
    description: 'UsuariosXGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuariosXGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXGrupo, {
            title: 'NewUsuariosXGrupo',
            
          }),
        },
      },
    })
    usuariosXGrupo: UsuariosXGrupo,
  ): Promise<UsuariosXGrupo> {
    return this.usuariosXGrupoRepository.create(usuariosXGrupo);
  }

  @get('/usuarios-x-grupos/count')
  @response(200, {
    description: 'UsuariosXGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuariosXGrupo) where?: Where<UsuariosXGrupo>,
  ): Promise<Count> {
    return this.usuariosXGrupoRepository.count(where);
  }

  @get('/usuarios-x-grupos')
  @response(200, {
    description: 'Array of UsuariosXGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuariosXGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuariosXGrupo) filter?: Filter<UsuariosXGrupo>,
  ): Promise<UsuariosXGrupo[]> {
    return this.usuariosXGrupoRepository.find(filter);
  }

  @patch('/usuarios-x-grupos')
  @response(200, {
    description: 'UsuariosXGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXGrupo, {partial: true}),
        },
      },
    })
    usuariosXGrupo: UsuariosXGrupo,
    @param.where(UsuariosXGrupo) where?: Where<UsuariosXGrupo>,
  ): Promise<Count> {
    return this.usuariosXGrupoRepository.updateAll(usuariosXGrupo, where);
  }

  @get('/usuarios-x-grupos/{id}')
  @response(200, {
    description: 'UsuariosXGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuariosXGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuariosXGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuariosXGrupo>
  ): Promise<UsuariosXGrupo> {
    return this.usuariosXGrupoRepository.findById(id, filter);
  }

  @patch('/usuarios-x-grupos/{id}')
  @response(204, {
    description: 'UsuariosXGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuariosXGrupo, {partial: true}),
        },
      },
    })
    usuariosXGrupo: UsuariosXGrupo,
  ): Promise<void> {
    await this.usuariosXGrupoRepository.updateById(id, usuariosXGrupo);
  }

  @put('/usuarios-x-grupos/{id}')
  @response(204, {
    description: 'UsuariosXGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuariosXGrupo: UsuariosXGrupo,
  ): Promise<void> {
    await this.usuariosXGrupoRepository.replaceById(id, usuariosXGrupo);
  }

  @del('/usuarios-x-grupos/{id}')
  @response(204, {
    description: 'UsuariosXGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosXGrupoRepository.deleteById(id);
  }
}
