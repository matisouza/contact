import { IsString } from 'class-validator';

export class UserDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  username: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string;
}
