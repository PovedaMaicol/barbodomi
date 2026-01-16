/* eslint-disable  */

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'juan123',
    description: 'Username',
  })
    username: string;
    

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'securePassword',
    description: 'Password',
  })
    password: string;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: 'juan@gmail.com',
        description: 'Email address',
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 'Juan',
        description: 'First name',
    })
    primer_nombre: string;
}
