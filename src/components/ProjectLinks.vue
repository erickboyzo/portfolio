<script setup lang="ts">
import { useResumeStore } from '@/stores/store';
import { computed } from 'vue';

interface Props {
  websiteUrl?: string;
  githubUrl: string;
}

defineProps<Props>();

const resumeStore = useResumeStore();
const resumeMetaData = computed(() => resumeStore.siteMetaData);
</script>

<template>
  <div class="d-flex actions my-2 justify-space-evenly">
    <v-tooltip location="bottom">
      <template #activator="{ props }">
        <v-btn :href="githubUrl" target="_blank" v-bind="props" size="x-large">
          <v-icon class="mr-1">mdi-file-code-outline</v-icon>
          Github
        </v-btn>
      </template>
      <span>{{ resumeMetaData.actions.viewSource }}</span>
    </v-tooltip>

    <v-tooltip v-if="websiteUrl" location="bottom">
      <template #activator="{ props }">
        <v-btn :href="websiteUrl" target="_blank" v-bind="props" size="x-large">
          <v-icon class="mr-1">mdi-web</v-icon>
          Website
        </v-btn>
      </template>
      <span>{{ resumeMetaData.actions.goToApp }}</span>
    </v-tooltip>
  </div>
</template>

