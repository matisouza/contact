import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { UserModel } from '../../domain/model/user.model';
import { Observable } from 'rxjs';
import { createHash } from 'node:crypto';

export class CreateUserUseCase {

    constructor(private readonly userRepository: IUserRepository<UserModel>) { }

    execute(entity: UserModel): Observable<UserModel> {

        entity.password = createHash('sha512')
            .update(entity.password)
            .digest('hex');

        return this.userRepository.create(entity)
    }
}