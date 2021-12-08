import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Perfiles, PerfilesRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class PerfilesRepository extends DefaultCrudRepository<
  Perfiles,
  typeof Perfiles.prototype.id,
  PerfilesRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Perfiles.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Perfiles, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
