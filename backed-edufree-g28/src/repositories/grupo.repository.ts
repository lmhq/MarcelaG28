import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Usuario, UsuariosXGrupo, Asignatura} from '../models';
import {UsuariosXGrupoRepository} from './usuarios-x-grupo.repository';
import {UsuarioRepository} from './usuario.repository';
import {AsignaturaRepository} from './asignatura.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuariosXGrupo,
          typeof Grupo.prototype.id
        >;

  public readonly asignaturas: HasManyRepositoryFactory<Asignatura, typeof Grupo.prototype.id>;

  public readonly usuariosXGrupos: HasManyRepositoryFactory<UsuariosXGrupo, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosXGrupoRepository') protected usuariosXGrupoRepositoryGetter: Getter<UsuariosXGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>,
  ) {
    super(Grupo, dataSource);
    this.usuariosXGrupos = this.createHasManyRepositoryFactoryFor('usuariosXGrupos', usuariosXGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuariosXGrupos', this.usuariosXGrupos.inclusionResolver);
    this.asignaturas = this.createHasManyRepositoryFactoryFor('asignaturas', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignaturas', this.asignaturas.inclusionResolver);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, usuariosXGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
