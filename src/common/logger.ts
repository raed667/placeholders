import { createLogger, format, transports } from "winston";
import { environment } from "./environment";
const { Console } = transports;
const { LOG_LEVEL } = environment();

// Init logger
const logger = createLogger({
  level: LOG_LEVEL,
});

const errorStackFormat = format((info) => {
  if (info.stack) {
    console.log(info.stack);
    return false;
  }
  return info;
});
const consoleTransport = new Console({
  format: format.combine(
    format.colorize(),
    format.simple(),
    errorStackFormat()
  ),
});
logger.add(consoleTransport);

export const LogCreator = () => {
  return ({ level, log }: any) => {
    logger.log({
      level,
      ...log,
    });
  };
};

export default logger;
