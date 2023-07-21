import { ref, Ref, computed } from '@vue/reactivity';
import axios from 'axios';
import { usePagination } from './usePagination';
import { FeatureItem, Edition, Feature } from '@/types';
import { API_URL } from '@/config';

export function useFeaturesAPI(
  currentPage: Ref<number>,
  rowsPerPage?: Ref<number>
) {
  const features: Ref<FeatureItem[]> = ref([]);

  const featuresAreLoading = ref(false);

  const sortKey = ref<string | null>(null);
  const sortOrder = ref<string | null>(null);

  const sortFeatures = (payload: { sortKey: string; sortOrder: string }) => {
    sortKey.value = payload.sortKey;
    sortOrder.value = payload.sortOrder;
  };

  const sortedFeatures = computed(() => {
    let sortingFunction: ((a: any, b: any) => number) | null = null;

    if (sortKey.value === 'Id') {
      sortingFunction = (a, b) => a.id - b.id;
    } else if (sortKey.value === 'Name') {
      sortingFunction = (a, b) => a.name.localeCompare(b.name);
    } else if (sortKey.value === 'Description') {
      sortingFunction = (a, b) => a.description.localeCompare(b.description);
    } else if (sortKey.value === 'Editions') {
      sortingFunction = (a, b) => a.editions - b.editions;
    }

    const sortedData = sortingFunction
      ? features.value.slice().sort(sortingFunction)
      : features.value;

    if (sortOrder.value === 'DESC') {
      sortedData.reverse();
    }

    return sortedData;
  });

  const { paginatedArray, numberOfPages } = usePagination<FeatureItem>({
    rowsPerPage,
    arrayToPaginate: sortedFeatures,
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
  console.log('here', paginatedArray.value);
  return {
    features: paginatedArray,
    sortFeatures,
    loadFeatures,
    featuresAreLoading,
    numberOfPages,
  };
}
