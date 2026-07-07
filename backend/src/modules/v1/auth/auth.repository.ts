import { Injectable } from '@nestjs/common';
import PrismaService from '../commons/services/prisma.service';
import { Session, User } from '../commons/types/models.classes';

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

  async getUserBySessionId(sid: string) {
    const foundSession = await this.PrismaService.session.findFirst({
      where: { id: sid },
      include: { User: true },
    });

    if (!foundSession) return null;

    return User.fromPrisma(foundSession.User);
  }

  deleteSessionById(sid: string) {
    return this.PrismaService.session.delete({ where: { id: sid } });
  }

  deleteSessionsByUserId(uid: string) {
    return this.PrismaService.session.deleteMany({ where: { userId: uid } });
  }

  async getSessionsByUserId(uid: string) {
    return this.PrismaService.session.findMany({
      where: { userId: uid },
    });
  }
}
