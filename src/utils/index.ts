import { defineComponent } from 'vue';

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
