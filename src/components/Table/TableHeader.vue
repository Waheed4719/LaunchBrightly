<template lang="">
  <thead
    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
    <tr>
      <td
        v-for="header in data"
        v-bind:key="header.id"
        scope="col"
        :class="[
          getClassForHeader(header.name),
          'px-6 py-3 font-semibold tracking-wide cursor-pointer',
        ]"
        @click="sortTable(header.key)">
        <div class="flex items-center">
          {{ header.name }}
          <a v-if="header.sortable" href="#"><SortIcon /></a>
        </div>
      </td>
    </tr>
  </thead>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import SortIcon from '../Icon/SortIcon.vue';
import { Header } from '@/types';

defineComponent({
  name: 'TableHeader',
});
const sortKey = ref('');
const sortOrder = ref('ASC');
const props = defineProps({
  data: {
    type: Array as () => Header[],
    required: true,
  },
  sort: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (e: 'sort', payload: { sortKey: string; sortOrder: string }): void;
}>();

const getClassForHeader = (headerName: string) => {
  if (headerName == 'Description') {
    return 'w-1/2';
  }
};

const sortTable = (key: string) => {
  if (!key) return;
  sortKey.value = key;
  sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
  const header = props.data.find((header) => header.key === key);
  if (!header || !header.sortable) return;

  emits('sort', { sortKey: sortKey.value, sortOrder: sortOrder.value });
};
</script>
<style lang=""></style>
