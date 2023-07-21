<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader :data="headers" @sort="sortTable" />
      <tbody>
        <TableRow :data="data" @filter="filterTable" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TableHeader from './Table/TableHeader.vue';
import TableRow from './Table/TableRow.vue';
import { FeatureItem } from '@/types';
import { featuresTableHeader as headers } from '@/constants';

defineComponent({
  name: 'TableComponent',
  components: {
    TableHeader,
    TableRow,
  },
});

defineProps({
  data: {
    type: Array as () => FeatureItem[],
    required: true,
  },
});

const emits = defineEmits<{
  (
    e: 'sort',
    payload: {
      sortKey: string;
      sortOrder: string;
      sortingFunction?: ((a: FeatureItem, b: FeatureItem) => number) | null;
    }
  ): void;
  (e: 'filter', payload: { filter: string }): void;
}>();

const sortTable = (payload: { sortKey: string; sortOrder: string }) => {
  emits('sort', payload);
};

const filterTable = (payload: { filter: string }) => {
  emits('filter', payload);
};
</script>
