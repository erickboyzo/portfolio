<template>
  <v-app id="portfolio">
    <template v-if="!loading">
      <Header :flush-header="isAtTopPage">
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
import { onBeforeMount, onMounted, onUnmounted, shallowRef, watch } from 'vue';
import { useTheme } from 'vuetify/dist/vuetify';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import debounce from 'lodash/debounce';

const theme = useTheme();
const store = resumeStore();
let loading = shallowRef(true);
let handleDebouncedScroll;
let isAtTopPage = shallowRef(false);

function handleScroll() {
  isAtTopPage.value = !window.pageYOffset;
  console.log(isAtTopPage);
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
      console.log(response);
      store.$patch({
        resumeData: response.data,
      });
      console.log(loading);
    })
    .catch((error) => {

      console.log(error);
      console.log(loading);
    })
    .finally(() => {
      console.log('finally');
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

.theme--dark {
  .devicon-github-original.colored {
    color: #fff;
  }
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.child-view {
  position: absolute;
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.message-me {
  bottom: 110px !important;
}

#content-container,
#header-container,
#footer-container {
  max-width: 1000px;
}

p {
  color: rgb(var(--v-text-base));
}
</style>
