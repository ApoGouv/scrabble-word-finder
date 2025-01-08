// Vite environment variable to check if the app is running in development mode
const isDevelopment = import.meta.env.MODE === 'development';

/**
 * Custom logger for development environment.
 * Logs messages to the console based on the app's current environment.
 * In development mode, all logs, warnings, and errors are displayed.
 * In production, only errors are shown.
 */
export const logger = {
  /**
   * Logs a message to the console if the app is in development mode.
   *
   * @param args - The message(s) to log.
   */
  log: (...args: any[]) => {
    if (isDevelopment) {
      // Logs the arguments passed to the console
      console.log(...args);
    }
  },

  /**
   * Logs a warning message to the console if the app is in development mode.
   *
   * @param args - The warning message(s) to log.
   */
  warn: (...args: any[]) => {
    if (isDevelopment) {
      // Logs warning messages to the console
      console.warn(...args);
    }
  },

  /**
   * Logs an error message to the console.
   * Errors are always shown, regardless of the environment.
   *
   * @param args - The error message(s) to log.
   */
  error: (...args: any[]) => {
    // Always logs error messages to the console
    console.error(...args);
  },
};
