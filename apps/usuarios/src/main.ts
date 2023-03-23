import { NestFactory } from '@nestjs/core';
import { UsuariosModule } from './usuarios.module';

async function bootstrap() {
  const app = await NestFactory.create(UsuariosModule);
  await app.listen(3001);
  console.log(`🚀 Application is running on: ${await app.getUrl()} - USUARIOS`);
}
bootstrap();
