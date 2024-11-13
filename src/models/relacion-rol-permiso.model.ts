import {Entity, model, property} from '@loopback/repository';

@model()
export class RelacionRolPermiso extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  rolId?: number;

  @property({
    type: 'number',
  })
  permisoId?: number;

  constructor(data?: Partial<RelacionRolPermiso>) {
    super(data);
  }
}

export interface RelacionRolPermisoRelations {
  // describe navigational properties here
}

export type RelacionRolPermisoWithRelations = RelacionRolPermiso & RelacionRolPermisoRelations;
