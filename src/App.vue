<template>
  <div class="max-w-full w-[1500px] mx-auto px-4">
    <div v-if="featuresAreLoading"><Loader /></div>
    <Table v-else :data="features" @sort="sortFeatures" />
    <Pagination
      class="pagination-component"
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      @navigate="navigateToPage" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import Table from '@/components/Table.vue';
import Loader from '@/components/Loader.vue';
import { useFeaturesAPI } from '@/hooks/useFeaturesAPI';
import Pagination from '@/components/Pagination.vue';

defineComponent({
  name: 'App',
  components: {
    Table,
    Loader,
    Pagination,
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
} = useFeaturesAPI(currentPage, rowsPerPage);

onMounted(async () => {
  document.title = 'Launch Brightly Assessment';
  await loadFeatures();
});
const navigateToPage = (page: number) => {
  currentPage.value = page;
};
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
