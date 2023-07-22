<template>
  <tr
    v-for="(item, index) in data"
    :key="item.id"
    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
    class="border-b">
    <TableCol :content="item.id" />
    <TableCol :content="item.name" />
    <TableCol :content="item.description" />
    <TableCol :content="formatDate(item.timeOfCapture)" />
    <TableCol>
      <span
        :class="[
          getClassNameForEdition(edition.name),
          'cursor-pointer tracking-wide p-1.5 uppercase text-xs font-semibold rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-400 border whitespace-nowrap',
        ]"
        v-for="edition in item.editions"
        :key="edition.id"
        @click="addFilter(edition)">
        {{ edition.name }}
      </span>
    </TableCol>
  </tr>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TableCol from './TableCol.vue';
import { FeatureItem, Edition } from '@/types';
import { getClassNameForEdition, formatDate } from '@/utils';

defineComponent({
  name: 'TableRow',
  components: {
    TableCol,
  },
});

const props = defineProps({
  data: {
    type: Array as () => FeatureItem[],
    required: true,
    default: () => [],
  },
  filters: {
    type: Array as () => Edition[],
    required: false,
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: 'filter', payload: { filter: Edition; multiple?: boolean }): void;
}>();

const addFilter = (filter: Edition) => {
  const isFilterPresent = props.filters.some(
    (existingFilter: Edition) => existingFilter.id === filter.id
  );
  if (!isFilterPresent) {
    emits('filter', { filter, multiple: false });
  }
};
</script>
