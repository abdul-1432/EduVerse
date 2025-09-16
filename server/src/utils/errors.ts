import { Request, Response, NextFunction } from 'express';

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ message: 'Route not found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  if (err?.issues) {
    // zod error
    return res.status(400).json({ message: 'Validation error', issues: err.issues });
  }
  res.status(500).json({ message: 'Internal server error' });
}
