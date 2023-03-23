import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';

import { map, Observable, tap } from 'rxjs';

import { CreateUserUseCase } from '../../application/usecaes/create-user.usecase';
import { CreatedUserPublisher } from '../messaging/publisher/created-user.publisher';

import { User } from '../database/schemas/user.schema';
import { IUser } from '../database/schemas/interfaces/user.interface';
import { UserDto } from '../dto/user.dto';
import { UsuariosService } from '../services/usuarios.service';
import { UserRepository } from '../database/repositories/user.repository';


@Controller('user')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly userRepository: UserRepository,
    private readonly createdEvent: CreatedUserPublisher,
  ) { }


  @Post()
  createNoSQL(@Body() usuario: UserDto): Observable<User> {

    return this.usuariosService.create(usuario as User);
  }

  @Post('usecase')
  createUser(@Body() usuario: UserDto): Observable<User> {
    const useRepo = new CreateUserUseCase(this.userRepository)
    const userDto = useRepo.execute(usuario)

    return userDto.pipe(
      map((user) => {
        delete user.password
        this.createdEvent.publish(user)
        return user
      })
    )
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<boolean> {
    return this.usuariosService.delete(id)
  }

  @Get()
  getUsers(): Observable<IUser[]> {
    return this.usuariosService.findAll()
  }

  @Get(':id')
  getUser(@Param('id') id: string): Observable<IUser> {
    return this.usuariosService.findById(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
    return this.usuariosService.update(id, userDto as User)
  }


}
