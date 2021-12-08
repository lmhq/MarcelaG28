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
  Usuario,
  Perfiles,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPerfilesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/perfiles', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Perfiles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfiles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Perfiles>,
  ): Promise<Perfiles[]> {
    return this.usuarioRepository.perfiles(id).find(filter);
  }

  @post('/usuarios/{id}/perfiles', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perfiles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfiles, {
            title: 'NewPerfilesInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) perfiles: Omit<Perfiles, 'id'>,
  ): Promise<Perfiles> {
    return this.usuarioRepository.perfiles(id).create(perfiles);
  }

  @patch('/usuarios/{id}/perfiles', {
    responses: {
      '200': {
        description: 'Usuario.Perfiles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfiles, {partial: true}),
        },
      },
    })
    perfiles: Partial<Perfiles>,
    @param.query.object('where', getWhereSchemaFor(Perfiles)) where?: Where<Perfiles>,
  ): Promise<Count> {
    return this.usuarioRepository.perfiles(id).patch(perfiles, where);
  }

  @del('/usuarios/{id}/perfiles', {
    responses: {
      '200': {
        description: 'Usuario.Perfiles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perfiles)) where?: Where<Perfiles>,
  ): Promise<Count> {
    return this.usuarioRepository.perfiles(id).delete(where);
  }
}
