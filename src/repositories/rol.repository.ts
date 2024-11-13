import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ConexionBdDataSource} from '../datasources';
import {Rol, RolRelations, Permiso, RelacionRolPermiso} from '../models';
import {RelacionRolPermisoRepository} from './relacion-rol-permiso.repository';
import {PermisoRepository} from './permiso.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly permisos: HasManyThroughRepositoryFactory<Permiso, typeof Permiso.prototype.id,
          RelacionRolPermiso,
          typeof Rol.prototype.id
        >;

  constructor(
    @inject('datasources.conexionBD') dataSource: ConexionBdDataSource, @repository.getter('RelacionRolPermisoRepository') protected relacionRolPermisoRepositoryGetter: Getter<RelacionRolPermisoRepository>, @repository.getter('PermisoRepository') protected permisoRepositoryGetter: Getter<PermisoRepository>,
  ) {
    super(Rol, dataSource);
    this.permisos = this.createHasManyThroughRepositoryFactoryFor('permisos', permisoRepositoryGetter, relacionRolPermisoRepositoryGetter,);
    this.registerInclusionResolver('permisos', this.permisos.inclusionResolver);
  }
}
