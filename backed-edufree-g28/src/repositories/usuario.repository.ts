import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Perfiles, UsuariosXGrupo} from '../models';
import {PerfilesRepository} from './perfiles.repository';
import {UsuariosXGrupoRepository} from './usuarios-x-grupo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly perfiles: HasManyRepositoryFactory<Perfiles, typeof Usuario.prototype.id>;

  public readonly usuariosXGrupo: BelongsToAccessor<UsuariosXGrupo, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PerfilesRepository') protected perfilesRepositoryGetter: Getter<PerfilesRepository>, @repository.getter('UsuariosXGrupoRepository') protected usuariosXGrupoRepositoryGetter: Getter<UsuariosXGrupoRepository>,
  ) {
    super(Usuario, dataSource);
    this.usuariosXGrupo = this.createBelongsToAccessorFor('usuariosXGrupo', usuariosXGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuariosXGrupo', this.usuariosXGrupo.inclusionResolver);
    this.perfiles = this.createHasManyRepositoryFactoryFor('perfiles', perfilesRepositoryGetter,);
    this.registerInclusionResolver('perfiles', this.perfiles.inclusionResolver);
  }
}
