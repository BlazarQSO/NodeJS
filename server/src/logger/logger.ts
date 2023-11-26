import { Request } from 'express';
import winston from 'winston';
import 'dotenv/config';

export const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: process.env.LOG_LEVEL || 'info',
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
