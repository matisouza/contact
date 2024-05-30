import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      }
    }
  });

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log(
    `🚀 Application is running on: ${await app.getUrl()} - CONTACTOS`,
  );
}
bootstrap();
