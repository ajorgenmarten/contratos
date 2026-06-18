import { Injectable } from '@nestjs/common';
import PrismaService from '../commons/services/prisma.service';
import { Session } from '../commons/types/models.classes';

@Injectable()
export default class AuthRepository {
  constructor(private readonly PrismaService: PrismaService) {}

  addSession(session: Session) {
    return this.PrismaService.session.create({
      data: {
        id: session.id,
        userId: session.userId,
        createdAt: session.createdAt,
      },
    });
  }
}
