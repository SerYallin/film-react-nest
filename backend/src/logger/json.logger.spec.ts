import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Проверка log метода', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    const message = 'Test message';
    logger.log(message);
    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: message,
        optionalParams: [],
      }),
    );
  });
  test('Проверка error метода', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const message = 'Test message';
    logger.error(message);
    expect(console.error).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: message,
        optionalParams: [],
      }),
    );
  });
  test('Проверка warn метода', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'Test message';
    logger.warn(message);
    expect(console.warn).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'warn',
        message: message,
        optionalParams: [],
      }),
    );
  });
  test('Проверка debug метода', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    const message = 'Test message';
    logger.debug(message);
    expect(console.debug).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'debug',
        message: message,
        optionalParams: [],
      }),
    );
  });
});
