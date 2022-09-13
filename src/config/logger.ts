import {logger, consoleTransport} from 'react-native-logs';

const log = logger.createLogger({
  transport: consoleTransport,
  transportOptions: {
    colors: {
      debug: 'greenBright',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
});

export {log};
