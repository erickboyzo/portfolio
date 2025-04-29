<template>
  <div class="skill-gauge d-flex" :class="skillLevelClass">
    <div
      v-for="index in 5"
      :key="index"
      class="square"
      :class="{
        'first-square': index === 1,
        'last-square': index === 5,
        filled: isSquareFilled(index),
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  skill: {
    level: SkillLevel;
  };
}

type SkillLevel = "Learning" | "Beginner" | "Intermediate" | "Advanced" | "Expert";

const props = defineProps<Props>();

const skillLevelClass = computed(() => props.skill.level.toLowerCase());

const isSquareFilled = (index: number): boolean => {
  switch (props.skill.level.toLowerCase()) {
    case "learning":
      return index === 1;
    case "beginner":
      return index <= 2;
    case "intermediate":
      return index <= 3;
    case "advanced":
      return index <= 4;
    case "expert":
      return true;
    default:
      return false;
  }
};
</script>

<style lang="scss" scoped>
@use "vuetify/settings" as vuetify-settings;

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
    background-color: #{map-get(vuetify-settings.$amber, "darken-4")};
  }

  &.beginner .filled {
    background-color: #{map-get(vuetify-settings.$amber, "darken-1")};
  }

  &.intermediate .filled {
    background-color: #{map-get(vuetify-settings.$amber, "base")};
  }

  &.advanced .filled {
    background-color: #{map-get(vuetify-settings.$green, "lighten-2")};
  }

  &.expert .filled {
    background-color: #{map-get(vuetify-settings.$green, "darken-3")};
  }
}
</style>
