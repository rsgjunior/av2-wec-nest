import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  @ApiProperty({ minLength: 11, maxLength: 11 })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsInt()
  @Min(18)
  @IsNotEmpty()
  @ApiProperty()
  idade: number;
}
