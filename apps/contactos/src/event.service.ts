import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";

@Controller()
export class EventSubscriberController {

    constructor() { }

    @EventPattern('usuario_creado')
    handleCreatedUser(@Payload() data: any) {
        console.log(
            '🚀 ~ file: controller.subscriber.ts ~ EventSubscriberController ~ handleUsuarioCreado ~ ',
            data,
        );
    }

    @MessagePattern('usuario_creado')
    killDragon(@Payload() message: any, @Ctx() context: KafkaContext) {
        console.log(`Topic: ${context.getTopic()}`, message);
    }
}