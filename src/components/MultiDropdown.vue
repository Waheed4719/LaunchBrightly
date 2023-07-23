<template>
  <div class="w-[300px]" ref="multidropdown">
    <div class="relative">
      <button
        type="button"
        @click="toggleDropdown"
        class="h-[36px] relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        :aria-labelledby="labelId">
        <span class="flex items-center">
          <span class="block truncate">
            {{
              selectedOptions.length
                ? selectedOptions.map((option) => option.name).join(', ')
                : ''
            }}
          </span>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <DropdownIcon />
        </span>
      </button>

      <ul
        v-if="isOpen"
        ref="dropdownList"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        :aria-labelledby="labelId">
        <li
          v-for="(item, index) in options"
          :key="item.id"
          :id="'listbox-option-' + index"
          :class="{
            'text-indigo-600': isSelected(index),
            'text-gray-900': !isSelected(index),
          }"
          @click="selectOption(index)"
          class="select-none py-2 pl-3 pr-9 relative hover:bg-gray-200 cursor-pointer"
          role="option">
          <div class="flex items-center">
            <span
              :class="{
                'font-semibold': isSelected(index),
                'font-normal': !isSelected(index),
              }"
              class="ml-3 block truncate">
              {{ item.name }}
            </span>
          </div>
          <span
            v-if="isSelected(index)"
            class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
            <CheckmarkIcon />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DropdownOption } from '@/types';

import { ref, Ref, watch } from 'vue';
import DropdownIcon from './Icon/DropdownIcon.vue';
import CheckmarkIcon from './Icon/CheckmarkIcon.vue';
import { ClickawayListener } from './ClickawayComponent';
const labelId =
  'multi-dropdown-label-' + Math.random().toString(36).substr(2, 9);

const isOpen = ref(false);
const selectedIndexes = ref<number[]>([]); // Store an array of selected indexes

const dropdownList: Ref<HTMLElement | null> = ref(null);
const multidropdown: Ref<HTMLElement | null> = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const props = defineProps({
  options: {
    type: Array as () => DropdownOption[],
    required: true,
    default: () => [],
  },
  modelValue: {
    type: Array as () => DropdownOption[],
    required: false,
    default: () => [],
  },
});
const emits = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change: (options: DropdownOption[]) => true,
});

const isSelected = (index: number) => {
  return selectedIndexes.value.includes(index);
};

const selectOption = (index: number) => {
  if (index >= 0 && index < props.options.length) {
    if (isSelected(index)) {
      selectedIndexes.value = selectedIndexes.value.filter(
        (idx) => idx !== index
      );
    } else {
      selectedIndexes.value = [...selectedIndexes.value, index];
    }
  }
  emits(
    'change',
    selectedIndexes.value.map((idx) => props.options[idx])
  );
};
const selectedOptions = ref<DropdownOption[]>([]);
watch(
  () => props.modelValue,
  (newValue) => {
    selectedOptions.value = newValue;
    selectedIndexes.value = newValue.map((option) =>
      props.options.findIndex((item) => item.id === option.id)
    );
  }
);

ClickawayListener(multidropdown, () => {
  isOpen.value = false;
});
</script>
