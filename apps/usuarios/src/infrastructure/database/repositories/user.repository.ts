import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { catchError, from, map, mergeMap, Observable } from 'rxjs';

import { User, UserDocument } from '../schemas/user.schema';
import { IUser } from '../schemas/interfaces/user.interface';
import { IUserRepository } from '../../../domain/repositories/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository<User> {

    constructor(
        @InjectModel(User.name) private readonly userRepository: Model<UserDocument>
    ) { }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: UserDocument[]) => {
                return users
            })
        );
    }

    findById(id: string): Observable<User> {
        return from(this.userRepository.findById(id)).pipe(
            catchError((err) => {
                throw new NotFoundException(`Error ${err}`)
            })
        )
    }

    update(id: string, entity: User): Observable<User> {
        return from(this.userRepository.findById(id)).pipe(
            mergeMap((user: User) => {
                if (!user) throw new NotFoundException('User not found');
                return from(this.userRepository.findByIdAndUpdate(id, entity, { new: true }));
            })
        );
    }
    delete(id: string): Observable<boolean> {
        return from(this.userRepository.findByIdAndDelete(id))
            .pipe(
                map((user: IUser) => {
                    if (!user) throw new NotFoundException('Error')
                    return true
                }),
            )
    }

    create(user: User): Observable<User> {
        return from(this.userRepository.create(user))
    }
    
} 