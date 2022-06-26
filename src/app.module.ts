import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { CarroModule } from './carro/carro.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ClienteModule, CarroModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
