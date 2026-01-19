/* eslint-disable */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // ¡ESTE MÉTODO ES OBLIGATORIO!
  async validate(payload: any) {
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);

   
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
    }

    // Retorna el objeto que será añadido a req.user
    return {
      userId: payload.sub,
      email: payload.email,
      // ... otras propiedades del payload
    };
  }
}
