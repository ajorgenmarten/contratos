import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import LoginDto from './dto/login.dto';
import AuthService from './auth.service';
import { type Request, type Response } from 'express';
import SessionGuard from '../commons/guards/session.guard';
import ChangePasswordDto from './dto/change-password.dto';
import AuthGuard from '../commons/guards/auth.guard';
import { User } from '../commons/types/models.classes';
import { isUUID } from 'class-validator';

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

  @UseGuards(SessionGuard, AuthGuard)
  @Put('change-password')
  changePassword(@Body() body: ChangePasswordDto, @Req() req: Request) {
    const user = req.user as User;
    return this.AuthService.changePassword(user, body);
  }

  @UseGuards(SessionGuard)
  @Delete('logout')
  logout(@Req() request: Request, @Res() res: Response) {
    return this.AuthService.logout(request.sessionId as string)
      .then(() =>
        res.clearCookie('refresh-token').json({ message: 'Vuelva pronto' }),
      )
      .catch((err) => {
        throw err;
      });
  }

  @UseGuards(SessionGuard)
  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.AuthService.refreshToken(request.user);
  }

  @UseGuards(SessionGuard, AuthGuard)
  @Get('my-sessions')
  mySessions(@Req() request: Request) {
    return this.AuthService.getMySessions((request.user as User).id);
  }

  @UseGuards(SessionGuard, AuthGuard)
  @Delete('session/:id')
  deleteSession(@Param('id') id: string) {
    if (!id || !isUUID(id))
      throw new BadRequestException('El id de sesión es incorrecto');
    return this.AuthService.deleteSession(id);
  }
}
