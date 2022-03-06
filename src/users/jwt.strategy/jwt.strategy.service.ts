import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { request } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let secretData = request?.cookies['auth-cookie'];
          if (!secretData) {
            return null;
          }
          return secretData?.token;
        },
      ]),
    });
  }
  async validate(payload: any) {
    if (!payload) {
      return new UnauthorizedException();
    }
    return payload;
  }
}
