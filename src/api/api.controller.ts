import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CarroService } from 'src/carro/carro.service';
import { CreateCarroDto } from 'src/carro/dto/create-carro.dto';
import { UpdateCarroDto } from 'src/carro/dto/update-carro.dto';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateClienteDto } from 'src/cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/cliente/dto/update-cliente.dto';

@Controller('api')
export class ApiController {
  constructor(
    private readonly carroService: CarroService,
    private readonly clienteService: ClienteService,
  ) {}

  // Carro Routes
  @Post('/carro')
  createCarro(@Body() createCarroDto: CreateCarroDto) {
    console.log('createCarro', { createCarroDto });
    return this.carroService.create(createCarroDto);
  }

  @Get('/carro')
  findAllCarro() {
    console.log('findAllCarro');
    return this.carroService.findAll();
  }

  @Get('/carro/:id')
  findOneCarro(@Param('id') id: string) {
    console.log('findOneCarro', { id });
    return this.carroService.findOne(+id);
  }

  @Put('/carro/:id')
  updateCarro(@Param('id') id: string, @Body() updateCarroDto: UpdateCarroDto) {
    console.log('updateCarro', { id }, { updateCarroDto });
    return this.carroService.update(+id, updateCarroDto);
  }

  @Delete('/carro/:id')
  removeCarro(@Param('id') id: string) {
    console.log('removeCarro', { id });
    return this.carroService.remove(+id);
  }

  // Cliente Routes
  @Post('/cliente')
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    console.log('createCliente', { createClienteDto });
    return this.clienteService.create(createClienteDto);
  }

  @Get('/cliente')
  findAllCliente() {
    console.log('findAllCliente');
    return this.clienteService.findAll();
  }

  @Get('/cliente/:cpf')
  findOneCliente(@Param('cpf') cpf: string) {
    console.log('findOneCliente', { cpf });
    return this.clienteService.findOne(cpf);
  }

  @Put('/cliente/:cpf')
  updateCliente(
    @Param('cpf') cpf: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    console.log('updateCliente', { cpf }, { updateClienteDto });
    return this.clienteService.update(cpf, updateClienteDto);
  }

  @Delete('/cliente/:cpf')
  removeCliente(@Param('cpf') cpf: string) {
    console.log('removeCliente', { cpf });
    return this.clienteService.remove(cpf);
  }
}
