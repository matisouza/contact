import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UserRepository } from '../database/repositories/user.repository';
import { createHash } from 'crypto';
import { User } from '../database/schemas/user.schema';

@Injectable()
export class UsuariosService {

  constructor(private readonly userRepository: UserRepository) { }

  create(usuario: User): Observable<User> {
    usuario.password = createHash('sha512')
      .update(usuario.password)
      .digest('hex');
    return this.userRepository.create(usuario);
  }

  delete(id: string): Observable<boolean> {
    return this.userRepository.delete(id)
  }

  findAll(): Observable<User[]> {
    return this.userRepository.findAll()
  }

  findById(id: string): Observable<User> {
    return this.userRepository.findById(id)
  }

  update(id: string, entity: User): Observable<User> {
    return this.userRepository.update(id, entity)
  }
}
