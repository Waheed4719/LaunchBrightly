<template>
  <tr
    v-for="(item, index) in data"
    :key="item.id"
    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
    class="border-b">
    <TableCol :content="item.id" />
    <TableCol :content="item.name" />
    <TableCol :content="item.description" />
    <TableCol>
      <span
        :class="[
          getClassNameForEdition(edition.name),
          'cursor-pointer tracking-wide p-1.5 uppercase text-xs font-semibold rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-400 border',
        ]"
        v-for="edition in item.editions"
        :key="edition.id">
        {{ edition.name }}
      </span>
    </TableCol>
  </tr>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TableCol from './TableCol.vue';
import { FeatureItem } from '@/types';

defineComponent({
  name: 'TableRow',
  components: {
    TableCol,
  },
});

defineProps({
  data: {
    type: Array as () => FeatureItem[],
    required: true,
    default: () => [],
  },
});

const getClassNameForEdition = (edition: string): string => {
  switch (edition.toLocaleLowerCase()) {
    case 'rev':
      return 'bg-red-200 dark:bg-red-600 dark:text-red-400 bg-opacity-50';
    case 'arr metrics':
      return 'bg-green-200 dark:bg-green-600 dark:text-green-400 bg-opacity-50';
    case 'subs':
      return 'bg-blue-200 dark:bg-blue-600 dark:text-blue-400 bg-opacity-50';
    case 'mrr metrics':
      return 'bg-yellow-200 dark:bg-yellow-600 dark:text-yellow-400 bg-opacity-50';
    case 'control center':
      return 'bg-purple-200 dark:bg-purple-600 dark:text-purple-400 bg-opacity-50';
    default:
      return '';
  }
};
</script>
