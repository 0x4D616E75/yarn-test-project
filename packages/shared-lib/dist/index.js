// Shared library with utility functions
/**
 * Default configuration
 */
export const defaultConfig = {
    apiUrl: 'http://localhost:3000',
    timeout: 5000,
    retryCount: 3,
};
/**
 * Utility function to format a user name
 */
export function formatUserName(firstName, lastName) {
    return `${firstName} ${lastName}`.trim();
}
/**
 * Utility function to validate email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Utility function to create a delay (for async operations)
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * Logger utility class
 */
export class Logger {
    prefix;
    constructor(prefix = 'APP') {
        this.prefix = prefix;
    }
    info(message, ...args) {
        console.log(`[${this.prefix}] INFO:`, message, ...args);
    }
    warn(message, ...args) {
        console.warn(`[${this.prefix}] WARN:`, message, ...args);
    }
    error(message, ...args) {
        console.error(`[${this.prefix}] ERROR:`, message, ...args);
    }
}
/**
 * Create a standardized API response
 */
export function createApiResponse(success, data, error) {
    return {
        success,
        data,
        error,
        timestamp: new Date(),
    };
}
//# sourceMappingURL=index.js.map