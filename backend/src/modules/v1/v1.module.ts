import { Module } from '@nestjs/common';
import PrismaService from './commons/services/prisma.service';
import ContractsService from './contracts/contracts.service';
import ContractsRepository from './contracts/contracts.repository';
import ContractsController from './contracts/contracts.controller';
import UserService from './users/users.service';
import UsersController from './users/users.controller';
import UsersRepository from './users/users.repository';
import AuthService from './auth/auth.service';
import AuthRepository from './auth/auth.repository';
import AuthController from './auth/auth.controller';
import JWTService from './commons/services/jwt.service';
import SessionGuard from './commons/guards/session.guard';
import AuthGuard from './commons/guards/auth.guard';
import RolesGuard from './commons/guards/roles.guard';

@Module({
  providers: [
    // Common providers
    PrismaService,
    JWTService,
    SessionGuard,
    AuthGuard,
    RolesGuard,

    // Contracts providers
    ContractsService,
    ContractsRepository,

    // Users providers
    UserService,
    UsersRepository,

    // Auth providers
    AuthService,
    AuthRepository,
  ],
  controllers: [
    // Contracts controllers
    ContractsController,

    // Users controllers
    UsersController,

    // Auth controllers
    AuthController,
  ],
})
export default class V1Module {}
