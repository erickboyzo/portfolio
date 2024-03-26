<template>
  <v-card variant="tonal" elevation="1" class="ma-2">
    <div class="d-flex flex-column justify-center text-center pa-3">
      <div class="d-flex flex-column justify-center pa-2">
        <div class="v-icon skill-icon w-100 text-center ma-2">
          <i :class="$filters.deviconIcon(skill.name)"></i>
        </div>
        <span class="text-center text-subtitle-2">{{ skill.name }}</span>
      </div>
      <div class="d-flex justify-center">
        <SkillLevel :skill="skill"></SkillLevel>
        <span class="text-center skill-level">{{ skill.level }}</span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import SkillLevel from "@/components/SkillLevel.vue";
import type { Skill } from "@/interfaces/skill";
import { defineComponent } from "vue";

export default defineComponent({
  components: { SkillLevel },
  name: "SkillCard",
  props: {
    skill: {
      type: Object as () => Skill,
    },
  },
});
</script>

<style lang="scss" scoped>
.skill-icon {
  font-size: 5em;
}

.skill-level {
  font-size: 12px;
  padding-top: 2px;
  margin-left: 3px;
}
</style>
