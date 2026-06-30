import { Injectable } from '@nestjs/common';
import envs from 'src/config/envs';
import jwt from 'jsonwebtoken';

@Injectable()
export default class JWTService {
  generateAccessToken(data: Record<string, any> | string) {
    const token = jwt.sign(data, envs.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    return token;
  }

  generateRefreshToken(data: Record<string, any> | string) {
    const token = jwt.sign(data, envs.JWT_REFRESH_SECRET);
    return token;
  }

  verifyRefreshToken(token: string) {
    try {
      const payload = jwt.verify(token, envs.JWT_REFRESH_SECRET);
      return payload;
    } catch {
      return null;
    }
  }

  verifyAccessToken(token: string) {
    try {
      const payload = jwt.verify(token, envs.JWT_ACCESS_SECRET);
      return payload;
    } catch {
      return null;
    }
  }
}
