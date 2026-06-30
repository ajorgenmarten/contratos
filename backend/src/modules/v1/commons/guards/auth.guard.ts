import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import JWTService from '../services/jwt.service';
import { Request } from 'express';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly JWTService: JWTService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers['authorization']?.split(' ')[1];

    if (!token)
      throw new UnauthorizedException('No tiene acceso a este recurso');

    const payload = this.JWTService.verifyAccessToken(token) as {
      uid: string;
    } | null;

    if (!payload)
      throw new UnauthorizedException('No tiene acceso a este recurso');

    if (request.user?.id !== payload.uid)
      throw new UnauthorizedException('No tienes acceso a este recurso');

    return true;
  }
}
