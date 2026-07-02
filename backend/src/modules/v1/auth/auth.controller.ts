import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import LoginDto from './dto/login.dto';
import AuthService from './auth.service';
import { type Request, type Response } from 'express';
import SessionGuard from '../commons/guards/session.guard';

@Controller('v1/auth')
export default class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const { refreshToken, accessToken, user } =
      await this.AuthService.login(body);

    return res
      .cookie('refresh-token', refreshToken, {
        httpOnly: true,
      })
      .json({ accessToken, user });
  }

  @UseGuards(SessionGuard)
  @Delete('logout')
  logout(@Req() request: Request, @Res() res: Response) {
    return res.clearCookie('refresh-token').json({ message: 'Vuelva pronto.' });
  }

  @UseGuards(SessionGuard)
  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.AuthService.refreshToken(request.user);
  }
}
