import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
    jest.spyOn(process.stdout, 'write');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Проверка метода log', () => {
    const message = 'Test log message';
    logger.log(message);
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining(message),
    );
  });

  test('Проверка метода warn', () => {
    const message = 'Test error message';
    logger.warn(message);
    expect(process.stdout.write).toHaveBeenCalledWith(
      expect.stringContaining(message),
    );
  });

  test('Проверка метода debug', () => {
    const message = 'Test error message';
    logger.debug(message);
    expect(process.stdout.write).toHaveBeenCalled();
  });

  test('Проверка метода error', () => {
    jest.spyOn(process.stderr, 'write');
    const message = 'Test error message';
    logger.error(message);
    expect(process.stderr.write).toHaveBeenCalled();
  });
});
