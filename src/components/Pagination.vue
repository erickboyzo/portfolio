<template>
  <div class="pagination">
    <div class="arrow" @click="prevPage">
      <v-icon color="primary">mdi-chevron-left</v-icon>
    </div>
    <div class="pt-5">
      <div class="circles">
        <div v-for="(page, index) in pageCount" :key="index" :class="{ active: index === currentPage }" @click="changePage(index)"></div>
      </div>
      <div class="mt-1 text-center text--secondary">
        <span class="font-weight-light"> Project {{ currentPage + 1 }} of {{ pageCount }}</span>
      </div>
    </div>
    <div class="arrow" @click="nextPage">
      <v-icon color="primary">mdi-chevron-right</v-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    pageCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ["pageChange"],
  methods: {
    changePage(index: number): void {
      this.emitPageValue(index);
    },
    nextPage(): void {
      console.log(this.currentPage);
      this.emitPageValue((this.currentPage + 1) % this.pageCount);
    },
    prevPage(): void {
      console.log(this.currentPage);
      const page = this.currentPage === 0 ? this.pageCount - 1 : this.currentPage - 1;
      this.emitPageValue(page);
    },
    emitPageValue(value: number) {
      this.$emit("pageChange", value);
    },
  },
});
</script>

<style lang="scss" scoped>
@use "node_modules/vuetify/settings";

.pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  cursor: pointer;
  margin: 0 10px;
}

.circles {
  display: flex;
  align-items: center;
}

.circles div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 5px;
  cursor: pointer;
}

.circles div:hover {
  background-color: rgb(var(--v-theme-primary));
  transform: scale(1.3);
}

.circles div.active {
  background-color: rgb(var(--v-theme-primary));
  transform: scale(1.2);
}

@media #{map-get(settings.$display-breakpoints, 'sm-and-down')} {
  .circles div {
    height: 13px;
    width: 13px;
  }
  .arrow {
    .v-icon {
      font-size: 4em;
    }
  }
}

@media #{map-get(settings.$display-breakpoints, 'sm-and-up')} {
  .arrow {
    .v-icon {
      font-size: 4em;
    }
  }
}
</style>
