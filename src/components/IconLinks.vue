<template>
  <div v-if="socialIcons">
    <template v-for="(button, index) of socialIcons">
      <v-btn v-if="button.network !== 'gitconnected'" variant="text" size="small" class="icon-link pa-0" v-bind:key="index" :href="button.url" target="_blank"><i :class="getDeviconClass(button.network)"></i></v-btn>
      <template v-else></template>
    </template>
    <v-btn variant="text" size="small" class="icon-link" :href="mailTo"><v-icon>mdi-email-outline</v-icon></v-btn>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from "@/stores/store";
import { getDeviconClass } from "@/utils/formatting";

defineProps({
  primary: Boolean,
});
const socialIcons = useResumeStore().resume.basics.profiles;
const email = useResumeStore().resume.basics.email;
const mailTo = `mailto:${email};`;
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
