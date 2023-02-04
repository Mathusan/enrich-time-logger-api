import { createLogger, transports, format } from "winston";

 export const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'warningLogs.log',
            level: 'warn',
            format: format.combine(format.timestamp(),format.json())
    }),
        new transports.File({
            filename: 'errorLogs.log',
            level: 'error',
            format: format.combine(format.timestamp(),format.json())
    }),
]
});