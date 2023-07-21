<template>
  <div class="flex items-center w-[250px]">
    <input
      placeholder="Search by Name"
      v-model="searchText"
      class="px-3 py-2 w-full bg-gray-100 text-sm outline-none border-2 border-transparent rounded-full focus:border-blue-500 transition-all duration-150" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue';
defineComponent({
  name: 'SearchBar',
});
const emits = defineEmits<{
  (e: 'changeText', payload: { searchText: string }): void;
}>();
const searchText = ref('');
watch(searchText, (searchText) => {
  emits('changeText', { searchText });
});
</script>
