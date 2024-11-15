import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Permiso} from '../models';
import {PermisoRepository} from '../repositories';

export class PermisosController {
  constructor(
    @repository(PermisoRepository)
    public permisoRepository : PermisoRepository,
  ) {}

  @post('/permisos')
  @response(200, {
    description: 'Permiso model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permiso)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {
            title: 'NewPermiso',
            exclude: ['id'],
          }),
        },
      },
    })
    permiso: Omit<Permiso, 'id'>,
  ): Promise<any> {
   if ( !permiso.activo) {
    throw new Error("");
     ('Activo debe ser true')
   }
    return this.permisoRepository.create(permiso);
  }

  @get('/permisos/count')
  @response(200, {
    description: 'Permiso model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permiso) where?: Where<Permiso>,
  ): Promise<Count> {
    return this.permisoRepository.count(where);
  }

  @get('/permisos')
  @response(200, {
    description: 'Array of Permiso model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permiso, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permiso) filter?: Filter<Permiso>,
  ): Promise<Permiso[]> {
    return this.permisoRepository.find(filter);
  }

  // @patch('/permisos')
  // @response(200, {
  //   description: 'Permiso PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Permiso, {partial: true}),
  //       },
  //     },
  //   })
  //   permiso: Permiso,
  //   @param.where(Permiso) where?: Where<Permiso>,
  // ): Promise<Count> {
  //   return this.permisoRepository.updateAll(permiso, where);
  // }

  @get('/permisos/{id}')
  @response(200, {
    description: 'Permiso model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permiso, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Permiso, {exclude: 'where'}) filter?: FilterExcludingWhere<Permiso>
  ): Promise<Permiso> {
    return this.permisoRepository.findById(id, filter);
  }

  @patch('/permisos/{id}')
  @response(204, {
    description: 'Permiso PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {partial: true}),
        },
      },
    })
    permiso: Permiso,
  ): Promise<void> {
    await this.permisoRepository.updateById(id, permiso);
  }

  @put('/permisos/{id}')
  @response(204, {
    description: 'Permiso PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permiso: Permiso,
  ): Promise<void> {
    await this.permisoRepository.replaceById(id, permiso);
  }

  @del('/permisos/{id}')
  @response(204, {
    description: 'Permiso DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    await this.permisoRepository.updateById(id,{
      activo:false,
    })
    const permiso= await this.permisoRepository.findById(id)
    console.log("Eres un crack!!",permiso)
    return permiso.activo

  }
}
