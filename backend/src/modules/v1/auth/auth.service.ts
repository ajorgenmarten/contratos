import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import LoginDto from './dto/login.dto';
import UsersRepository from '../users/users.repository';
import JWTService from '../commons/services/jwt.service';
import { Session, User } from '../commons/types/models.classes';
import AuthRepository from './auth.repository';
import ChangePasswordDto from './dto/change-password.dto';

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

    if (!foundUser.active)
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

    return { accessToken, refreshToken, user: foundUser.toObject() };
  }

  refreshToken(user?: User) {
    if (!user) throw new ForbiddenException('No tiene acceso');

    const accessToken: string = this.JWTService.generateAccessToken({
      uid: user.id,
    });

    return { accessToken };
  }

  changePassword(user: User, data: ChangePasswordDto) {
    user.changePassword(data.oldPassword, data.newPassword);
    return this.UsersRepository.updateUser(user)
      .then(() => ({
        message: 'Contraseña cambiada',
      }))
      .catch((err) => {
        throw err;
      });
  }

  deleteSession(id: string) {
    return this.AuthRepository.deleteSessionById(id)
      .then(() => ({
        message: 'Sesión eliminada correctamente',
      }))
      .catch((err) => {
        throw err;
      });
  }

  logout(sid: string) {
    return this.AuthRepository.deleteSessionById(sid);
  }

  getMySessions(uid: string) {
    return this.AuthRepository.getSessionsByUserId(uid);
  }
}
