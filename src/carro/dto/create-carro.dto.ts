import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Cliente } from '../../cliente/entities/cliente.entity';

export class CreateCarroDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  modelo: string;

  @IsInt()
  @Min(2010)
  @IsNotEmpty()
  @ApiProperty()
  ano: number;

  locatario: Cliente | null;
}
