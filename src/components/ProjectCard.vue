<template>
  <v-card variant="tonal" class="my-5">
    <div class="img-hover-zoom">
      <v-img :src="project.image || project.dynamicImage" class="white--text align-end project-image" height="200px" />
    </div>

    <v-card-title class="text-capitalize text-h5">
      {{ formatName(project.displayName) }}
    </v-card-title>

    <div class="ml-3">
      <TechnologyIcon v-for="icon in [...project.libraries, ...project.languages]" :key="icon" :icon-name="icon" class="ma-2" />
    </div>

    <v-card-subtitle class="text--secondary">
      {{ resumeMetaData.content.description }}
    </v-card-subtitle>

    <v-card-text class="pb-0 description overflow-y-auto" style="height: 90px">
      <p class="text--primary">{{ project.summary }}</p>
    </v-card-text>

    <v-card-actions>
      <div class="d-flex actions my-2">
        <v-tooltip location="bottom">
          <template #activator="{ props }">
            <v-btn :href="project.githubUrl" target="_blank" color="primary" text v-bind="props" size="large">
              <v-icon class="mr-1">mdi-file-code-outline</v-icon>
              Github
            </v-btn>
          </template>
          <span>{{ resumeMetaData.actions.viewSource }}</span>
        </v-tooltip>

        <v-tooltip v-if="project.website" location="bottom">
          <template #activator="{ props }">
            <v-btn :href="project.website" target="_blank" color="primary" text v-bind="props" size="large">
              <v-icon class="mr-1">mdi-web</v-icon>
              Website
            </v-btn>
          </template>
          <span>{{ resumeMetaData.actions.goToApp }}</span>
        </v-tooltip>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useResumeStore } from "@/stores/store";
import { formatName } from "@/utils/formatting";
import type { Project } from "@/interfaces/project";
import TechnologyIcon from "@/components/TechnologyIcon.vue";

interface Props {
  project: Project;
}

defineProps<Props>();

const resumeStore = useResumeStore();
const resumeMetaData = computed(() => resumeStore.siteMetaData);
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
</style>
