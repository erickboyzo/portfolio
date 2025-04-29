<template>
  <div class="d-flex my-2">
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-btn class="mr-2" :href="githubUrl" target="_blank" color="primary" size="x-large" variant="text" v-on="on">
          <v-icon class="mr-1">mdi-file-code-outline</v-icon>
          {{ resumeMeta.actions.viewSourceLabel }}
        </v-btn>
      </template>
      <span>{{ resumeMeta.actions.viewSource }}</span>
    </v-tooltip>

    <v-tooltip v-if="websiteUrl" bottom>
      <template #activator="{ on }">
        <v-btn :href="websiteUrl" target="_blank" color="primary" size="x-large" variant="text" v-on="on">
          <v-icon class="mr-1">mdi-web</v-icon>
          {{ resumeMeta.actions.goToAppLabel }}
        </v-btn>
      </template>
      <span>{{ resumeMeta.actions.goToApp }}</span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
interface Props {
  githubUrl: string;
  websiteUrl?: string;
  resumeMeta: {
    actions: {
      viewSource: string;
      viewSourceLabel: string;
      goToApp: string;
      goToAppLabel: string;
    };
  };
}

defineProps<Props>();
</script>
