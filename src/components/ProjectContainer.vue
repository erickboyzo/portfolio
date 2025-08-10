<template>
  <v-row>
    <SwipeIndicator
      :is-first-page="currentPage === 0"
      :is-last-page="currentPage === totalPages - 1"
      :is-visible="showSwipeIndicator" />
    <v-col v-for="project in currentProject" :key="project.id as string" cols="12" md="12">
      <div ref="swipeTarget" class="swipeable" :style="transitionStyle">
        <project-card
          :project="project"
          :class="['fade-in-right']"
          :layout="isMobile ? 'vertical' : 'horizontal'" />
      </div>
    </v-col>

    <pagination
      :current-page="currentPage"
      :page-count="totalPages"
      @page-change="handlePageChange" />
  </v-row>
</template>

<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import SwipeIndicator from '@/components/SwipeIndicator.vue';
import type { Project } from '@/interfaces/project';
import { useSwipe } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useDisplay } from 'vuetify';

interface Props {
  projects: Project[];
}

const swipeTarget = ref<HTMLElement | null>(null);
const touchStartX = ref(0);
const SWIPE_THRESHOLD = 50; // minimum distance for swipe
const props = defineProps<Props>();
const currentPage = ref(0);
const totalPages = computed(() => props.projects.length);
const currentProject = computed(() =>
  props.projects.slice(currentPage.value, currentPage.value + 1)
);
const showSwipeIndicator = ref(true);
const swipeIndicatorTimeout = ref<number | null>(null);
const hasUserSwiped = ref(false);
const { smAndDown } = useDisplay();
const isMobile = computed(() => smAndDown.value);

const { isSwiping, direction } = useSwipe(swipeTarget, {
  onSwipeStart(e) {
    if (e.touches?.[0]) {
      touchStartX.value = e.touches[0].clientX;
      if (!hasUserSwiped.value) {
        showSwipeIndicatorTemporarily();
        hasUserSwiped.value = true;
      }
    }
  },
  onSwipeEnd(e) {
    if (!e.changedTouches?.[0]) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.value;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX > 0 && currentPage.value > 0) {
        handlePageChange(currentPage.value - 1);
      } else if (deltaX < 0 && currentPage.value < totalPages.value - 1) {
        handlePageChange(currentPage.value + 1);
      }
    }
  },
});

const handlePageChange = (newPage: number): void => {
  currentPage.value = newPage;
};

const transitionStyle = computed(() => ({
  transform: isSwiping.value ? `translateX(${direction.value.x}px)` : 'translateX(0)',
  transition: isSwiping.value ? 'none' : 'transform 0.3s ease-out',
}));

onMounted(() => {
  showSwipeIndicatorTemporarily();
});

const showSwipeIndicatorTemporarily = () => {
  if (swipeIndicatorTimeout.value) {
    clearTimeout(swipeIndicatorTimeout.value);
  }

  showSwipeIndicator.value = true;
  swipeIndicatorTimeout.value = window.setTimeout(() => {
    showSwipeIndicator.value = false;
  }, 3000);
};

onUnmounted(() => {
  if (swipeIndicatorTimeout.value) {
    clearTimeout(swipeIndicatorTimeout.value);
  }
});
</script>

<style lang="scss" scoped>
@use 'vuetify/settings';

p.summary {
  flex-grow: 1;
}

.fade-in-right {
  animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fade-in-right {
  0% {
    transform: translateX(3.125rem);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.swipeable {
  touch-action: pan-y pinch-zoom;
}

.fade-in-right {
  will-change: transform;
  transition: transform 0.3s ease-out;
}
</style>
