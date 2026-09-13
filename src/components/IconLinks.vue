<template>
  <div v-if="socialIcons">
    <template v-for="(button, index) of socialIcons">
      <v-btn
        v-if="button.network !== 'gitconnected'"
        :key="index"
        variant="text"
        size="small"
        class="icon-link pa-0"
        :href="button.url"
        target="_blank"
        ><i :class="getDeviconClass(button.network)"></i
      ></v-btn>
      <template v-else></template>
    </template>
    <v-btn variant="text" size="small" class="icon-link" :href="mailTo"
      ><v-icon>mdi-email-outline</v-icon></v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/stores/store';
import { getDeviconClass } from '@/utils/formatting';
import { computed } from 'vue';

defineProps({
  primary: Boolean,
});
const store = useResumeStore();
const socialIcons = computed(() => store.resume?.basics?.profiles);
const email = computed(() => store.resume?.basics?.email);
const mailTo = computed(() => `mailto:${email.value};`);
</script>

<style lang="scss" scoped>
.icon-link {
  i {
    font-size: 28px;
  }
}

.v-img__img--contain {
  object-fit: cover;
}
</style>
