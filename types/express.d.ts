import { Connection } from 'mysql';

declare global {
  namespace Express {
    interface Request {
      mysql?: Connection;
    }
  }
}
