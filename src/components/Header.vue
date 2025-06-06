<template>
  <v-app-bar
    app
    height="70"
    density="comfortable"
    scroll-behavior="elevate"
    :elevation="flushHeader ? null : 12"
    scroll-target="#content-container">
    <v-container class="pa-0 d-flex align-center">
      <v-app-bar-nav-icon
        v-if="mobile"
        variant="text"
        :icon="drawer ? 'mdi-backburger' : 'mdi-menu'"
        @click="toggleDrawer" />
      <header-title :title="name" />
      <v-spacer class="hidden-xs-only" />
      <v-toolbar-items class="hidden-sm-and-down button-nav">
        <v-btn
          v-for="link in navigationLinks"
          :key="link.link"
          :to="link.link"
          class="header-btn"
          variant="text">
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
      <div class="ml-auto theme-toggle">
        <span>
          <ThemeToggle />
        </span>
      </div>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer v-if="mobile" v-model="drawer" app height="100vh" width="500">
    <v-list nav dense>
      <v-list-group v-model="group" class="app-links">
        <v-list-item v-for="link in navigationLinks" :key="link.link" :to="link.link">
          {{ link.title }}
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-container id="content-container" class="my-5">
      <slot />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/stores/store';
import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import HeaderTitle from '@/components/HeaderTitle.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

interface NavigationLink {
  title: string;
  link: string;
}

interface Props {
  flushHeader?: boolean;
}

withDefaults(defineProps<Props>(), {
  flushHeader: false,
});

const { mobile } = useDisplay();
const resume = useResumeStore();

const drawer = ref(false);
const group = ref<null | string>(null);

const name = computed(() => resume.resume.basics.name);

const navigationLinks: NavigationLink[] = [
  {
    title: 'About Me',
    link: 'about',
  },
  {
    title: 'Projects',
    link: 'projects',
  },
  {
    title: 'Contact Me',
    link: 'contact',
  },
];

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style lang="scss" scoped>
.v-app-bar-title__content {
  width: 100% !important;
}

.v-app-bar {
  background-color: rgb(var(--v-theme-background));

  .v-toolbar__content {
    padding-bottom: 0 !important;
  }
}

.v-toolbar__content {
  padding: {
    bottom: 0 !important;
    top: 0 !important;
  }
}

.theme-toggle {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    margin-bottom: 1px;
  }
}

.button-nav {
  margin-right: 10px;

  .v-btn--active {
    color: rgb(var(--v-theme-text));
    border-bottom: 6px solid rgb(var(--v-theme-primary));
    padding-top: 6px;
  }
}

.v-navigation-drawer__content {
  .v-icon {
    font-size: 2em;
  }
}

.header-btn {
  border-radius: 0 !important;
}

.app-links {
  .v-list-item--active {
    border-left: 7px solid rgb(var(--v-theme-primary));
  }
}
</style>
