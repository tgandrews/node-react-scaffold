import { createLogger, transports } from 'winston';

let logger;

export default () => {
  if (logger) {
    return logger;
  }

  logger = createLogger({
    transports: [new transports.Console()],
  });
  return logger;
};
