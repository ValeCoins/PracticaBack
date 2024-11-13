import {Entity, model, property, hasMany} from '@loopback/repository';
import {Permiso} from './permiso.model';
import {RelacionRolPermiso} from './relacion-rol-permiso.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @hasMany(() => Permiso, {through: {model: () => RelacionRolPermiso}})
  permisos: Permiso[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
