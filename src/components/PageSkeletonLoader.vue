<template>
  <v-container class="my-5">
    <template v-if="store.isLoading">
      <template v-for="(section, index) in skeletonSections" :key="index">
        <template v-if="section.type === 'header'">
          <v-skeleton-loader
            :type="section.skeletonType || 'heading'"
            :class="section.class || 'mb-6'"
            :width="section.width"
            :height="section.height" />
        </template>

        <template v-if="section.type === 'grid'">
          <v-row :class="section.class">
            <v-col
              v-for="i in section.items"
              :key="i"
              :cols="section.cols || 12"
              :md="section.md"
              :sm="section.sm">
              <v-skeleton-loader
                :type="section.skeletonType || 'card'"
                :class="section.itemClass"
                :height="section.itemHeight" />
            </v-col>
          </v-row>
        </template>

        <template v-if="section.type === 'content'">
          <v-row :class="section.class">
            <v-col v-for="col in section.columns" :key="col.id" :cols="col.cols || 12" :md="col.md">
              <template v-for="item in col.items" :key="item.skeletonType">
                <v-skeleton-loader
                  v-if="item.skeletonType"
                  :type="item.skeletonType"
                  :class="item.class"
                  :width="item.width"
                  :height="item.height" />
              </template>
            </v-col>
          </v-row>
        </template>
      </template>
    </template>

    <template v-else-if="store.hasApiError">
      <v-row justify="center">
        <v-col cols="12" md="12">
          <v-card class="text-center pa-8" variant="tonal" color="error">
            <v-icon color="error" size="84" class="mb-4">mdi-alert-circle</v-icon>
            <h3 class="text-h5 mb-4">Something went wrong</h3>
            <p class="text-body-1 mb-6">
              We couldn't load the page data. Please check your connection and try again.
            </p>
            <v-btn color="primary" size="large" prepend-icon="mdi-refresh" @click="handleRetry">
              Try Again
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <slot />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import type { SkeletonConfig } from '@/interfaces/skeleton-config';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useResumeStore } from '@/stores/store';

const route = useRoute();
const store = useResumeStore();

const skeletonSections = computed(() => {
  return (route.meta?.skeletonConfig as SkeletonConfig).sections || [];
});

const handleRetry = () => {
  store.fetchProfile();
};
</script>
