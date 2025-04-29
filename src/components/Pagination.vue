<template>
  <div class="pagination">
    <div role="button" aria-label="Previous page" class="arrow" :class="{ disabled: currentPage === 0 }" @click="prevPage" @keydown.enter="prevPage" tabindex="0">
      <v-icon color="primary">mdi-chevron-left</v-icon>
    </div>

    <div class="pt-5">
      <div class="circles" role="navigation" aria-label="Page navigation">
        <div
          v-for="page in pageCount"
          :key="page - 1"
          role="button"
          :aria-label="`Go to page ${page}`"
          :aria-current="page - 1 === currentPage"
          tabindex="0"
          class="circle"
          :class="{ active: page - 1 === currentPage }"
          @click="changePage(page - 1)"
          @keydown.enter="changePage(page - 1)"
        ></div>
      </div>

      <div class="mt-1 text-center text--secondary">
        <span class="font-weight-light">Project {{ currentPage + 1 }} of {{ pageCount }}</span>
      </div>
    </div>

    <div role="button" aria-label="Next page" class="arrow" :class="{ disabled: currentPage === pageCount - 1 }" @click="nextPage" @keydown.enter="nextPage" tabindex="0">
      <v-icon color="primary">mdi-chevron-right</v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  currentPage: number;
  pageCount: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 0,
  pageCount: 0,
});

const emit = defineEmits<{
  (e: "update:currentPage", value: number): void;
  (e: "pageChange", value: number): void;
}>();

const isFirstPage = computed(() => props.currentPage === 0);
const isLastPage = computed(() => props.currentPage === props.pageCount - 1);

const emitPageValue = (value: number): void => {
  emit("update:currentPage", value);
  emit("pageChange", value);
};

const changePage = (index: number): void => {
  if (index >= 0 && index < props.pageCount) {
    emitPageValue(index);
  }
};

const nextPage = (): void => {
  if (!isLastPage.value) {
    emitPageValue((props.currentPage + 1) % props.pageCount);
  }
};

const prevPage = (): void => {
  if (!isFirstPage.value) {
    const page = props.currentPage === 0 ? props.pageCount - 1 : props.currentPage - 1;
    emitPageValue(page);
  }
};
</script>

<style lang="scss" scoped>
@use "vuetify/settings";

.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .arrow {
    cursor: pointer;
    margin: 0 10px;
    transition: opacity 0.3s ease;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid rgb(var(--v-theme-primary));
      outline-offset: 2px;
    }
  }

  .circles {
    display: flex;
    align-items: center;

    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: gray;
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(.active) {
        background-color: rgb(var(--v-theme-primary));
        transform: scale(1.3);
      }

      &.active {
        background-color: rgb(var(--v-theme-primary));
        transform: scale(1.2);
      }

      &:focus-visible {
        outline: 2px solid rgb(var(--v-theme-primary));
        outline-offset: 2px;
      }
    }
  }
}

// Responsive styles using Vuetify breakpoints
@media #{map-get(settings.$display-breakpoints, 'sm-and-down')} {
  .pagination {
    .circles .circle {
      height: 13px;
      width: 13px;
    }

    .arrow .v-icon {
      font-size: 4em;
    }
  }
}

@media #{map-get(settings.$display-breakpoints, 'sm-and-up')} {
  .pagination .arrow .v-icon {
    font-size: 4em;
  }
}
</style>
