import { Module } from '@nestjs/common';
import PrismaService from './commons/services/prisma.service';
import ContractsService from './contracts/contracts.service';
import ContractsRepository from './contracts/contracts.repository';
import ContractsController from './contracts/contracts.controller';
import UserService from './users/users.service';
import UsersController from './users/users.controller';
import UsersRepository from './users/users.repository';

@Module({
  providers: [
    // Common providers
    PrismaService,

    // Contracts providers
    ContractsService,
    ContractsRepository,

    // Users providers
    UserService,
    UsersRepository,
  ],
  controllers: [
    // Contracts controllers
    ContractsController,

    // Users controllers
    UsersController,
  ],
})
export default class V1Module {}
