<!-- TableCol.vue -->
<template>
  <td class="px-6 py-4 whitespace-pre-wrap" :class="classObj">
    <template v-if="content !== undefined">
      {{ content }}
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </td>
</template>

<script setup lang="ts">
interface TableColumnProps {
  content?: string | number;
  class?: string;
}

// Use defineProps with type argument
defineProps<TableColumnProps>();

const classObj = {
  'font-medium': true,
  'text-gray-900': true,
  'whitespace-nowrap': true,
  'dark:text-white': true,
};
</script>
