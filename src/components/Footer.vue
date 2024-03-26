<template>
  <v-footer absolute elevation="3" app>
    <v-container id="footer-container" class="fill-height">
      <v-row>
        <v-col cols="12" class="d-flex justify-center py-1 mt-3">
          <IconLinks :primary="theme.global.current.value.dark"></IconLinks>
        </v-col>
        <v-col cols="12" class="d-flex justify-center py-1 my-1"> &copy; {{ currentYear }} {{ copyRight }} </v-col>
        <v-col cols="12" class="d-flex justify-center py-1 my-1"> This portfolio was build using the following technologies. </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import IconLinks from "@/components/IconLinks.vue";
import { resumeStore } from "@/stores/store";
import { useTheme } from "vuetify/dist/vuetify";

const currentYear = new Date().getFullYear();
const copyRight = resumeStore().resume.basics.name;
const theme = useTheme();
</script>

<style lang="scss" scoped>
.v-footer {
  border-top: thin solid rgba(0, 0, 0, 0.12);
}

.icon-link {
  i {
    font-size: 28px;
  }
}
</style>
