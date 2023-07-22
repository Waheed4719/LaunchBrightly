<template>
  <div class="flex justify-between items-center my-2 mt-5 gap-4 flex-wrap mb-5">
    <div class="flex-col lg:flex-row flex gap-4 w-full md:w-fit">
      <div class="flex items-center gap-3">
        <h1 class="font-bold">Sort:</h1>
        <div
          v-if="sortKey"
          class="text-sm font-semibold text-gray-500 uppercase">
          {{ sortName }} - ({{ sortOrder }})
        </div>
        <div v-else class="text-[14px] font-semibold text-gray-500 uppercase">
          N/A
        </div>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="font-bold">Edition Filters:</h1>
        <div class="flex items-center w-[300px]">
          <Multiselect
            :options="editions"
            :modelValue="filters"
            @change="handleDropdownChange" />
        </div>
        <ul
          v-if="filters.length"
          class="flex gap-2 flex-wrap max-w-[550px] overflow-auto pb-2">
          <span
            @click="filterFeatures({ filter, multiple: false })"
            :class="[
              getClassNameForEdition(filter.name),
              'cursor-pointer tracking-wide px-1.5 whitespace-nowrap py-[5px] uppercase text-xs font-semibold rounded-md bg-gray-200 dark:bg-gray-600 dark:text-gray-400 border flex gap-2 items-center',
            ]"
            v-for="filter in filters"
            v-bind:key="filter.id">
            {{ filter.name }}

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
import Multiselect from './MultiDropdown.vue';
import SearchBar from '@/components/SearchBar.vue';
import CloseIcon from '@/components/Icon/CloseIcon.vue';
import { getClassNameForEdition } from '@/utils';
import { Edition } from '@/types';
defineComponent({
  name: 'HeaderComponent',
  components: {
    SearchBar,
    CloseIcon,
    Multiselect,
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
  sortName: {
    type: String,
    required: false,
    default: '',
  },
  filters: {
    type: Array as () => Edition[],
    default: () => [],
  },
  editions: {
    type: Array as () => Edition[],
    default: () => [],
  },
});

const emits = defineEmits<{
  (
    e: 'filter',
    payload: { filter: Edition[] | Edition; multiple?: boolean }
  ): void;
  (e: 'search', payload: { searchText: string }): void;
}>();

const filterFeatures = (payload: {
  filter: Edition[] | Edition;
  multiple: boolean;
}) => {
  emits('filter', payload);
};

const searchByName = (payload: { searchText: string }) => {
  emits('search', payload);
};

const handleDropdownChange = (newSelectedOptions: Edition[]) => {
  filterFeatures({ filter: newSelectedOptions, multiple: true });
};
</script>
