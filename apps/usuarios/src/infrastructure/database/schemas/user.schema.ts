import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserModel } from '../../../domain/model/user.model';

@Schema({collection: 'user', versionKey: false})
export class User extends UserModel {

    @Prop({
        type: String,
        index: true,
        unique: true,
        required: true
    })
    username: string;
    @Prop({
        type: String,
        index: true,
        required: true
    })
    password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

