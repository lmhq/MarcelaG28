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
import {Perfiles} from '../models';
import {PerfilesRepository} from '../repositories';

export class PerfilesController {
  constructor(
    @repository(PerfilesRepository)
    public perfilesRepository : PerfilesRepository,
  ) {}

  @post('/perfiles')
  @response(200, {
    description: 'Perfiles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Perfiles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfiles, {
            title: 'NewPerfiles',
            exclude: ['id'],
          }),
        },
      },
    })
    perfiles: Omit<Perfiles, 'id'>,
  ): Promise<Perfiles> {
    return this.perfilesRepository.create(perfiles);
  }

  @get('/perfiles/count')
  @response(200, {
    description: 'Perfiles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perfiles) where?: Where<Perfiles>,
  ): Promise<Count> {
    return this.perfilesRepository.count(where);
  }

  @get('/perfiles')
  @response(200, {
    description: 'Array of Perfiles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perfiles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perfiles) filter?: Filter<Perfiles>,
  ): Promise<Perfiles[]> {
    return this.perfilesRepository.find(filter);
  }

  @patch('/perfiles')
  @response(200, {
    description: 'Perfiles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfiles, {partial: true}),
        },
      },
    })
    perfiles: Perfiles,
    @param.where(Perfiles) where?: Where<Perfiles>,
  ): Promise<Count> {
    return this.perfilesRepository.updateAll(perfiles, where);
  }

  @get('/perfiles/{id}')
  @response(200, {
    description: 'Perfiles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perfiles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Perfiles, {exclude: 'where'}) filter?: FilterExcludingWhere<Perfiles>
  ): Promise<Perfiles> {
    return this.perfilesRepository.findById(id, filter);
  }

  @patch('/perfiles/{id}')
  @response(204, {
    description: 'Perfiles PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfiles, {partial: true}),
        },
      },
    })
    perfiles: Perfiles,
  ): Promise<void> {
    await this.perfilesRepository.updateById(id, perfiles);
  }

  @put('/perfiles/{id}')
  @response(204, {
    description: 'Perfiles PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perfiles: Perfiles,
  ): Promise<void> {
    await this.perfilesRepository.replaceById(id, perfiles);
  }

  @del('/perfiles/{id}')
  @response(204, {
    description: 'Perfiles DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perfilesRepository.deleteById(id);
  }
}
