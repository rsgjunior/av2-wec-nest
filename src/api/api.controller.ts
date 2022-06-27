import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateCarroDto } from 'src/carro/dto/create-carro.dto';
import { AluguelDto } from 'src/carro/dto/aluguel.dto';
import { UpdateCarroDto } from 'src/carro/dto/update-carro.dto';
import { CreateClienteDto } from 'src/cliente/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/cliente/dto/update-cliente.dto';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
  ) {}

  // Carro Routes
  @Post('/carro')
  createCarro(@Body() createCarroDto: CreateCarroDto) {
    console.log('createCarro', { createCarroDto });
    return this.apiService.createCarro(createCarroDto);
  }

  @Get('/carro')
  findAllCarro() {
    console.log('findAllCarro');
    return this.apiService.findAllCarro();
  }

  @Get('/carro/:id')
  findOneCarro(@Param('id') id: string) {
    console.log('findOneCarro', { id });
    return this.apiService.findOneCarro(+id);
  }

  @Put('/carro/:id')
  updateCarro(@Param('id') id: string, @Body() updateCarroDto: UpdateCarroDto) {
    console.log('updateCarro', { id }, { updateCarroDto });
    return this.apiService.updateCarro(+id, updateCarroDto);
  }

  @Delete('/carro/:id')
  removeCarro(@Param('id') id: string) {
    console.log('removeCarro', { id });
    return this.apiService.removeCarro(+id);
  }

  // Cliente Routes
  @Post('/cliente')
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    console.log('createCliente', { createClienteDto });
    return this.apiService.createCliente(createClienteDto);
  }

  @Get('/cliente')
  findAllCliente() {
    console.log('findAllCliente');
    return this.apiService.findAllCliente();
  }

  @Get('/cliente/:cpf')
  findOneCliente(@Param('cpf') cpf: string) {
    console.log('findOneCliente', { cpf });
    return this.apiService.findOneCliente(cpf);
  }

  @Put('/cliente/:cpf')
  updateCliente(
    @Param('cpf') cpf: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    console.log('updateCliente', { cpf }, { updateClienteDto });
    return this.apiService.updateCliente(cpf, updateClienteDto);
  }

  @Delete('/cliente/:cpf')
  removeCliente(@Param('cpf') cpf: string) {
    console.log('removeCliente', { cpf });
    return this.apiService.removeCliente(cpf);
  }

  @Post('/aluguel')
  registrarAluguel(@Body() aluguelDto: AluguelDto) {
    console.log('registrarAluguel', { aluguelDto });
    return this.apiService.registrarAluguel(aluguelDto);
  }

  @Delete('/aluguel')
  removerAluguel(@Body() aluguelDto: AluguelDto) {
    console.log('removerAluguel', { aluguelDto });
    return this.apiService.removerAluguel(aluguelDto);
  }
}
