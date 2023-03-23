import { Observable } from 'rxjs';

import { UserModel } from '../model/user.model';
import { UserDto } from '../../infrastructure/dto/user.dto';

export interface IUserRepository<T>{

    findAll(): Observable<T[]>;
    findById(id: string): Observable<T>;
    create(entity: T): Observable<T>;
    update(id: string, entity: T): Observable<T>;
    delete(id: string): Observable<boolean>;
}