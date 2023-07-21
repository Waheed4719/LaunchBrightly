<template>
  <div class="max-w-full w-[1500px] mx-auto px-4">
    <div v-if="featuresAreLoading"><Loader /></div>
    <div v-else>
      <div class="flex justify-between items-center my-2">
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
          <div v-else class="px-1.5 py-[5px] font-semibold">No filters</div>
        </div>
        <div class="flex items-center w-[250px]">
          <input
            placeholder="Search by Name"
            v-model="searchText"
            class="px-3 py-2 w-full bg-gray-100 text-sm outline-none border-2 border-transparent rounded-full focus:border-blue-500 transition-all duration-150" />
        </div>
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import Table from '@/components/Table.vue';
import Loader from '@/components/Loader.vue';
import { useFeaturesAPI } from '@/hooks/useFeaturesAPI';
import Pagination from '@/components/Pagination.vue';
import CloseIcon from '@/components/Icon/CloseIcon.vue';
import { getClassNameForEdition, debounce } from '@/utils';

defineComponent({
  name: 'App',
  components: {
    Table,
    Loader,
    Pagination,
  },
});
const searchText = ref('');
const debouncedText = ref('');
const currentPage = ref(1);
const rowsPerPage = ref(10);
const {
  features,
  featuresAreLoading,
  loadFeatures,
  numberOfPages,
  sortFeatures,
  filters,
  filterFeatures,
} = useFeaturesAPI(currentPage, rowsPerPage);

onMounted(async () => {
  document.title = 'Launch Brightly Assessment';
  await loadFeatures();
});

const navigateToPage = (page: number) => {
  currentPage.value = page;
};

const debouncedSearch = debounce((value) => {
  debouncedText.value = value;
}, 500);

watch(searchText, (newValue) => {
  console.log(newValue);
  debouncedSearch(newValue);
});

watch(debouncedText, (newValue) => {
  debouncedSearch(newValue);
});
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
