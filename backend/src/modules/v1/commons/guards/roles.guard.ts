import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../types/models.classes';
import { RoleType } from '../types/modles.types';
import Roles from '../decorator/role.decorator';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private readonly Reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler();
    const controller = context.getClass();

    const user = request.user as User;

    const roles: RoleType[] = this.Reflector.getAllAndOverride(Roles, [
      handler,
      controller,
    ]);

    if (!roles) return true;

    if (!roles.includes(user.role))
      throw new ForbiddenException('No tiene acceso a este recurso');

    return true;
  }
}
