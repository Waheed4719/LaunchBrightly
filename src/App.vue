<template>
  <div class="max-w-full w-[1500px] mx-auto px-4">
    <div v-if="featuresAreLoading"><Loader /></div>
    <div v-else>
      <div class="flex justify-between items-center my-2 gap-4 flex-wrap">
        <div class="flex gap-4">
          <div class="flex items-center gap-3">
            <h1 class="font-bold">Sort:</h1>
            <div
              v-if="sortKey"
              class="text-sm font-semibold text-gray-500 uppercase">
              {{ sortKey }} - ({{ sortOrder }})
            </div>
            <div
              v-else
              class="text-[14px] font-semibold text-gray-500 uppercase">
              N/A
            </div>
          </div>
          <div class="flex items-center gap-3">
            <h1 class="font-bold">Edition Filters:</h1>
            <ul v-if="filters.length" class="flex gap-2">
              <span
                @click="filterFeatures({ filter })"
                :class="[
                  getClassNameForEdition(filter),
                  'cursor-pointer tracking-wide px-1.5 py-[5px] uppercase text-xs font-semibold rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-400 border flex gap-2 items-center',
                ]"
                v-for="filter in filters"
                v-bind:key="filter">
                {{ filter }}

                <CloseIcon />
              </span>
            </ul>
            <div
              v-else
              class="text-[14px] font-semibold text-gray-500 uppercase">
              N/A
            </div>
          </div>
        </div>

        <SearchBar @changeText="debouncedSearch" />
      </div>

      <Table :data="features" @sort="sortFeatures" @filter="filterFeatures" />
      <Pagination
        class="pagination-component"
        :currentPage="currentPage"
        :numberOfPages="numberOfPages"
        @navigate="navigateToPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Table from '@/components/Table/Table.vue';
import Loader from '@/components/Loader.vue';
import { useFeaturesAPI } from '@/hooks/useFeaturesAPI';
import Pagination from '@/components/Pagination.vue';
import CloseIcon from '@/components/Icon/CloseIcon.vue';
import { getClassNameForEdition, debounce } from '@/utils';
import SearchBar from '@/components/SearchBar.vue';

defineComponent({
  name: 'App',
  components: {
    Table,
    Loader,
    Pagination,
    SearchBar,
  },
});
const currentPage = ref(1);
const rowsPerPage = ref(10);
const {
  features,
  featuresAreLoading,
  loadFeatures,
  numberOfPages,
  sortFeatures,
  sortKey,
  sortOrder,
  filters,
  filterText,
  filterFeatures,
} = useFeaturesAPI(currentPage, rowsPerPage);

onMounted(async () => {
  document.title = 'Launch Brightly Assessment';
  await loadFeatures();
});

const navigateToPage = (page: number) => {
  currentPage.value = page;
};

//debounced text search by "name" field
const debouncedSearch = debounce((payload) => {
  filterText.value = payload.searchText;
}, 300);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
