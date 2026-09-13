<template>
  <v-app id="portfolio">
    <AppHeader :flush-header="isAtTheTopOfPage">
      <RouterView />
    </AppHeader>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppFooter from '@/components/Footer.vue';
import AppHeader from '@/components/Header.vue';
import { useResumeStore } from '@/stores/store';
import debounce from 'lodash/debounce';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useTheme } from 'vuetify';

const useScrollHandler = () => {
  const isAtTheTopOfPage = ref(true);
  let handleDebouncedScroll: () => void;

  const handleScroll = () => {
    isAtTheTopOfPage.value = !window.pageYOffset;
  };

  onMounted(() => {
    handleDebouncedScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', handleDebouncedScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleDebouncedScroll);
  });

  return { isAtTheTopOfPage };
};

const theme = useTheme();
const store = useResumeStore();
const { isAtTheTopOfPage } = useScrollHandler();

onBeforeMount(() => {
  theme.global.name.value = localStorage.getItem('darkTheme') === 'true' ? 'dark' : 'light';
  store.fetchProfile();
});
</script>

<style lang="scss">
@use 'node_modules/vuetify/settings';
@import 'node_modules/vuetify/styles';
@import 'theme';

:root {
  --scrollbar-width: 0.5rem;
  --scrollbar-radius: 0.5rem;
  --scrollbar-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

html {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: map-get(settings.$grey, 'lighten-2') map-get(settings.$grey, 'base');
}

::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
}

::-webkit-scrollbar-track {
  box-shadow: var(--scrollbar-shadow);
  background-color: map-get(settings.$grey, 'lighten-2');
}

::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-radius);
  background-color: map-get(settings.$grey, 'base');
  box-shadow: var(--scrollbar-shadow);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

p {
  color: rgb(var(--v-text-base));
}
</style>
