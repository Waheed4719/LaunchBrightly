<template>
  <div class="inline-block" aria-label="row pagination">
    <ul
      v-if="numberOfPages >= 1"
      class="bg-white m-0 p-10 flex gap-[5px] items-center border-none box-border overflow-hidden break-words content-center rounded-14">
      <li
        aria-label="go to previous page"
        @click="previous()"
        :class="[
          {
            'cursor-not-allowed': currentPage === 1,
            'cursor-pointer': currentPage !== 1,
          },
          'flex mb-0 select-none',
        ]">
        <div
          class="rounded-md text-sm font-bold px-[15px] py-[10px] hover:text-[#333333] hover:bg-[#e9e9e9] :disabled:bg-[#f9fafb]">
          &laquo;
        </div>
      </li>

      <li
        v-for="index in numberOfPages"
        :key="index"
        :aria-label="'go to page ' + index"
        class="flex cursor-pointer mb-0 select-none"
        @click="setCurrentPage(index)">
        <div
          class="rounded-md text-sm font-bold px-[15px] py-[10px] hover:text-[#333333] hover:bg-[#e9e9e9] :disabled:bg-[#f9fafb]"
          :class="{
            'hover:border-0 bg-[#60d394] text-white': currentPage === index,
          }">
          {{ index }}
        </div>
      </li>
      <li
        :class="[
          {
            'cursor-not-allowed':
              currentPage === numberOfPages || !numberOfPages,
            'cursor-pointer': currentPage !== numberOfPages,
          },
          'flex mb-0 select-none',
        ]"
        aria-label="go to next page"
        @click="next()">
        <div
          class="rounded-md text-sm font-bold px-[15px] py-[10px] hover:text-[#333333] hover:bg-[#e9e9e9] :disabled:bg-[#f9fafb]">
          &raquo;
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, toRefs } from 'vue';

defineComponent({
  name: 'PaginationComponent',
});

const props = defineProps({
  numberOfPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    required: true,
    type: Number,
  },
});

const { numberOfPages, currentPage } = toRefs<{
  numberOfPages: number;
  currentPage: number;
}>(props);

const emit = defineEmits(['navigate']);

const setCurrentPage = (number: number) => {
  emit('navigate', number);
};

const previous = () => {
  console.log(currentPage.value);
  if (currentPage.value === 1) return;
  emit('navigate', currentPage.value - 1);
};

const next = () => {
  if (currentPage.value >= numberOfPages.value) return;
  emit('navigate', currentPage.value + 1);
};
</script>
