import { Ref } from '@vue/reactivity';
import { computed } from 'vue';
import { FeatureItem } from '@/types';

export function useFeaturesSorting(
  arrayToSort: Ref<FeatureItem[]>,
  sortKey: Ref<string | null>,
  sortOrder: Ref<string | null>
) {
  const sortedFeatures = computed(() => {
    let sortingFunction: ((a: FeatureItem, b: FeatureItem) => number) | null =
      null;
    if (sortKey.value === 'id') {
      sortingFunction = (a, b) => {
        if (sortOrder.value === 'ASC') {
          return a.id.localeCompare(b.id);
        } else {
          return b.id.localeCompare(a.id);
        }
      };
    } else if (sortKey.value === 'name') {
      sortingFunction = (a, b) => {
        if (sortOrder.value === 'ASC') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      };
    } else if (sortKey.value === 'description') {
      sortingFunction = (a, b) => {
        if (sortOrder.value === 'ASC') {
          return a.description.localeCompare(b.description);
        } else {
          return b.description.localeCompare(a.description);
        }
      };
    }

    const sortedData = sortingFunction
      ? arrayToSort.value.slice().sort(sortingFunction)
      : arrayToSort.value;

    return sortedData;
  });

  return sortedFeatures;
}
