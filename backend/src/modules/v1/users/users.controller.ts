import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/create-user.dto';
import FilterUserDto from './dto/filter-user.dto';
import SessionGuard from '../commons/guards/session.guard';
import AuthGuard from '../commons/guards/auth.guard';
import ResetPasswordDto from './dto/reset-password.dto';
import Roles from '../commons/decorator/role.decorator';
import { RoleType } from '../commons/types/modles.types';
import RolesGuard from '../commons/guards/roles.guard';
import GetUserDto from './dto/get-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import DisableUserDto from './dto/disable-user.dto';

@Roles([RoleType.ADMINISTRADOR])
@UseGuards(SessionGuard, AuthGuard, RolesGuard)
@Controller('v1/users')
export default class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Post('add')
  createUser(@Body() body: CreateUserDto) {
    return this.UserService.createUser(body);
  }

  @Post('disable-user')
  disableUser(@Body() body: DisableUserDto) {
    return this.UserService.disableUser(body);
  }

  @Put('update')
  updateUser(@Body() body: UpdateUserDto) {
    return this.UserService.updateUser(body);
  }

  @Get('filter')
  filterUsers(@Query() query: FilterUserDto) {
    return this.UserService.filterUser(query);
  }

  @Get(':id')
  getUser(@Param() params: GetUserDto) {
    return this.UserService.getUser(params.id);
  }

  @Put('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.UserService.resetPassword(body);
  }
}
