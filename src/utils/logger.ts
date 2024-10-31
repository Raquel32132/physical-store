import winston from "winston";
import { Request } from 'express';

const { combine, timestamp, printf, json, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, correlationId }) => {
  return `${timestamp} [${level}]: ${message} ${correlationId ? `(correlationId: ${correlationId})` : ''}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine (
    colorize(),
    timestamp(),
    json(),
    logFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export const logWithCorrelationId = (req: Request) => {
  const correlationId = req.headers['x-correlation-id'];

  return {
    info: (message: string) => logger.info({ message, correlationId }),
    warn: (message: string) => logger.warn({ message, correlationId }),
    error: (message: string) => logger.error({ message, correlationId }),
  };
};

