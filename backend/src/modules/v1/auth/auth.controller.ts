import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import AuthService from './auth.service';

@Controller('v1/auth')
export default class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.AuthService.login(body);
  }

  @Delete('logout')
  logout() {}

  @Get('refresh-token')
  refreshToken() {}
}
