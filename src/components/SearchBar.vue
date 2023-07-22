<template>
  <div class="flex items-center w-[250px] relative">
    <input
      placeholder="Search by Name"
      v-model="searchText"
      class="px-3 py-2 pr-[15px] w-full bg-gray-100 text-sm outline-none border-2 border-transparent rounded-full focus:border-blue-500 transition-all duration-150" />
    <CloseIcon
      class="absolute right-[5px] text-gray-400 cursor-pointer"
      @click="searchText = ''" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CloseIcon from '@/components/Icon/CloseIcon.vue';

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
