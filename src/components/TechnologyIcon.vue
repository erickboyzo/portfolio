<template>
  <span class="v-icon project-icon-expanded mx-2">
    <i :class="iconClass" />
  </span>
</template>

<script setup lang="ts">
import { getDeviconClass } from '@/utils/formatting';
import { computed } from 'vue';

const props = defineProps<{
  iconName: string;
}>();

const iconClass = computed(() => getDeviconClass(props.iconName));
</script>

<style lang="scss" scoped>
.project-icon {
  font-size: 1.75rem;
}

.project-icon-expanded {
  font-size: 2.125rem;
}
</style>
