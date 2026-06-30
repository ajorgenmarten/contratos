import { User } from './modules/v1/commons/types/models.classes';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
