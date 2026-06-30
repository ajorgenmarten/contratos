import { Injectable } from '@nestjs/common';
import PrismaService from '../commons/services/prisma.service';
import { User } from '../commons/types/models.classes';
import FilterUserDto from './dto/filter-user.dto';
import { UserWhereInput } from 'generated/prisma/models';

@Injectable()
export default class UsersRepository {
  constructor(private readonly PrismaService: PrismaService) {}

  async findUserByUsername(username: string) {
    const user = await this.PrismaService.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
    });

    if (!user) return null;

    return User.fromPrisma(user);
  }

  async filterUsers(data: FilterUserDto) {
    const page = data.page || 1;
    const pageSize = 20;
    const search = data.search || '';

    const where: UserWhereInput = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ],
    };

    const totalItems = await this.PrismaService.user.count({
      where,
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    const results = await this.PrismaService.user.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
    });

    return {
      totalPages,
      totalItems,
      page,
      results: results.map((user) => User.fromPrisma(user).toObject()),
    };
  }

  addUser(user: User) {
    return this.PrismaService.user.create({
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        active: user.active,
        name: user.name,
        createdAt: user.createdAt,
      },
    });
  }

  async findUserById(uid: string) {
    const user = await this.PrismaService.user.findFirst({
      where: { id: uid },
    });

    if (!user) return null;

    return User.fromPrisma(user);
  }

  updateUser(user: User) {
    return this.PrismaService.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        username: user.username,
        password: user.password,
        active: user.active,
        role: user.role,
      },
    });
  }
}
