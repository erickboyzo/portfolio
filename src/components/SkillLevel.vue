<template>
  <div class="skill-gauge d-flex" :class="skillLevelClass">
    <div
      v-for="index in 5"
      :key="index"
      class="square"
      :class="{
        'first-square': index === 1,
        'last-square': index === 5,
        filled: filledSquares[index - 1],
      }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  skill: {
    level: SkillLevel;
  };
}

type SkillLevel = 'Learning' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

const props = defineProps<Props>();

const skillLevelClass = computed(() => props.skill.level.toLowerCase());

const filledSquares = computed(() => {
  const level = props.skill.level.toLowerCase();
  const maxFilled =
    {
      learning: 1,
      beginner: 2,
      intermediate: 3,
      advanced: 4,
      expert: 5,
    }[level] || 0;

  return Array(5)
    .fill(false)
    .map((_, i) => i < maxFilled);
});
</script>

<style lang="scss" scoped>
@use 'vuetify/settings' as vuetify-settings;

.square {
  width: 20px;
  height: 20px;
  background-color: rgb(var(--v-theme-surface-variant));
  display: inline-block;
  margin-right: 3px;
  transition: background-color 0.3s ease;

  &.filled {
    background-color: rgb(var(--v-theme-primary));
  }

  &.first-square {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &.last-square {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-right: 0;
  }
}

.skill-gauge {
  &.learning .filled {
    background-color: #{map-get(vuetify-settings.$amber, 'darken-4')};
  }

  &.beginner .filled {
    background-color: #{map-get(vuetify-settings.$amber, 'darken-1')};
  }

  &.intermediate .filled {
    background-color: #{map-get(vuetify-settings.$amber, 'base')};
  }

  &.advanced .filled {
    background-color: #{map-get(vuetify-settings.$green, 'lighten-2')};
  }

  &.expert .filled {
    background-color: #{map-get(vuetify-settings.$green, 'darken-3')};
  }
}
</style>
