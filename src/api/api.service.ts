import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarroService } from 'src/carro/carro.service';
import { CreateCarroDto } from 'src/carro/dto/create-carro.dto';
import { AluguelDto } from 'src/carro/dto/aluguel.dto';
import { UpdateCarroDto } from 'src/carro/dto/update-carro.dto';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateClienteDto } from 'src/cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/cliente/dto/update-cliente.dto';

@Injectable()
export class ApiService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly carroService: CarroService,
  ) {}

  createCarro(createCarroDto: CreateCarroDto) {
    const newLength = this.carroService.carros.push({
      id: this.carroService.nextId++,
      ...createCarroDto,
      locatario: null,
    });

    return this.carroService.carros[newLength - 1];
  }

  findAllCarro() {
    console.log(this.carroService.carros);

    return this.carroService.carros;
  }

  findOneCarro(id: number) {
    const carro = this.carroService.carros.find((carro) => carro.id === id);

    if (!carro) {
      throw new HttpException(
        `Não foi possível encontrar carro com o ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return carro;
  }

  updateCarro(id: number, updateCarroDto: UpdateCarroDto) {
    const carroIndex = this.carroService.carros.findIndex(
      (carro) => carro.id === id,
    );

    if (carroIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar carro com o ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(this.carroService.carros[carroIndex], updateCarroDto);

    return this.carroService.carros[carroIndex];
  }

  removeCarro(id: number) {
    const carroIndex = this.carroService.carros.findIndex(
      (carro) => carro.id === id,
    );

    if (carroIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar carro com o ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.carroService.carros.splice(carroIndex, 1);
  }

  createCliente(createClienteDto: CreateClienteDto) {
    const newLength = this.clienteService.clientes.push({
      ...createClienteDto,
      carrosAlugados: [],
    });

    return this.clienteService.clientes[newLength - 1];
  }

  findAllCliente() {
    return this.clienteService.clientes;
  }

  findOneCliente(cpf: string) {
    const cliente = this.clienteService.clientes.find(
      (cliente) => cliente.cpf === cpf,
    );

    if (!cliente) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${cpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return cliente;
  }

  updateCliente(cpf: string, updateClienteDto: UpdateClienteDto) {
    const clienteIndex = this.clienteService.clientes.findIndex(
      (cliente) => cliente.cpf === cpf,
    );

    if (clienteIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${cpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(this.clienteService.clientes[clienteIndex], updateClienteDto);

    return this.clienteService.clientes[clienteIndex];
  }

  removeCliente(cpf: string) {
    const clienteIndex = this.clienteService.clientes.findIndex(
      (cliente) => cliente.cpf === cpf,
    );

    if (clienteIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${cpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.clienteService.clientes.splice(clienteIndex, 1);
  }

  registrarAluguel(aluguelDto: AluguelDto) {
    const { clienteCpf, carroId } = aluguelDto;

    const clienteIndex = this.clienteService.clientes.findIndex(
      (cliente) => cliente.cpf === clienteCpf,
    );
    if (clienteIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${clienteCpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const carroIndex = this.carroService.carros.findIndex(
      (carro) => carro.id === carroId,
    );
    if (carroIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar carro com o id ${carroId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (this.carroService.carros[carroIndex].locatario !== null) {
      throw new HttpException(
        `O carro ${carroId} já está alugado`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      this.clienteService.clientes[clienteIndex].carrosAlugados.some(
        (id) => id === carroId,
      )
    ) {
      throw new HttpException(
        `O cliente de CPF ${clienteCpf} já está alugando o carro ${carroId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.carroService.carros[carroIndex].locatario =
      this.clienteService.clientes[clienteIndex];
    this.clienteService.clientes[clienteIndex].carrosAlugados.push(carroId);

    return 'Aluguel registrado com sucesso';
  }

  removerAluguel(aluguelDto: AluguelDto) {
    const { clienteCpf, carroId } = aluguelDto;

    const clienteIndex = this.clienteService.clientes.findIndex(
      (cliente) => cliente.cpf === clienteCpf,
    );
    if (clienteIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar cliente com o cpf ${clienteCpf}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const carroIndex = this.carroService.carros.findIndex(
      (carro) => carro.id === carroId,
    );
    if (carroIndex < 0) {
      throw new HttpException(
        `Não foi possível encontrar carro com o id ${carroId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (this.carroService.carros[carroIndex].locatario.cpf !== clienteCpf) {
      throw new HttpException(
        `O carro ${carroId} não está alugado para o CPF ${clienteCpf}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      !this.clienteService.clientes[clienteIndex].carrosAlugados.some(
        (id) => id === carroId,
      )
    ) {
      throw new HttpException(
        `O cliente de CPF ${clienteCpf} não está alugando o carro ${carroId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.carroService.carros[carroIndex].locatario = null;

    const carroAlugadoIndex = this.clienteService.clientes[
      clienteIndex
    ].carrosAlugados.findIndex((id) => id === carroId);
    this.clienteService.clientes[clienteIndex].carrosAlugados.splice(carroAlugadoIndex, 1);

    return 'Aluguel removido com sucesso';
  }
}
