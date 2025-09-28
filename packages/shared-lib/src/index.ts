// Shared library with utility functions

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
export const defaultConfig: Config = {
  apiUrl: 'http://localhost:3000',
  timeout: 5000,
  retryCount: 3,
};

/**
 * Utility function to format a user name
 */
export function formatUserName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

/**
 * Utility function to validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Utility function to create a delay (for async operations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Logger utility class
 */
export class Logger {
  private prefix: string;

  constructor(prefix: string = 'APP') {
    this.prefix = prefix;
  }

  info(message: string, ...args: unknown[]): void {
    console.log(`[${this.prefix}] INFO:`, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[${this.prefix}] WARN:`, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[${this.prefix}] ERROR:`, message, ...args);
  }
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
export function createApiResponse<T>(
  success: boolean,
  data?: T,
  error?: string
): ApiResponse<T> {
  return {
    success,
    data,
    error,
    timestamp: new Date(),
  };
}
