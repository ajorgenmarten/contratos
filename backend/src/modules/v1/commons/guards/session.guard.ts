import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import AuthRepository from '../../auth/auth.repository';
import { Request } from 'express';
import JWTService from '../services/jwt.service';

@Injectable()
export default class SessionGuard implements CanActivate {
  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly JWTService: JWTService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = request.cookies['refresh-token'] as string | undefined;

    if (!refreshToken) throw new UnauthorizedException('No está authorizado');

    const payload = this.JWTService.verifyRefreshToken(refreshToken) as {
      sid: string;
    } | null;

    if (!payload) throw new UnauthorizedException('No está authorizado');

    const user = await this.AuthRepository.getUserBySessionId(payload.sid);

    if (!user || !user.active)
      throw new UnauthorizedException('No está authorizado');

    request.user = user;

    return true;
  }
}
