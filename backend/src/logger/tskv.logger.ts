import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  private formatMessage(level: string, message: any, optionalParams: any[]) {
    const parts = [`level="${level}"`];
    if (message instanceof Error) {
      parts.push(`message="${message.message}"`);
    } else {
      parts.push(`message="${this.stringify(message)}"`);
    }
    optionalParams.forEach((param, key) => {
      parts.push(`param_${key}="${this.stringify(param)}"`);
    });

    return parts.filter(Boolean).join('\t');
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
