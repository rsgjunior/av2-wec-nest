import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.clienteService.findOne(cpf);
  }

  @Put(':cpf')
  update(
    @Param('cpf') cpf: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clienteService.update(cpf, updateClienteDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.clienteService.remove(cpf);
  }
}
