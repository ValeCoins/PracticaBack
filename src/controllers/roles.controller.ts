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
  response,
} from '@loopback/rest';
import {Rol} from '../models';
import {RolRepository} from './../repositories/rol.repository';


export class RolesController {
  constructor(
    @repository(RolRepository)
    public rolRepository : RolRepository,
  ) {}

  @post('/rols')
  @response(200, {
    description: 'Rol model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRol',
            exclude: ['id'],
          }),
        },
      },
    })
    rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.rolRepository.create(rol);
  }

  @get('/rols/count')
  @response(200, {
    description: 'Rol model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rol) where?: Where<Rol>,
  ): Promise<Count> {
    return this.rolRepository.count(where);
  }

  @get('/rols')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rol) filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.rolRepository.find(filter);
  }

  // @patch('/rols')
  // @response(200, {
  //   description: 'Rol PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Rol, {partial: true}),
  //       },
  //     },
  //   })
  //   rol: Rol,
  //   @param.where(Rol) where?: Where<Rol>,
  // ): Promise<Count> {
  //   return this.rolRepository.updateAll(rol, where);
  // }

  @get('/rols/{id}')
  @response(200, {
    description: 'Rol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rol, {exclude: 'where'}) filter?: FilterExcludingWhere<Rol>
  ): Promise<Rol> {
    return this.rolRepository.findById(id, filter);
  }

  @patch('/rols/{id}')
  @response(204, {
    description: 'Rol PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Rol,
  ): Promise<void> {
    await this.rolRepository.updateById(id, rol);
  }

  @put('/rols/{id}')
  @response(204, {
    description: 'Rol PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rol: Rol,
  ): Promise<void> {
    await this.rolRepository.replaceById(id, rol);
  }

  @del('/rols/{id}')
  @response(204, {
    description: 'Rol DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    await this.rolRepository.deleteById(id, {activo:false,})
    const rol= await this.rolRepository.findById(id)
    console.log("aaaaaa",rol)
    return rol.activo

  }
}
