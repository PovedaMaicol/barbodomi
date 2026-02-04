/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNegocioDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Tienda ABC',
    description: 'Name of the business',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Calle Falsa 123',
    description: 'Address of the business',
  })
  address: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '555-1234',
    description: 'Phone number of the business',
  })
  phone: string;

  @ApiProperty({
    example: 'A great place to shop for everything you need.',
    description: 'Description of the business',
  })
  description?: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'vacaloca@gmail.com',
    description: 'Email of the business',
  })
  email: string;

  @IsOptional()
  @ApiProperty({
    example: 'http://www.tiendaabc.com',
    description: 'Website of the business',
  })
  website?: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Restaurante',
    description: 'Category of the business',
  })
  category: string;

  @IsOptional()
  @ApiProperty({
    example: 'http://www.tiendaabc.com/logo.png',
    description: 'Image URL of the business',
  })
  img_url?: string;
}
