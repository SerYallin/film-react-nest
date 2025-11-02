import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(level: string, message: any, optionalParams: any[]) {
    return JSON.stringify({
      level,
      message: this.stringify(message),
      optionalParams,
    });
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
  error(message: any, ...optionalParams): any {
    console.error(this.formatMessage('error', message, optionalParams));
  }
  warn(message: any, ...optionalParams): any {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
  debug(message: any, ...optionalParams): any {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  private stringify(message: any): string {
    if (typeof message === 'object') {
      try {
        return JSON.stringify(message);
      } catch {
        return message.toString();
      }
    }
    return message.toString();
  }
}
