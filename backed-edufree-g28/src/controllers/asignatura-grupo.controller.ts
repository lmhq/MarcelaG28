import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asignatura,
  Grupo,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaGrupoController {
  constructor(
    @repository(AsignaturaRepository)
    public asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to Asignatura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.string('id') id: typeof Asignatura.prototype.id,
  ): Promise<Grupo> {
    return this.asignaturaRepository.grupo(id);
  }
}
