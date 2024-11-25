import pino from 'pino';
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:dd/mm/yyy HH:mm:ss',
        },
    },
});
export default logger;