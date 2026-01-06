import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // opcional hasta que se asigne
    }
  }
}
