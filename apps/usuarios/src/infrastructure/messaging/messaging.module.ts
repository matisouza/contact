import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreatedUserPublisher } from './publisher/created-user.publisher';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USUARIO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer'
          }
        }
      },
    ]),
  ],
  controllers: [],
  providers: [CreatedUserPublisher],
  exports: [CreatedUserPublisher],
})
export class MessagingModule { }
