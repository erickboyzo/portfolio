<template>
  <v-app id="portfolio">
    <template v-if="!loading">
      <Header :flush-header="isAtTheTopOfPage">
        <RouterView/>
      </Header>
      <Footer/>
    </template>
    <v-dialog v-if="loading" max-width="320" v-model="loading" persistent>
      <v-list class="py-2" color="primary" elevation="12" rounded="lg">
        <v-list-item title="Loading resume...">
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          <template v-slot:append>
            <v-progress-circular color="primary" indeterminate="disable-shrink" size="24" width="2"></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { resumeStore } from '@/stores/store';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { onBeforeMount, onMounted, onUnmounted, shallowRef } from 'vue';
import { useTheme } from 'vuetify/dist/vuetify';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

const theme = useTheme();
const store = resumeStore();
const loading = shallowRef(true);
let handleDebouncedScroll;
const isAtTheTopOfPage = shallowRef(true);

function handleScroll() {
  isAtTheTopOfPage.value = !window.pageYOffset;
}

onMounted(() => {
  theme.global.name.value = localStorage.getItem('darkTheme') === 'true' ? 'dark' : 'light';
  handleDebouncedScroll = debounce(handleScroll, 100);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleDebouncedScroll);
});

function fetchProfile() {
  loading.value = true;
  axios
    .get(`https://gitconnected.com/v1/portfolio/${store.gitConnectedProfileKey}`)
    .then((response) => {
      store.$patch({
        resumeData: response.data,
      });
    })
    .catch((error) => console.error(error))
    .finally(() => {
      loading.value = false;
    });
}

onBeforeMount(() => {
  fetchProfile();
});
</script>

<style lang="scss" scoped>
@use "node_modules/vuetify/settings";
@import "node_modules/vuetify/styles";
@import "theme";

html {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: map-get(settings.$grey, "lighten-2") map-get(settings.$grey, "base");
}

::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background-color: map-get(settings.$grey, "lighten-2");
}

::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: map-get(settings.$grey, "base");
  box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

p {
  color: rgb(var(--v-text-base));
}
</style>
