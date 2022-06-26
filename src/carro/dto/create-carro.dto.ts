import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Cliente } from '../../cliente/entities/cliente.entity';

export class CreateCarroDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsNumber()
  @IsNotEmpty()
  ano: number;

  locatario: Cliente | null;
}
