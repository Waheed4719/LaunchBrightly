import { defineComponent } from 'vue';

/**
 * Creates a debounced version of the provided function.
 *
 * @template T The type of the original callback function.
 * @param {T} callback The original callback function to be debounced.
 * @param {number} delay The delay in milliseconds to wait before calling the callback after the last invocation.
 * @returns {(...args: Parameters<T>) => void} The debounced version of the callback function.
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;
  return function (
    this: ReturnType<typeof defineComponent>,
    ...args: Parameters<T>
  ) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/**
 * Formats a date string into a human-readable date format.
 *
 * @param {string} dateString The date string to be formatted.
 * @returns {string} The formatted date in the "DD-MM-YYYY HH:mm:ss" format.
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Adding 1 to get the correct month (0-indexed)
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${String(day).padStart(2, '0')}-${String(
    month
  ).padStart(2, '0')}-${String(year).padStart(2, '0')} ${String(hours).padStart(
    2,
    '0'
  )}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedDate;
};

/**
 * Converts a date string into a JavaScript Date object.
 *
 * @param {string} dateString The date string to be converted into a Date object.
 * @returns {Date} The JavaScript Date object representing the parsed date.
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Returns the CSS class name for the given edition.
 *
 * @param {string} edition The edition for which the CSS class name is needed.
 * @returns {string} The CSS class name corresponding to the given edition.
 */
export const getClassNameForEdition = (edition: string): string => {
  switch (edition.toLocaleLowerCase()) {
    case 'rev':
      return 'bg-red-200 dark:bg-red-600 dark:text-red-400 bg-opacity-50';
    case 'arr metrics':
      return 'bg-green-200 dark:bg-green-600 dark:text-green-400 bg-opacity-50';
    case 'subs':
      return 'bg-blue-200 dark:bg-blue-600 dark:text-blue-400 bg-opacity-50';
    case 'mrr metrics':
      return 'bg-yellow-200 dark:bg-yellow-600 dark:text-yellow-400 bg-opacity-50';
    case 'control center':
      return 'bg-purple-200 dark:bg-purple-600 dark:text-purple-400 bg-opacity-50';
    default:
      return '';
  }
};
