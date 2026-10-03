<template>
  <v-row>
    <SwipeIndicator
      :is-first-page="currentPage === 0"
      :is-last-page="currentPage === totalPages - 1"
      :is-visible="showSwipeIndicator" />
    <Transition :name="`project-slide-${slideDirection}`" mode="out-in" appear>
      <v-col v-if="activeProject" :key="activeProject.id as string" cols="12" md="12">
        <div ref="swipeTarget" class="swipeable" :style="transitionStyle">
          <project-card :project="activeProject" :layout="isMobile ? 'vertical' : 'horizontal'" />
        </div>
      </v-col>
    </Transition>

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
const currentSwipeDistance = ref(0);
const SWIPE_THRESHOLD = 50; // minimum distance for swipe
const props = defineProps<Props>();
const currentPage = ref(0);
const totalPages = computed(() => props.projects.length);
const activeProject = computed(() => props.projects[currentPage.value]);
const slideDirection = ref<'next' | 'prev'>('next');
const showSwipeIndicator = ref(true);
const swipeIndicatorTimeout = ref<number | null>(null);
const hasUserSwiped = ref(false);
const { smAndDown } = useDisplay();
const isMobile = computed(() => smAndDown.value);

const { isSwiping } = useSwipe(swipeTarget, {
  onSwipeStart(e) {
    if (e.touches?.[0]) {
      touchStartX.value = e.touches[0].clientX;
      currentSwipeDistance.value = 0;
      if (!hasUserSwiped.value) {
        showSwipeIndicatorTemporarily();
        hasUserSwiped.value = true;
      }
    }
  },
  onSwipe(e) {
    if (e.touches?.[0]) {
      currentSwipeDistance.value = e.touches[0].clientX - touchStartX.value;
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

    currentSwipeDistance.value = 0;
  },
});

const handlePageChange = (newPage: number): void => {
  slideDirection.value = newPage >= currentPage.value ? 'next' : 'prev';
  currentPage.value = newPage;
};

const transitionStyle = computed(() => ({
  transform: isSwiping.value ? `translateX(${currentSwipeDistance.value}px)` : 'translateX(0)',
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

.swipeable {
  touch-action: pan-y pinch-zoom;
}

.project-slide-next-enter-active,
.project-slide-prev-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.39, 0.575, 0.565, 1);
}

.project-slide-next-leave-active,
.project-slide-prev-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease-in;
}

.project-slide-next-enter-from,
.project-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(3.125rem);
}

.project-slide-next-leave-to,
.project-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-3.125rem);
}

@media (prefers-reduced-motion: reduce) {
  .project-slide-next-enter-active,
  .project-slide-prev-enter-active,
  .project-slide-next-leave-active,
  .project-slide-prev-leave-active {
    transition: opacity 0.2s ease;
  }
}
</style>
