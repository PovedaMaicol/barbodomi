/* eslint-disable */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsEmail,

} from 'class-validator';

export class CreateDomiciliarioDto {
  /// BASIC INFO ///
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan', description: 'Name of the person' })
  primer_nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'juan123', description: 'Username of the person' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'securePassword', description: 'Password of the person' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Juan',
    description: 'Second name of the person',
    required: false,
  })
  segundo_nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Perez',
    description: 'First last name of the person',
  })
  primer_apellido: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Gomez',
    description: 'Second last name of the person',
  })
  segundo_apellido: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '3001234567',
    description: 'Phone number of the person',
  })
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'juan@gmail.com',
    description: 'Email of the person',
  })
    email: string;
    
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
      example: true,
      description: 'Availability status of the delivery person',
    })
    disponible: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({
      example: 'http://example.com/photo.jpg',
        description: 'URL of the photo of the delivery person',
        required: false,
    })
    fotoUrl: string | null;


}
