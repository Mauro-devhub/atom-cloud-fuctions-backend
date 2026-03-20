import { IsNotEmpty, IsString, MinLength, IsDateString, IsOptional, IsEnum } from "class-validator";
import { EStateTask } from "../enums/task.enum";

export class CreateTaskDto {
  @IsString({ message: "title debe ser un string" })
  @MinLength(3, { message: "title debe tener al menos 3 caracteres" })
  @IsNotEmpty({ message: "title es requerido" })
  title!: string;

  @IsString({ message: "description debe ser un string" })
  @IsNotEmpty({ message: "description es requerido" })
  description!: string;

  @IsDateString({}, { message: "dateExpire debe ser una fecha válida (formato ISO 8601)" })
  @IsNotEmpty({ message: "dateExpire es requerido" })
  dateExpire!: string;

  @IsEnum(EStateTask, { message: "stateTask debe ser: PENDING, DONE o EXPIRED" })
  @IsNotEmpty({ message: "stateTask es requerido" })
  stateTask!: EStateTask;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: "title debe ser un string" })
  @MinLength(3, { message: "title debe tener al menos 3 caracteres" })
  title?: string;

  @IsOptional()
  @IsString({ message: "description debe ser un string" })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: "dateExpire debe ser una fecha válida (formato ISO 8601)" })
  dateExpire?: string;

  @IsOptional()
  @IsEnum(EStateTask, { message: "stateTask debe ser: PENDING, DONE o EXPIRED" })
  @IsNotEmpty({ message: "stateTask es requerido" })
  stateTask!: EStateTask;
}
