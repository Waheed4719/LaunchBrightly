// useFeaturesAPI.ts

import { ref, Ref } from '@vue/reactivity';
import axios from 'axios';
import { usePagination } from './usePagination';
import { FeatureItem, Edition, Feature } from '@/types';
import { API_URL } from '@/config';
import { useSorting } from './useSorting';

export function useFeaturesAPI(
  currentPage: Ref<number>,
  rowsPerPage?: Ref<number>
) {
  const features: Ref<FeatureItem[]> = ref([]);

  const featuresAreLoading = ref(false);

  const sortKey = ref<string | null>(null);
  const sortOrder = ref<string | null>(null);

  const { paginatedArray, numberOfPages } = usePagination<FeatureItem>({
    rowsPerPage,
    arrayToPaginate: useSorting(features, sortKey, sortOrder),
    currentPage,
  });

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

  console.log('here', paginatedArray.value);
  return {
    features: paginatedArray,
    sortFeatures,
    sortKey,
    sortOrder,
    loadFeatures,
    featuresAreLoading,
    numberOfPages,
  };
}
