<template>
  <div class="skill-gauge d-flex" :class="skill.level.toLowerCase()">
    <div class="square first-square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square"></div>
    <div class="square last-square"></div>
  </div>
</template>

<script lang="ts">
import type { Skill } from "@/interfaces/skill";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SkillLevel",
  props: {
    skill: {
      type: Object as () => Skill,
    },
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@use "node_modules/vuetify/settings";

.square {
  width: 20px;
  height: 20px;
  background-color: gray;
  display: inline-block;
  margin-right: 3px;
}

.first-square {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: 3px;
}

.last-square {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-right: 0;
}

.skill-gauge {
  &.learning {
    .square:first-child {
      background-color: #{map-get(settings.$amber, "darken-4")};
    }
  }

  &.beginner {
    .square:nth-child(-1n + 2) {
      background-color: #{map-get(settings.$amber, "darken-1")};
    }
  }

  &.intermediate {
    .square:nth-child(-1n + 3) {
      background-color: #{map-get(settings.$amber, "base")};
    }
  }

  &.advanced {
    .square:not(:last-child) {
      background-color: #{map-get(settings.$green, "lighten-2")};
    }
  }

  &.expert {
    .square {
      background-color: #{map-get(settings.$green, "darken-3")};
    }
  }
}
</style>
