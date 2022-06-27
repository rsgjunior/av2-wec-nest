import { Carro } from '../../carro/entities/carro.entity';

export class Cliente {
  cpf: string;
  nome: string;
  email: string;
  idade: number;
  carrosAlugados: number[];
}
