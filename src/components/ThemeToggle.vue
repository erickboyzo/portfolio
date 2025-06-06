<template>
  <v-btn icon="" @click="toggleTheme">
    <v-icon v-if="!theme.global.current.value.dark" color="#FBC02D">mdi-lightbulb-on</v-icon>
    <v-icon v-else color="#BDBDBD">mdi-lightbulb-off-outline</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme();

function toggleTheme(): void {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('darkTheme', theme.global.current.value.dark.toString());
}
</script>

<style scoped></style>
