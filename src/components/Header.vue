<template>
  <div class="flex justify-between items-center my-2 mt-5 gap-4 flex-wrap">
    <div class="flex-col md:flex-row flex gap-4 w-full md:w-fit">
      <div class="flex items-center gap-3">
        <h1 class="font-bold">Sort:</h1>
        <div
          v-if="sortKey"
          class="text-sm font-semibold text-gray-500 uppercase">
          {{ sortKey }} - ({{ sortOrder }})
        </div>
        <div v-else class="text-[14px] font-semibold text-gray-500 uppercase">
          N/A
        </div>
      </div>
      <div class="flex items-center gap-3">
        <h1 class="font-bold">Edition Filters:</h1>
        <ul v-if="filters.length" class="flex gap-2">
          <span
            @click="filterFeatures({ filter })"
            :class="[
              getClassNameForEdition(filter),
              'cursor-pointer tracking-wide px-1.5 py-[5px] uppercase text-xs font-semibold rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-400 border flex gap-2 items-center',
            ]"
            v-for="filter in filters"
            v-bind:key="filter">
            {{ filter }}

            <CloseIcon />
          </span>
        </ul>
        <div v-else class="text-[14px] font-semibold text-gray-500 uppercase">
          N/A
        </div>
      </div>
    </div>

    <SearchBar @changeText="searchByName" />
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import CloseIcon from '@/components/Icon/CloseIcon.vue';
import { getClassNameForEdition } from '@/utils';

defineComponent({
  name: 'HeaderComponent',
  components: {
    SearchBar,
    CloseIcon,
  },
});

defineProps({
  sortKey: {
    type: String,
    required: false,
    default: '',
  },
  sortOrder: {
    type: String,
    required: false,
    default: '',
  },
  filters: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emits = defineEmits<{
  (e: 'filter', payload: { filter: string }): void;
  (e: 'search', payload: { searchText: string }): void;
}>();

const filterFeatures = (payload: { filter: string }) => {
  emits('filter', payload);
};

const searchByName = (payload: { searchText: string }) => {
  emits('search', payload);
};
</script>
