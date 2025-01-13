import { logger } from '@/utils/logger';

/**
 * Retrieves the currently focused element on the page.
 * Useful when we need to check the focused element for keyboard events or
 * remove focus from an element programmatically.
 *
 * @returns The currently focused DOM element, or null if none is focused.
 */
export function getCurrentFocusedElement() {
  // Try to get the currently focused element
  let focusedElement = document.activeElement;

  // Check if the focused element is the body or if no element is focused
  if (!focusedElement || focusedElement === document.body) {
    // Use :focus pseudo-class as a fallback
    focusedElement = document.querySelector(':focus') || null;
  }

  // Log the currently focused element
  logger.log('Currently focused element:', focusedElement);

  // Return the focused element or null if none is found
  return focusedElement;
}

/**
 * Checks if an element is within the viewport.
 * Used to determine if results `div` should be scrolled into view.
 *
 * @param element The DOM element to check.
 * @returns True if the element is within the viewport, false otherwise.
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
