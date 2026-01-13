import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DomiciliarioService } from './domiciliario.service';
import { DomiciliarioController } from './domiciliario.controller';
import { Domiciliario } from './entities/domiciliario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Domiciliario])],
  controllers: [DomiciliarioController],
  providers: [DomiciliarioService],
  exports: [DomiciliarioService],
})
export class DomiciliarioModule {}
