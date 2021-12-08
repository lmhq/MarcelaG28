import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UsuariosXGrupo,
  Grupo,
} from '../models';
import {UsuariosXGrupoRepository} from '../repositories';

export class UsuariosXGrupoGrupoController {
  constructor(
    @repository(UsuariosXGrupoRepository)
    public usuariosXGrupoRepository: UsuariosXGrupoRepository,
  ) { }

  @get('/usuarios-x-grupos/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to UsuariosXGrupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.string('id') id: typeof UsuariosXGrupo.prototype.grupoId,
  ): Promise<Grupo> {
    return this.usuariosXGrupoRepository.grupo(id);
  }
}
