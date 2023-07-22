import { computed } from 'vue';
// useFeaturesAPI.ts

import { ref, Ref } from 'vue';
import axios from 'axios';
import { usePagination } from './usePagination';
import { FeatureItem, Edition, Feature } from '@/types';
import { API_URL } from '@/config';
import { useFeaturesSorting } from './useFeaturesSorting';

export const useFeaturesAPI = (
  currentPage: Ref<number>,
  rowsPerPage?: Ref<number>
) => {
  const features: Ref<FeatureItem[]> = ref([]);

  const featuresAreLoading = ref(false);

  // filter features array
  const filterText: Ref<string> = ref<string>('');
  const filters = ref<string[]>([]);
  const filteredFeatures = computed(() =>
    features.value.filter((item: FeatureItem) => {
      let flag = true;
      if (filterText.value !== '' && filterText.value !== null) {
        if (!item.name.toLowerCase().includes(filterText.value.toLowerCase())) {
          flag = false;
        }
      }
      if (filters.value.length === 0 && flag) {
        return true;
      } else {
        return (
          item.editions.some((edition) =>
            filters.value.includes(edition.name)
          ) && flag
        );
      }
    })
  );
  // sorting features array
  const sortKey = ref<string>('');
  const sortOrder = ref<string>('');

  const arrayToPaginate = useFeaturesSorting(
    filteredFeatures,
    sortKey,
    sortOrder
  );

  // paginating features array
  const { paginatedArray, numberOfPages } = usePagination<FeatureItem>({
    rowsPerPage,
    arrayToPaginate: arrayToPaginate,
    currentPage,
  });

  // loading features from API
  const loadFeatures = async () => {
    featuresAreLoading.value = true;
    try {
      const response = await axios.get(API_URL);
      features.value = response.data.features.items.map((item: Feature) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        editions: item.FeatureEditions.items.map(
          (item: { edition: Edition }) => ({
            id: item.edition.id,
            name: item.edition.name,
          })
        ),
        timeOfCapture: item.screenshots.items[0]?.timeOfCapture,
      })) as FeatureItem[];
    } catch (err) {
      console.log(err);
    } finally {
      featuresAreLoading.value = false;
    }
  };

  const sortFeatures = (payload: { sortKey: string; sortOrder: string }) => {
    sortKey.value = payload.sortKey;
    sortOrder.value = payload.sortOrder;
  };

  const filterFeatures = (payload: { filter: string }) => {
    currentPage.value = 1;
    if (filters.value?.includes(payload.filter)) {
      filters.value = filters.value.filter(
        (item: string) => item !== payload.filter
      );
    } else {
      filters.value.push(payload.filter);
    }
  };

  return {
    features: paginatedArray,
    sortFeatures,
    sortKey,
    sortOrder,
    filters,
    filterText,
    filterFeatures,
    loadFeatures,
    featuresAreLoading,
    numberOfPages,
  };
};

// let sortingFunction: ((a: FeatureItem, b: FeatureItem) => number) | null =
//   null;
// if (sortKey === 'id') {
//   sortingFunction = (a, b) => {
//     if (sortOrder === 'ASC') {
//       return a.id.localeCompare(b.id);
//     } else {
//       return b.id.localeCompare(a.id);
//     }
//   };
// } else if (sortKey === 'name') {
//   sortingFunction = (a, b) => {
//     if (sortOrder === 'ASC') {
//       return a.name.localeCompare(b.name);
//     } else {
//       return b.name.localeCompare(a.name);
//     }
//   };
// } else if (sortKey === 'description') {
//   sortingFunction = (a, b) => {
//     if (sortOrder === 'ASC') {
//       return a.description.localeCompare(b.description);
//     } else {
//       return b.description.localeCompare(a.description);
//     }
//   };
// }
