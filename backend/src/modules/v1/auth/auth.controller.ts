import { Controller, Post } from '@nestjs/common';

@Controller('v1/auth')
export default class AuthController {
  @Post('login')
  login() { }
}
