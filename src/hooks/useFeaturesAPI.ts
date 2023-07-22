import { computed } from 'vue';
import { ref, Ref } from 'vue';
import axios from 'axios';
import { usePagination } from './usePagination';
import { FeatureItem, Edition, Feature } from '@/types';
import { API_URL } from '@/config';
import { useSorting } from './useSorting';
import { parseDate } from '@/utils';

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
  const sortName = ref<string>('');

  const sortingFunction = (a: FeatureItem, b: FeatureItem) => {
    if (sortKey.value === 'timeOfCapture') {
      const dateA = parseDate(a.timeOfCapture);
      const dateB = parseDate(b.timeOfCapture);

      if (sortOrder.value === 'ASC') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    } else if (
      sortKey.value === 'id' ||
      sortKey.value === 'name' ||
      sortKey.value === 'description'
    ) {
      if (sortOrder.value === 'ASC') {
        return a[sortKey.value].localeCompare(b[sortKey.value]);
      } else {
        return b[sortKey.value].localeCompare(a[sortKey.value]);
      }
    }
    return 0;
  };

  const arrayToPaginate = useSorting(
    filteredFeatures,
    sortKey,
    sortOrder,
    sortingFunction
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

  const sortFeatures = (payload: {
    sortKey: string;
    sortOrder: string;
    sortName: string;
  }) => {
    sortKey.value = payload.sortKey;
    sortOrder.value = payload.sortOrder;
    sortName.value = payload.sortName;
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
    sortName,
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
