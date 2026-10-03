<template>
  <v-card
    variant="tonal"
    class="my-5 project-card"
    :height="layout === 'horizontal' ? '325' : 'auto'">
    <v-row :class="{ 'flex-column-reverse': layout === 'vertical' }" class="fill-height">
      <v-col :cols="layout === 'vertical' ? 12 : 6">
        <v-card-title
          class="text-capitalize reveal"
          :class="layout === 'vertical' ? 'text-h5' : 'text-h4 ml-3 mt-3'"
          style="--reveal-delay: 100ms">
          {{ formatName(project.displayName as string) }}
        </v-card-title>

        <div
          class="reveal"
          :class="layout === 'vertical' ? 'ml-1' : 'technology-icons my-3 ml-4'"
          style="--reveal-delay: 200ms">
          <TechnologyIcon
            v-for="icon in project.icons as string[]"
            :key="icon"
            :icon-name="icon"
            :class="layout === 'vertical' ? 'ma-2' : ''" />
        </div>

        <v-card-text class="pb-0 description reveal" style="--reveal-delay: 300ms">
          <p class="text--primary" :class="{ 'summary pa-2': layout === 'horizontal' }">
            {{ project.summary }}
          </p>
        </v-card-text>

        <v-card-actions class="reveal" style="--reveal-delay: 400ms">
          <ProjectLinks
            :github-url="project.githubUrl as string"
            :website-url="project.website as string" />
        </v-card-actions>
      </v-col>

      <!-- Image Column -->
      <v-col :cols="layout === 'vertical' ? 12 : 6">
        <v-carousel
          :height="layout === 'vertical' ? '200' : '100%'"
          hide-delimiters
          :continuous="true"
          :cycle="true"
          class="img-hover-zoom"
          :show-arrows="(project.mappedImages as string[])?.length > 1">
          <v-carousel-item
            v-for="(image, index) in project.mappedImages"
            :key="index"
            class="fill-height">
            <v-img
              :src="image as string"
              class="white--text align-end project-image"
              :height="layout === 'vertical' ? '200' : '100%'" />
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import ProjectLinks from '@/components/ProjectLinks.vue';
import TechnologyIcon from '@/components/TechnologyIcon.vue';
import type { Project } from '@/interfaces/project';
import { formatName } from '@/utils/formatting';

interface Props {
  project: Project;
  layout?: 'horizontal' | 'vertical';
}

withDefaults(defineProps<Props>(), {
  layout: 'vertical',
});
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.description {
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--v-theme-primary)) rgb(var(--v-theme-surface-variant));

  p {
    overflow-y: auto;
    height: 100px;
  }
  &::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(var(--v-theme-surface-variant));
    box-shadow: inset 0 0 0.25rem rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(var(--v-theme-primary));
    border-radius: 0.25rem;

    &:hover {
      background-color: rgb(var(--v-theme-primary-darken-1));
    }
  }
}

.actions {
  width: 100%;
  justify-content: space-evenly;
}

.img-hover-zoom {
  height: 200px;
  overflow: hidden;

  .project-image {
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.3);
    }
  }
}

.project-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.2);
  }
}

.reveal {
  animation: reveal-up 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation-delay: var(--reveal-delay, 0ms);
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card:hover {
    transform: none;
  }

  .reveal {
    animation: none;
  }
}
</style>
