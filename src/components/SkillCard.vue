<template>
  <v-card variant="tonal" class="ma-2">
    <div class="d-flex flex-column justify-center text-center pa-3">
      <div class="d-flex flex-column justify-center pa-2">
        <div class="v-icon skill-icon w-100 text-center my-2">
          <i :class="deviconClass" />
        </div>
        <span class="text-subtitle-2">{{ skill.name }}</span>
      </div>
      <div class="d-flex justify-center align-center">
        <SkillLevel :skill="skill" />
        <span class="skill-level">{{ skill.level }}</span>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SkillLevel from '@/components/SkillLevel.vue';
import type { Skill } from '@/interfaces/skill';
import { getDeviconClass } from '@/utils/formatting';

interface Props {
  skill: Skill;
}

const props = defineProps<Props>();

const deviconClass = computed(() => getDeviconClass(props.skill.name));
</script>

<style lang="scss" scoped>
.skill-icon {
  font-size: 5em;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.skill-level {
  font-size: 0.75rem;
  padding-top: 2px;
  margin-left: 3px;
}
</style>
