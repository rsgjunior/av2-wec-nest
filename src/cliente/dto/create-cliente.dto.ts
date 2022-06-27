import { IsEmail, IsIdentityCard, IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(18)
  @IsNotEmpty()
  idade: number;
}
