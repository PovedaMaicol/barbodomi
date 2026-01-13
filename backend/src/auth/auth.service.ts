/* eslint-disable */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DomiciliarioService } from 'src/domiciliario/domiciliario.service';
import { JwtService } from '@nestjs/jwt';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    private domiciliariosService: DomiciliarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; domiciliario: { email: string; nombre: string } }> {
    const domiciliario = await this.domiciliariosService.findByUsername(username);

    if (!domiciliario) {
      throw new UnauthorizedException();
    }

    if (domiciliario.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: domiciliario.id,
      username: domiciliario.username,
      email: domiciliario.email,
    };
    // TODO: Generate a JWT and return it here
    const access_token = await this.jwtService.signAsync(payload);
    // instead of the user object
    return {
      access_token,
      domiciliario: {
        email: domiciliario.email,
        nombre: domiciliario.primer_nombre,
      },
    };
  }
}
