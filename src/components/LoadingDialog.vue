<template>
  <v-dialog :model-value="show" :max-width="error ? '480' : '360'" persistent :class="{ 'error-state': error }">
    <v-card class="loading-dialog pa-4" elevation="12" rounded="lg">
      <div class="d-flex flex-column align-center">
        <div class="loading-animation mb-4">
          <template v-if="!error">
            <v-progress-circular color="primary" indeterminate size="64" width="4">
              <v-icon class="loading-icon" color="primary" size="32" icon="mdi-file-document-outline" />
            </v-progress-circular>
          </template>
          <template v-else>
            <v-icon color="error" size="84" icon="mdi-alert-circle" class="error-icon" />
          </template>
        </div>

        <h3 class="text-h5 font-weight-medium mb-4" :class="{ 'error-title': error }">
          {{ error ? "Failed to Load Resume" : "Loading Resume" }}
        </h3>

        <p class="text-body-1 text-medium-emphasis text-center" :class="{ 'error-message': error }">
          {{ error ? "There was an error loading the resume data. Please check your connection and try again. If the problem persists, please contact me." : "Please wait while we fetch your resume data..." }}
        </p>

        <v-btn v-if="error" color="primary" size="large" class="mt-6" prepend-icon="mdi-refresh" @click="$emit('retry')"> Try Again </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  error: boolean;
}>();

defineEmits<{
  (e: "retry"): void;
}>();
</script>

<style lang="scss" scoped>
.loading-dialog {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline));
}

.loading-animation {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading-icon {
    position: absolute;
    animation: pulse 2s infinite;
  }

  .error-icon {
    animation: shake 0.5s ease-in-out;
    transform-origin: center center;
  }
}

.error-state {
  .error-title {
    color: rgb(var(--v-theme-error));
  }

  .error-message {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

.v-dialog {
  transition: all 0.3s ease-in-out;

  .v-card {
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.01);
    }
  }
}

@media (max-width: 600px) {
  .v-dialog {
    margin: 16px;

    .error-message {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
}
</style>
