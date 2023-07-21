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
        :key="edition.id"
        @click="addFilter(edition.name)">
        {{ edition.name }}
      </span>
    </TableCol>
  </tr>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import TableCol from './TableCol.vue';
import { FeatureItem } from '@/types';
import { getClassNameForEdition } from '@/utils';

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
const addFilter = (filter: string) => {
  emits('filter', { filter });
};

const emits = defineEmits<{
  (e: 'filter', payload: { filters: string[] }): void;
}>();
</script>
