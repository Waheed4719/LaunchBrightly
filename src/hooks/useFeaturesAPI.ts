// useFeaturesAPI.ts

import { ref, Ref } from '@vue/reactivity';
import axios from 'axios';
import { usePagination } from './usePagination';
import { FeatureItem, Edition, Feature } from '@/types';
import { API_URL } from '@/config';
import { useFeaturesSorting } from './useFeaturesSorting';

export function useFeaturesAPI(
  currentPage: Ref<number>,
  rowsPerPage?: Ref<number>
) {
  const features: Ref<FeatureItem[]> = ref([]);

  const featuresAreLoading = ref(false);

  // filter features array
  const filters = ref<string[]>([]);

  // sorting features array
  const sortKey = ref<string | null>(null);
  const sortOrder = ref<string | null>(null);

  const arrayToPaginate = useFeaturesSorting(features, sortKey, sortOrder);

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
    filterFeatures,
    loadFeatures,
    featuresAreLoading,
    numberOfPages,
  };
}

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
