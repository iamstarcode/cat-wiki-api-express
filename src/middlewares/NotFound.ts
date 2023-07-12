import { NextFunction, Request, Response } from 'express';

const NotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Not Foundm - ${req.originalUrl}`);
  next(error);
};

export default NotFound;
