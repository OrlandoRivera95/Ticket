import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ticket',
  connector: 'mongodb',
  url: 'mongodb+srv://dev:control3*@cluster0.2zaco.mongodb.net/prueba',
  host: 'cluster0',
  port: 27017,
  user: 'dev',
  password: 'control3*',
  database: 'prueba',
  useNewUrlParser: true
};

//// me da bastantes errores al actualizar github

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TicketDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ticket';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ticket', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
