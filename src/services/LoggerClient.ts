import { format, transports, createLogger, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import morgan, { StreamOptions } from 'morgan';
import { Service } from 'typedi';
const { combine, timestamp, json } = format;

@Service()
export class LoggerClient {
  private logger: Logger;

  constructor(service = 'general-purpose') {
    this.logger = createLogger({
      defaultMeta: { service },
      format: combine(
        timestamp(),
        json(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
      transports: [
        new transports.Console(),
        this.getHttpLoggerTransport(),
        this.getInfoLoggerTransport(),
        this.getErrorLoggerTransport(),
      ],
    });
  }

  info = (message: string) => {
    this.logger.info(message);
  };

  error = (message: string) => {
    this.logger.error(message);
  };

  private errorFilter = format((info, opts) => {
    return info.level === 'error' ? info : false;
  });

  private infoFilter = format((info, opts) => {
    return info.level === 'info' ? info : false;
  });

  private httpFilter = format((info, opts) => {
    return info.level === 'http' ? info : false;
  });

  private getInfoLoggerTransport = () => {
    return new DailyRotateFile({
      filename: 'logs/info-%DATE%.log',
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
      level: 'info',
      format: format.combine(this.infoFilter(), format.timestamp(), json()),
    });
  };
  private getErrorLoggerTransport = () => {
    return new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
      level: 'error',
      format: format.combine(this.errorFilter(), format.timestamp(), json()),
    });
  };
  private getHttpLoggerTransport = () => {
    return new DailyRotateFile({
      filename: 'logs/http-%DATE%.log',
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
      level: 'http',
      format: format.combine(this.httpFilter(), format.timestamp(), json()),
    });
  };

  private getHttpLoggerInstance = () => {
    const stream: StreamOptions = {
      write: (message: string) => this.logger.http(message),
    };

    const skip = () => {
      const env = process.env.NODE_ENV || 'development';
      return env !== 'development';
    };

    const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms :remote-addr', {
      stream,
      skip,
    });

    return morganMiddleware;
  };
}
