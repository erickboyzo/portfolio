<template>
  <Transition name="fade">
    <div v-if="isVisible" class="swipe-indicator hidden-md-and-up" :class="indicatorClass">
      <div class="swipe-indicator__content">
        <v-icon :icon="indicatorIcon" class="swipe-indicator__arrow" />
        <span class="swipe-indicator__text">{{ indicatorText }}</span>
        <v-icon :icon="indicatorIcon" class="swipe-indicator__arrow" />
      </div>
      <div class="swipe-indicator__touch-hint">
        <div class="touch-point"></div>
        <div class="ripple"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  isFirstPage: boolean;
  isLastPage: boolean;
  isVisible: boolean;
}

const props = defineProps<Props>();

const indicatorClass = computed(() => ({
  "swipe-indicator--left": props.isLastPage,
  "swipe-indicator--right": props.isFirstPage,
  "swipe-indicator--both": !props.isFirstPage && !props.isLastPage,
}));

const indicatorIcon = computed(() => {
  if (props.isLastPage) return "mdi-chevron-left";
  if (props.isFirstPage) return "mdi-chevron-right";
  return "mdi-chevron-right";
});

const indicatorText = computed(() => {
  if (props.isLastPage) return "Swipe right for previous";
  if (props.isFirstPage) return "Swipe left for next";
  return "Swipe to navigate";
});
</script>

<style lang="scss" scoped>
.swipe-indicator {
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 16px;
  border-radius: 12px;
  background: rgba(var(--v-theme-surface-variant), 0.9);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  &__text {
    font-size: 0.9rem;
    font-weight: 500;
    color: rgb(var(--v-theme-on-surface));
  }

  &__arrow {
    animation: bounce 1.5s infinite;

    &:first-child {
      animation-delay: 0s;
    }

    &:last-child {
      animation-delay: 0.2s;
    }
  }

  &__touch-hint {
    position: relative;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .touch-point {
    width: 12px;
    height: 12px;
    background: rgb(var(--v-theme-primary));
    border-radius: 50%;
    position: relative;
    animation: touchMove 3s infinite;
  }

  .ripple {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgb(var(--v-theme-primary));
    animation: ripple 3s infinite;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-8px);
  }
  60% {
    transform: translateX(-4px);
  }
}

@keyframes touchMove {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(40px);
  }
}

@keyframes ripple {
  0% {
    transform: translateX(0) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translateX(40px) scale(2);
    opacity: 0;
  }
  51%,
  100% {
    transform: translateX(0) scale(1);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
