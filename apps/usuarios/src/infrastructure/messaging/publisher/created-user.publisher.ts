import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUser } from '../../database/schemas/interfaces/user.interface';

@Injectable()
export class CreatedUserPublisher {
    constructor(
        @Inject('USUARIO_SERVICE') private readonly client: ClientProxy,
    ) { }

    publish(data: IUser) {
        this.client.emit('usuario_creado', JSON.stringify(data));
    }
}
