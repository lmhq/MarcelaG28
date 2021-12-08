import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  UsuariosXGrupo,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioUsuariosXGrupoController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/usuarios-x-grupo', {
    responses: {
      '200': {
        description: 'UsuariosXGrupo belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UsuariosXGrupo)},
          },
        },
      },
    },
  })
  async getUsuariosXGrupo(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<UsuariosXGrupo> {
    return this.usuarioRepository.usuariosXGrupo(id);
  }
}
