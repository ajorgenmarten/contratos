import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/create-user.dto';
import FilterUserDto from './dto/filter-user.dto';

@Controller('v1/users')
export default class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Post('add')
  createUser(@Body() body: CreateUserDto) {
    return this.UserService.createUser(body);
  }

  @Post('disable')
  disableUser() {}

  @Put('update')
  updateUser() {}

  @Get('filter')
  filterUsers(@Query() query: FilterUserDto) {
    return this.UserService.filterUser(query);
  }
}
