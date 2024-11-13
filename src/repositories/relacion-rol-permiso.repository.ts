import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConexionBdDataSource} from '../datasources';
import {RelacionRolPermiso, RelacionRolPermisoRelations} from '../models';

export class RelacionRolPermisoRepository extends DefaultCrudRepository<
  RelacionRolPermiso,
  typeof RelacionRolPermiso.prototype.id,
  RelacionRolPermisoRelations
> {
  constructor(
    @inject('datasources.conexionBD') dataSource: ConexionBdDataSource,
  ) {
    super(RelacionRolPermiso, dataSource);
  }
}
