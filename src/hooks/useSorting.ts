import { Ref } from '@vue/reactivity';
import { computed } from 'vue';
import { FeatureItem } from '@/types';

export function useSorting(
  arrayToSort: Ref<FeatureItem[]>,
  sortKey: Ref<string | null>,
  sortOrder: Ref<string | null>
) {
  const sortedFeatures = computed(() => {
    let sortingFunction: ((a: FeatureItem, b: FeatureItem) => number) | null =
      null;

    if (sortKey.value === 'Id') {
      sortingFunction = (a, b) => a.id.localeCompare(b.id);
    } else if (sortKey.value === 'Name') {
      sortingFunction = (a, b) => a.name.localeCompare(b.name);
    } else if (sortKey.value === 'Description') {
      sortingFunction = (a, b) => a.description.localeCompare(b.description);
    }

    const sortedData = sortingFunction
      ? arrayToSort.value.slice().sort(sortingFunction)
      : arrayToSort.value;

    if (sortOrder.value === 'DESC') {
      sortedData.reverse();
    }

    return sortedData;
  });

  return sortedFeatures;
}
