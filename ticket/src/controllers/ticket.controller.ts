import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Ticket} from '../models';
import {TicketRepository} from '../repositories';

export class TicketController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository : TicketRepository,
  ) {}

  @post('/tickets')
  @response(200, {
    description: 'Ticket model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {
            title: 'NewTicket',
            exclude: ['id'],
          }),
        },
      },
    })
    ticket: Omit<Ticket, 'id'>,
  ): Promise<Ticket> {
    return this.ticketRepository.create(ticket);
  }

  @get('/tickets/count')
  @response(200, {
    description: 'Ticket model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ticket) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.ticketRepository.count(where);
  }

  @get('/tickets')
  @response(200, {
    description: 'Array of Ticket model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ticket, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ticket) filter?: Filter<Ticket>,
  ): Promise<Ticket[]> {
    return this.ticketRepository.find(filter);
  }

  @patch('/tickets')
  @response(200, {
    description: 'Ticket PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Ticket,
    @param.where(Ticket) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.ticketRepository.updateAll(ticket, where);
  }

  @get('/tickets/{id}')
  @response(200, {
    description: 'Ticket model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ticket, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ticket, {exclude: 'where'}) filter?: FilterExcludingWhere<Ticket>
  ): Promise<Ticket> {
    return this.ticketRepository.findById(id, filter);
  }

  @patch('/tickets/{id}')
  @response(204, {
    description: 'Ticket PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepository.updateById(id, ticket);
  }

  @put('/tickets/{id}')
  @response(204, {
    description: 'Ticket PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepository.replaceById(id, ticket);
  }

  @del('/tickets/{id}')
  @response(204, {
    description: 'Ticket DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ticketRepository.deleteById(id);
  }
}
