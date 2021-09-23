<template>
  <v-app-bar
    app
    elevation="0"
    flat
    scroll-target="#content-container">
    <v-container class="pa-0 d-flex align-center">
      <v-app-bar-nav-icon class="hidden-sm-and-up mr-2"
                          @click="drawer = true"></v-app-bar-nav-icon>
      <v-avatar
        class="mr-3 white--text"
        color="primary"
        size="42"
      >{{ abv }}
      </v-avatar>
      <v-app-bar-title width="auto">
        <router-link to="/about" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-app-bar-title>
      <v-spacer class="hidden-xs-only"></v-spacer>
      <v-toolbar-items class="hidden-xs-only button-nav">
        <v-btn v-for="link in links"
               v-bind:key="link.link"
               color="primary"
               :to="link.link"
               text>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>

      <div class="ml-auto theme-toggle">
       <span>
  <v-tooltip v-if="!$vuetify.theme.dark" bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" elevation="3" large icon @click="toggleTheme">
        <v-icon class="mr-1">mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
    <span>Dark Mode On</span>
  </v-tooltip>

  <v-tooltip v-else bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" large icon @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
    <span>Dark Mode Off</span>
  </v-tooltip>
</span>
      </div>
      <v-navigation-drawer
        v-model="drawer"
        temporary
        app
        height="100vh"
        hide-overlay
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
          >
            <v-list-item v-for="link in links"
                         v-bind:key="link.link"
                         :to="link.link">
              {{ link.title }}
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </v-app-bar>
</template>

<script>

export default {
  name: 'Header',
  data: () => ({
    links: [
      { title: 'About Me', link: 'about' },
      { title: 'Projects', link: 'projects' },
      { title: 'Contact Me', link: 'contact' },
    ],
    appTitle: 'Erick Boyzo',
    abv: 'EB',
    drawer: false,
    group: null,
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-toggle{
  span{
    margin-bottom: 1px;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.button-nav{
  min-height: 64px;
  height: 64px!important;
  margin-right: 10px;
}
</style>
