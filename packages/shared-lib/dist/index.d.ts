/**
 * Configuration interface for the library
 */
export interface Config {
    apiUrl: string;
    timeout: number;
    retryCount: number;
}
/**
 * Default configuration
 */
export declare const defaultConfig: Config;
/**
 * Utility function to format a user name
 */
export declare function formatUserName(firstName: string, lastName: string): string;
/**
 * Utility function to validate email format
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Utility function to create a delay (for async operations)
 */
export declare function delay(ms: number): Promise<void>;
/**
 * Logger utility class
 */
export declare class Logger {
    private prefix;
    constructor(prefix?: string);
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
}
/**
 * HTTP response wrapper
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: Date;
}
/**
 * Create a standardized API response
 */
export declare function createApiResponse<T>(success: boolean, data?: T, error?: string): ApiResponse<T>;
//# sourceMappingURL=index.d.ts.map