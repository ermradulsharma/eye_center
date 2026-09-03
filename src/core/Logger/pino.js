import pino from 'pino';

/**
 * Structured Pino logger instance with x-request-id context support
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: { env: process.env.NODE_ENV || 'development' },
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ['req.headers.authorization', 'patientPhone', 'patientEmail', 'password', 'passwordHash'],
    censor: '[REDACTED_PII]',
  },
});

export function getLogger(requestId = '') {
  return requestId ? logger.child({ requestId }) : logger;
}
