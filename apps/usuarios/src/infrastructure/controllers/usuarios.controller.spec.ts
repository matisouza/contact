import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../services/usuarios.service';

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [UsuariosService],
    }).compile();

    usuariosController = app.get<UsuariosController>(UsuariosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(usuariosController.).toBe('Hello World!');
    });
  });
});
