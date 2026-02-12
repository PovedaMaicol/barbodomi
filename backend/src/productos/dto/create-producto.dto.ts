/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductoDto { 
    @IsNotEmpty()
    @ApiProperty({
        example: 'Coca-Cola',
        description: 'Name of the product',
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'Bebida gaseosa',
        description: 'Description of the product',
    })
    description: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 1.99,
        description: 'Price of the product',
    })
    price: number;

    @IsOptional()
    @ApiProperty({
        example: 'http://www.tiendaabc.com/cocacola.png',
        description: 'Image URL of the product',
    })
    img_url?: string;

}
