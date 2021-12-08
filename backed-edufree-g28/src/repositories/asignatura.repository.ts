import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asignatura, AsignaturaRelations, ProgramaAcademico, Grupo} from '../models';
import {ProgramaAcademicoRepository} from './programa-academico.repository';
import {GrupoRepository} from './grupo.repository';

export class AsignaturaRepository extends DefaultCrudRepository<
  Asignatura,
  typeof Asignatura.prototype.id,
  AsignaturaRelations
> {

  public readonly programaAcademico: BelongsToAccessor<ProgramaAcademico, typeof Asignatura.prototype.id>;

  public readonly grupo: BelongsToAccessor<Grupo, typeof Asignatura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProgramaAcademicoRepository') protected programaAcademicoRepositoryGetter: Getter<ProgramaAcademicoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Asignatura, dataSource);
    this.grupo = this.createBelongsToAccessorFor('grupo', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupo', this.grupo.inclusionResolver);
    this.programaAcademico = this.createBelongsToAccessorFor('programaAcademico', programaAcademicoRepositoryGetter,);
    this.registerInclusionResolver('programaAcademico', this.programaAcademico.inclusionResolver);
  }
}
