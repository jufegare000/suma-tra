import * as expressWiston from 'express-winston';
import winston from 'winston';
import debug from 'debug';

export const debugLog: debug.IDebugger = debug('app')

export const loggerOptions: expressWiston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all:true})
    )
};

if (process.env.DEBUG) {
    process.on('unhandledRejection', function(reason) {
        debugLog('Unhandled Rejection: ', reason);
    })
} else {
    loggerOptions.meta = false;
}