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
  const features: Ref<FeatureItem[]> = ref<FeatureItem[]>([]);
  const editions: Ref<Edition[]> = ref<Edition[]>([]);

  const featuresAreLoading = ref(false);

  // filter features array
  const filterText: Ref<string> = ref<string>('');
  const filters = ref<Edition[]>([]);
  const filteredFeatures = computed(() =>
    features.value.filter((item: FeatureItem) => {
      let flag = true;
      if (filterText.value !== '' && filterText.value !== null) {
        if (
          !item.name.toLowerCase().startsWith(filterText.value.toLowerCase())
        ) {
          flag = false;
        }
      }
      if (filters.value.length === 0 && flag) {
        return true;
      } else {
        const isItemMatchingFilter = item.editions.some((edition) =>
          filters.value.map((filter) => filter.name).includes(edition.name)
        );
        return isItemMatchingFilter && flag;
      }
    })
  );

  const filterFeatures = (payload: {
    filter: Edition | Edition[];
    multiple?: boolean;
  }) => {
    console.log(payload);
    currentPage.value = 1;
    const { filter, multiple = true } = payload;
    if (multiple && Array.isArray(filter)) {
      console.log('gettin in here');
      filters.value = [...filter];
    } else if (!Array.isArray(filter)) {
      console.log('gettin in here 2');
      const foundIndex = filters.value.findIndex(
        (item) => item.name === filter.name
      );

      if (foundIndex !== -1) {
        filters.value = filters.value.filter(
          (item) => item.name !== filter.name
        );
      } else {
        filters.value.push(filter);
      }
    }
  };

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

  const sortFeatures = (payload: {
    sortKey: string;
    sortOrder: string;
    sortName: string;
  }) => {
    sortKey.value = payload.sortKey;
    sortOrder.value = payload.sortOrder;
    sortName.value = payload.sortName;
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

      editions.value = response.data.editions.items.map((item: Edition) => ({
        id: item.id,
        name: item.name,
      })) as Edition[];
    } catch (err) {
      console.log(err);
    } finally {
      featuresAreLoading.value = false;
    }
  };

  return {
    features: paginatedArray,
    editions,
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
