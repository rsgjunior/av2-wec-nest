import { Cliente } from '../../cliente/entities/cliente.entity';

export class Carro {
  id: number;
  placa: string;
  nome: string;
  modelo: string;
  ano: number;
  locatario: Cliente | null;
}
