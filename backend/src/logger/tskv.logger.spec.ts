import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  const message: string = 'Test message';
  const optionalParams = 'TestCallback';

  beforeEach(() => {
    logger = new TskvLogger();
    // Можем замокать console, если нужно
    jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Проверка формата log', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.log(message, optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      `level="log"\tmessage="${message}"\tparam_0="${optionalParams}"`,
    );
  });
  test('Проверка формата error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error(message, optionalParams);
    expect(console.error).toHaveBeenCalledWith(
      `level="error"\tmessage="${message}"\tparam_0="${optionalParams}"`,
    );
  });
  test('Проверка формата warn', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const message = 'Test message';
    logger.warn(message);
    expect(console.warn).toHaveBeenCalledWith(
      `level="warn"\tmessage="${message}"`,
    );
  });

  test('Проверка формата debug', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    const message = 'Test message';
    logger.debug(message);
    expect(console.debug).toHaveBeenCalledWith(
      `level="debug"\tmessage="${message}"`,
    );
  });
});
