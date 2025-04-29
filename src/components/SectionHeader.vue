<script setup lang="ts">
interface Props {
  align?: "left" | "center" | "right";
  underline?: boolean;
}

withDefaults(defineProps<Props>(), {
  align: "left",
  underline: true,
});
</script>

<template>
  <div class="section-header" :class="[`text-${align}`, { 'with-underline': underline }]">
    <h2 class="text-h3 font-weight-bold">
      <slot></slot>
    </h2>

    <div v-if="$slots.subtitle" class="text-subtitle-1 mt-2">
      <slot name="subtitle"></slot>
    </div>

    <div v-if="underline" class="underline mt-2"></div>
  </div>
</template>

<style scoped lang="scss">
@use "vuetify/settings";

.section-header {
  margin-bottom: 2rem;

  h2 {
    color: rgb(var(--v-theme-on-background));
    font-size: 37px;
    line-height: 1.2;
  }

  .text-subtitle-1 {
    color: rgb(var(--v-theme-on-surface-variant));
    opacity: 0.87;
  }

  .underline {
    width: 60px;
    height: 4px;
    background-color: rgb(var(--v-theme-primary));
    border-radius: 2px;

    .text-center & {
      margin: 0 auto;
    }

    .text-right & {
      margin-left: auto;
    }
  }

  &.with-underline {
    padding-bottom: 1rem;
  }
}

@media #{map-get(settings.$display-breakpoints, 'sm-and-down')} {
  .section-header {
    margin-bottom: 1.5rem;

    h2 {
      font-size: 24px;
    }

    .underline {
      width: 40px;
      height: 3px;
    }
  }
}

.section-header {
  h2 {
    transition: color 0.3s ease;
  }

  .underline {
    transition:
      width 0.3s ease,
      background-color 0.3s ease;
  }

  &:hover {
    .underline {
      width: 80px;
    }
  }
}
</style>
