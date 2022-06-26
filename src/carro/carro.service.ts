import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateCarroDto } from './dto/create-carro.dto';
import { UpdateCarroDto } from './dto/update-carro.dto';
import { Carro } from './entities/carro.entity';

@Injectable()
export class CarroService {
  private carros: Carro[];

  constructor(private readonly clienteService: ClienteService) {
    this.carros = [];
  }

  create(createCarroDto: CreateCarroDto) {
    const newIndex = this.carros.push({ ...createCarroDto, locatario: null });

    return this.carros[newIndex];
  }

  findAll() {
    console.log(this.clienteService);

    return this.carros;
  }

  findOne(id: number) {
    const carro = this.carros.find((carro) => carro.id === id);

    if (!carro) {
      throw new HttpException(
        `Não foi possível encontrar carro com o ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return carro;
  }

  update(id: number, updateCarroDto: UpdateCarroDto) {
    const carroIndex = this.carros.findIndex((carro) => carro.id === id);

    if (carroIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar carro com o ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(this.carros[carroIndex], updateCarroDto);

    return this.carros[carroIndex];
  }

  remove(id: number) {
    const carroIndex = this.carros.findIndex((carro) => carro.id === id);

    if (carroIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar carro com o ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.carros.splice(carroIndex, 1);
  }
}
