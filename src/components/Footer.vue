<template>
  <v-footer app absolute>
    <v-container id="footer-container" class="fill-height footer-container">
      <v-row>
        <v-col cols="12" class="d-flex justify-center py-1 mt-3">
          <IconLinks :primary="isDarkTheme" />
        </v-col>
        <v-col cols="12" class="d-flex justify-center py-1 my-1">
          &copy; {{ currentYear }} {{ copyRight }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import IconLinks from '@/components/IconLinks.vue';
import { useResumeStore } from '@/stores/store';
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDarkTheme = computed(() => theme.global.current.value.dark);
const currentYear = new Date().getFullYear();
const copyRight = useResumeStore().resume.basics.name;
</script>

<style lang="scss">
.v-footer {
  background-color: rgb(var(--v-theme-background));

  .footer-container {
    border-top: 1px solid rgb(var(--v-theme-outline));
  }

  .icon-link {
    i {
      font-size: 1.75rem;
    }
  }
}
</style>
