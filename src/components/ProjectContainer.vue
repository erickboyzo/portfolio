<template>
  <v-row>
    <SwipeIndicator :is-first-page="currentPage === 0" :is-last-page="currentPage === totalPages - 1" :is-visible="showSwipeIndicator" />
    <v-col v-for="project in currentProject" :key="project.id" cols="12" md="12">
      <div ref="swipeTarget" class="swipeable" :style="transitionStyle">
        <v-card variant="tonal" class="my-1 full-card fade-in-right" :class="{ 'hidden-sm-and-down': true }">
          <v-card-text class="pb-0">
            <v-row>
              <v-col class="d-flex flex-column" cols="12" md="6">
                <h2 class="text-capitalize text-h4 mb-2">
                  {{ formatName(project.displayName as string) }}
                </h2>

                <div class="technology-icons my-3">
                  <TechnologyIcon v-for="(icon, index) in project.libraries" :key="`lib-${index}`" :icon-name="icon" />
                  <TechnologyIcon v-for="(icon, index) in project.languages" :key="`lang-${index}`" :icon-name="icon" />
                </div>

                <p class="text--primary summary pa-2">
                  {{ project.summary }}
                </p>

                <ProjectLinks :github-url="project.githubUrl" :website-url="project.website" :resume-meta="resumeMetaData" />
              </v-col>

              <v-col cols="12" md="6">
                <div class="img-hover-zoom">
                  <v-img :src="project.image || project.dynamicImage" height="250" class="white--text align-end project-image rounded mb-3" :alt="project.displayName" />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Mobile View -->
        <project-card class="compact-card hidden-md-and-up fade-in-right" :project="project" />
      </div>
    </v-col>

    <pagination :current-page="currentPage" :page-count="totalPages" @page-change="handlePageChange" />
  </v-row>
</template>

<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectLinks from "@/components/ProjectLinks.vue";
import SwipeIndicator from "@/components/SwipeIndicator.vue";
import TechnologyIcon from "@/components/TechnologyIcon.vue";
import type { Project } from "@/interfaces/project";
import { useResumeStore } from "@/stores/store";
import { formatName } from "@/utils/formatting";
import { useSwipe } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from "vue";

interface Props {
  projects: Project[];
}

const swipeTarget = ref<HTMLElement | null>(null);
const touchStartX = ref(0);
const SWIPE_THRESHOLD = 50; // minimum distance for swipe
const props = defineProps<Props>();
const resumeMetaData = computed(() => useResumeStore().siteMetaData);
const currentPage = ref(0);
const totalPages = computed(() => props.projects.length);
const currentProject = computed(() => props.projects.slice(currentPage.value, currentPage.value + 1));
const showSwipeIndicator = ref(true);
const swipeIndicatorTimeout = ref<number | null>(null);
const hasUserSwiped = ref(false);

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
  transform: isSwiping.value ? `translateX(${direction.value.x}px)` : "translateX(0)",
  transition: isSwiping.value ? "none" : "transform 0.3s ease-out",
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
@use "vuetify/settings";

p.summary {
  flex-grow: 1;
}

@media #{map-get(settings.$display-breakpoints, 'sm-and-down')} {
  .full-card {
    display: none;
  }
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

.img-hover-zoom {
  overflow: hidden;

  .project-image {
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
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
