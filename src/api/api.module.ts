import { Module } from '@nestjs/common';
import { CarroService } from 'src/carro/carro.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [CarroService, ClienteService, ApiService],
})
export class ApiModule {}
