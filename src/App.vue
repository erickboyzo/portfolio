<template>
  <v-app id="portfolio">
    <template v-if="!loading">
      <Header :flush-header="isAtTheTopOfPage">
        <RouterView />
      </Header>
      <Footer />
    </template>
    <LoadingDialog :show="loading" :error="apiError" @retry="fetchProfile" />
  </v-app>
</template>

<script setup lang="ts">
import LoadingDialog from "@/components/LoadingDialog.vue";
import type { ProfileResponse } from "@/interfaces/profile-response";
import { useResumeStore } from "@/stores/store";
import axios from "axios";
import debounce from "lodash/debounce";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { useTheme } from "vuetify";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

const useScrollHandler = () => {
  const isAtTheTopOfPage = ref(true);
  let handleDebouncedScroll: Function;

  const handleScroll = () => {
    isAtTheTopOfPage.value = !window.pageYOffset;
  };

  onMounted(() => {
    handleDebouncedScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", handleDebouncedScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleDebouncedScroll);
  });

  return { isAtTheTopOfPage };
};

const theme = useTheme();
const store = useResumeStore();
const loading = ref(true);
const apiError = ref(false);
const { isAtTheTopOfPage } = useScrollHandler();

const fetchProfile = async () => {
  loading.value = true;
  apiError.value = false;

  try {
    const response = await axios.post("portfolio", { gitConnectedProfileKey: store.gitConnectedProfileKey }, { headers: { "Content-Type": "application/json" } });

    const { profile, siteMetaData } = response.data as ProfileResponse;
    store.$patch((state) => {
      state.resumeData = profile;
      state.metaData = siteMetaData;
    });
    loading.value = false;
    apiError.value = false;
  } catch (error) {
    apiError.value = true;
  }
};

onBeforeMount(() => {
  theme.global.name.value = localStorage.getItem("darkTheme") === "true" ? "dark" : "light";
  fetchProfile();
});
</script>

<style lang="scss">
@use "node_modules/vuetify/settings";
@import "node_modules/vuetify/styles";
@import "theme";

:root {
  --scrollbar-width: 0.5rem;
  --scrollbar-radius: 0.5rem;
  --scrollbar-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

html {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: map-get(settings.$grey, "lighten-2") map-get(settings.$grey, "base");
}

::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
}

::-webkit-scrollbar-track {
  box-shadow: var(--scrollbar-shadow);
  background-color: map-get(settings.$grey, "lighten-2");
}

::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-radius);
  background-color: map-get(settings.$grey, "base");
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
