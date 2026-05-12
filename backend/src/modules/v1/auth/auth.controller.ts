import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('v1/auth')
export default class AuthController {
  @Post('login')
  login() { }

  @Delete('logout')
  logout() { }

  @Get('refresh')
  refreshToken() { }

  @Delete('remove-session')
  removeSession() { }
}
