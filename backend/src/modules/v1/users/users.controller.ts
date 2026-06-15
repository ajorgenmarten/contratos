import { Controller, Post } from '@nestjs/common';
import UsersService from './users.service';

@Controller('v1/users')
export default class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Post()
  createUser() {}
}
