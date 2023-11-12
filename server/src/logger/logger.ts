import { Request } from 'express';
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log.log' })
  ]
});

export const loggerWrite = (req: Request, timeName: string) => {
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  logger.info(`url: ${url}`);
  logger.info(`method: ${req.method}`);
  logger.profile(timeName);
};
