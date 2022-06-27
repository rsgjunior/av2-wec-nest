import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Cliente } from '../../cliente/entities/cliente.entity';

export class CreateCarroDto {

  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsInt()
  @Min(2010)
  @IsNotEmpty()
  ano: number;

  locatario: Cliente | null;
}
