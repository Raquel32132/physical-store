import winston from "winston";
import { Request } from 'express';

const { combine, timestamp, json, prettyPrint  } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine (
    timestamp(),
    json(),
    prettyPrint()
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

