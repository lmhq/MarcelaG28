import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuariosXGrupo, UsuariosXGrupoRelations, Grupo, Usuario} from '../models';
import {GrupoRepository} from './grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class UsuariosXGrupoRepository extends DefaultCrudRepository<
  UsuariosXGrupo,
  typeof UsuariosXGrupo.prototype.grupoId,
  UsuariosXGrupoRelations
> {

  public readonly grupo: BelongsToAccessor<Grupo, typeof UsuariosXGrupo.prototype.grupoId>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof UsuariosXGrupo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(UsuariosXGrupo, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.grupo = this.createBelongsToAccessorFor('grupo', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupo', this.grupo.inclusionResolver);
  }
}
