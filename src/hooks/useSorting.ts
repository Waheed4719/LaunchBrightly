import { Ref, computed } from 'vue';

export function useSorting<T>(
  arrayToSort: Ref<T[]>,
  sortKey: Ref<string | null>,
  sortOrder: Ref<string | null>,
  sortingFunction: (a: T, b: T) => number
) {
  const sortedFeatures = computed(() => {
    const sortedData = sortingFunction
      ? arrayToSort.value.slice().sort(sortingFunction)
      : arrayToSort.value;

    return sortedData;
  });

  return sortedFeatures;
}
