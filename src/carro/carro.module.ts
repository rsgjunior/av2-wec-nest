import { Module } from '@nestjs/common';
import { CarroService } from './carro.service';
import { CarroController } from './carro.controller';
import { ClienteService } from 'src/cliente/cliente.service';

@Module({
  controllers: [CarroController],
  providers: [CarroService, ClienteService],
})
export class CarroModule {}
