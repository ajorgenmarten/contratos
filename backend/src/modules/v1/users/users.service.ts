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
import UpdateUserDto from './dto/update-user.dto';
import DisableUserDto from './dto/disable-user.dto';

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

  async getUser(id: string) {
    const user = await this.UsersRepository.findUserById(id);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return { user: user.toObject() };
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

  async updateUser(data: UpdateUserDto) {
    const foundUser = await this.UsersRepository.findUserById(data.userId);

    if (!foundUser) throw new NotFoundException('Usuario no encontrado');

    foundUser.name = data.name;
    foundUser.role = data.role;

    await this.UsersRepository.updateUser(foundUser);

    return { message: `Usuario ${foundUser.username} ha sido modificado` };
  }

  async disableUser(data: DisableUserDto) {
    const foundUser = await this.UsersRepository.findUserById(data.userId);

    if (!foundUser) throw new NotFoundException('Usuario no encontrado');

    foundUser.active = data.active;

    await this.UsersRepository.updateUser(foundUser);

    return {
      message: `Usuario ${foundUser.username} has sido ${foundUser.active ? 'habilidato' : 'deshabilitado'}`,
    };
  }
}
