import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Perfiles,
  Usuario,
} from '../models';
import {PerfilesRepository} from '../repositories';

export class PerfilesUsuarioController {
  constructor(
    @repository(PerfilesRepository)
    public perfilesRepository: PerfilesRepository,
  ) { }

  @get('/perfiles/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Perfiles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Perfiles.prototype.id,
  ): Promise<Usuario> {
    return this.perfilesRepository.usuario(id);
  }
}
