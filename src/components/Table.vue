<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <TableHeader :data="headers" @sort="sortTable" />
      <tbody>
        <TableRow :data="data" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TableHeader from './Table/TableHeader.vue';
import TableRow from './Table/TableRow.vue';
import { FeatureItem } from '@/types';

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

type Header = {
  id: number;
  name: string;
  sortable: boolean;
};

const headers: Header[] = [
  {
    id: 1,
    name: 'Id',
    sortable: true,
  },
  {
    id: 2,
    name: 'Name',
    sortable: true,
  },
  {
    id: 3,
    name: 'Description',
    sortable: true,
  },
  {
    id: 4,
    name: 'Editions',
    sortable: true,
  },
];
const emits = defineEmits<{
  (e: 'sort', payload: { sortKey: string; sortOrder: string }): void;
}>();

const sortTable = (payload: { sortKey: string; sortOrder: string }) => {
  emits('sort', payload);
};
</script>
