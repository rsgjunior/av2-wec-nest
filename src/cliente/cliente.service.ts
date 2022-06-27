import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  public clientes: Cliente[] = [];

  create(createClienteDto: CreateClienteDto) {
    const newLength = this.clientes.push({
      ...createClienteDto,
      carrosAlugados: [],
    });

    return this.clientes[newLength-1];
  }

  findAll() {
    return this.clientes;
  }

  findOne(cpf: string) {
    const cliente = this.clientes.find((cliente) => cliente.cpf === cpf);

    if (!cliente) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${cpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return cliente;
  }

  update(cpf: string, updateClienteDto: UpdateClienteDto) {
    const clienteIndex = this.clientes.findIndex(
      (cliente) => cliente.cpf === cpf,
    );

    if (clienteIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${cpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(this.clientes[clienteIndex], updateClienteDto);

    return this.clientes[clienteIndex];
  }

  remove(cpf: string) {
    const clienteIndex = this.clientes.findIndex(
      (cliente) => cliente.cpf === cpf,
    );

    if (clienteIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${cpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.clientes.splice(clienteIndex, 1);
  }
}
