import { Module } from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { NegociosController } from './negocios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negocio } from './entities/negocio.entity';
import { SupabaseModule } from '../supabase/supabase.module';


@Module({
  imports: [TypeOrmModule.forFeature([Negocio]),
  SupabaseModule],
  controllers: [NegociosController],
  providers: [NegociosService],
})
export class NegociosModule {}
