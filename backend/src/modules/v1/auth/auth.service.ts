import { Injectable, UnauthorizedException } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import UsersRepository from '../users/users.repository';
import JWTService from '../commons/services/jwt.service';
import { Session } from '../commons/types/models.classes';
import AuthRepository from './auth.repository';

@Injectable()
export default class AuthService {
  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly UsersRepository: UsersRepository,
    private readonly JWTService: JWTService,
  ) {}

  async login(data: LoginDto) {
    const foundUser = await this.UsersRepository.findUserByUsername(
      data.username,
    );

    if (!foundUser) throw new UnauthorizedException('Credenciales incorrectas');

    if (foundUser.active)
      throw new UnauthorizedException(
        'Su cuenta ha sido deshabilitada, porfavor contacte con el administrador',
      );

    if (!foundUser.comparePassword(data.password))
      throw new UnauthorizedException('Credenciales incorrectas');

    const session = Session.new(foundUser);

    await this.AuthRepository.addSession(session);

    const accessToken: string = this.JWTService.generateAccessToken({
      uid: foundUser.id,
    });
    const refreshToken: string = this.JWTService.generateRefreshToken({
      sid: session.id,
    });

    return { accessToken, refreshToken };
  }
}
