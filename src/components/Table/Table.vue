<template>
  <div class="relative overflow-x-auto shadow-sm sm:rounded-lg border">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader :data="headers" @sort="sortTable" />
      <tbody>
        <TableRow :data="data" @filter="filterTable" :filters="filters" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
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
  filters: {
    type: Array as () => string[],
    required: false,
    default: () => [],
  },
});

const emits = defineEmits<{
  (
    e: 'sort',
    payload: {
      sortKey: string;
      sortOrder: string;
      sortName: string;
    }
  ): void;
  (e: 'filter', payload: { filter: string }): void;
}>();

const sortTable = (payload: {
  sortKey: string;
  sortOrder: string;
  sortName: string;
}) => {
  emits('sort', payload);
};

const filterTable = (payload: { filter: string }) => {
  emits('filter', payload);
};
</script>
