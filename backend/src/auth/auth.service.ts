/* eslint-disable */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import e from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{
    access_token: string;
    usuario: { email: string; nombre: string };
  }> {
    const usuario = await this.usersService.findByUsername(username);

    if (!usuario) {
      throw new UnauthorizedException();
    }

    const passwordValid = await bcrypt.compare(password, usuario.password);

    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
    };
    // TODO: Generate a JWT and return it here
    const access_token = await this.jwtService.signAsync(payload);
    // instead of the user object
    return {
      access_token,
      usuario: {
        email: usuario.email,
        nombre: usuario.primer_nombre,
      },
    };
  }
}
