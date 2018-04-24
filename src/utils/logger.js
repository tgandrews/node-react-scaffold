import { Logger, transports } from 'winston';

let logger;

export default () => {
  if (logger) {
    return logger;
  }

  logger = new Logger({
    transports: [new transports.Console()],
  });
  return logger;
};
