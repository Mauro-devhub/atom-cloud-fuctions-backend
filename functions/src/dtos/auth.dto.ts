import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
  @IsEmail({}, { message: "email debe tener un formato válido" })
  @IsNotEmpty({ message: "email es requerido" })
  email!: string;
}