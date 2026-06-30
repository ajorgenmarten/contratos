import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import UsersRepository from './users.repository';
import { User } from '../commons/types/models.classes';
import FilterUserDto from './dto/filter-user.dto';
import ResetPasswordDto from './dto/reset-password.dto';

@Injectable()
export default class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    const userFound = await this.UsersRepository.findUserByUsername(
      data.username,
    );

    if (userFound)
      throw new ConflictException(
        'Ya existe un usuario con el mismo nombre de usuario',
      );

    const user = User.new(data.name, data.username, data.password, data.role);

    await this.UsersRepository.addUser(user);

    return user.toObject();
  }

  filterUser(data: FilterUserDto) {
    return this.UsersRepository.filterUsers(data);
  }

  async resetPassword(data: ResetPasswordDto) {
    const userFound = await this.UsersRepository.findUserById(data.userId);

    if (!userFound) throw new NotFoundException('El usuario no existe');

    userFound.setPassword(data.newPassword);

    await this.UsersRepository.updateUser(userFound);

    return { message: 'Nueva contraseña modificada' };
  }
}
