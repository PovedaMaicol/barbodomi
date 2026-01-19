import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomiciliarioModule } from './domiciliario/domiciliario.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NegociosModule } from './negocios/negocios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE', 'barbodomi_db'),
        schema: configService.get('DB_SCHEMA', 'public'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
        migrationsRun: false,
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    DomiciliarioModule,
    UsersModule,
    NegociosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
