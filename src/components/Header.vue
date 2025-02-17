<template>
  <v-app-bar app height="70" density="comfortable" scroll-behavior="elevate" :elevation="flushHeader ? null : 12" scroll-target="#content-container">
    <v-container class="pa-0 d-flex align-center">
      <v-app-bar-nav-icon variant="text" v-bind:icon="!drawer ? 'mdi-menu' : 'mdi-backburger'" v-if="mobile" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <header-title :title="name"></header-title>
      <v-spacer class="hidden-xs-only"></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down button-nav">
        <v-btn class="header-btn" v-for="link in links" variant="text" v-bind:key="link.link" :to="link.link">
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
  <v-navigation-drawer v-model="drawer" app v-if="mobile" height="100vh" width="500">
    <v-list nav dense>
      <v-list-group class="app-links" v-model="group">
        <v-list-item v-for="link in links" v-bind:key="link.link" :to="link.link">
          {{ link.title }}
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-container id="content-container" class="my-5">
      <slot></slot>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import HeaderTitle from "@/components/HeaderTitle.vue";
import { ref, watch } from "vue";
import { useDisplay } from "vuetify/dist/vuetify";
import ThemeToggle from "./ThemeToggle.vue";
import { resumeStore } from "@/stores/store";

const { mobile } = useDisplay();
const props = defineProps({
  flushHeader: Boolean,
});
const links = [
  {
    title: "About Me",
    link: "about",
  },
  {
    title: "Projects",
    link: "projects",
  },
  {
    title: "Contact Me",
    link: "contact",
  },
];
const drawer = ref(false);
const group = null;
const name = resumeStore().resume.basics.name;
const myPropValue = ref(props.flushHeader);

watch(
  () => props.flushHeader,
  (newValue, _) => {
    myPropValue.value = newValue; // Update the value in the ref if needed
  },
);
</script>

<style lang="scss" scoped>
.v-app-bar-title__content {
  width: 100% !important;
}

//.v-app-bar.v-toolbar {
//
//}

.v-app-bar {
  background-color: rgb(var(--v-theme-background));
  //border-bottom: 0.2px solid rgb(var(--v-theme-outline));
  //
  .v-toolbar__content {
    padding-bottom: 0 !important;
  }
}

.v-toolbar__content {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}

.theme-toggle {
  span {
    margin-bottom: 1px;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
