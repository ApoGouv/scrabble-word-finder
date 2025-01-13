/**
 * Utility to check if the app is in development mode.
 * Vite environment variable to check if the app is running in development mode
 *
 * @returns {boolean} True if in development mode, false otherwise.
 */
export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}
