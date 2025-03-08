import pino from 'pino';
export declare const logger: pino.Logger<never>;
export declare const logError: (err: Error, context?: Record<string, unknown>) => void;
export declare const logApiRequest: (method: string, path: string, statusCode: number, responseTime: number, userAgent?: string, userId?: string) => void;
export declare const logMarketingEvent: (eventType: string, source: string, data: Record<string, unknown>) => void;
export declare const logSeoEvent: (eventType: string, path: string, data: Record<string, unknown>) => void;
