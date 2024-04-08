<template>
  <v-row>
    <v-col v-for="project in sliceItems()" v-bind:key="project.name" cols="12" md="12">
      <v-card  class="my-1 full-card fade-in-right">
        <v-card-text class="pb-0 description overflow-hidden">
          <v-row>
            <v-col class="d-flex flex-column" cols="12" md="6">
              <div class="text-capitalize text-h4 mb-2">{{ $filters.formatName(project.displayName) }}</div>
              <div class="my-3">
                <span class="v-icon project-icon-expanded mx-2" v-for="(icon, index) of project.libraries" v-bind:key="index">
                  <i :class="$filters.deviconIcon(icon)"></i>
                </span>
                <span class="v-icon project-icon-expanded mx-2" v-for="(icon, index) of project.languages" v-bind:key="index">
                  <i :class="$filters.deviconIcon(icon)"></i>
                </span>
              </div>
              <p class="text--primary summary pa-2">
                {{ project.summary }}
              </p>

              <div class="d-flex my-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn class="mr-2" :href="project.githubUrl" target="_blank" color="primary" size="x-large" variant="text" v-on="on" large>
                      <v-icon class="mr-1">mdi-file-code-outline</v-icon>
                      Github
                    </v-btn>
                  </template>
                  <span>{{ resumeMetaData.VIEW_SOURCE }}</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="project.website" :href="project.website" target="_blank" color="primary" size="x-large" variant="text" v-on="on" large>
                      <v-icon class="mr-1">mdi-web</v-icon>
                      Website
                    </v-btn>
                  </template>
                  <span>{{ resumeMetaData.GO_TO_APP }}</span>
                </v-tooltip>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <div class="img-hover-zoom">
                <v-img v-if="project.image" height="250" class="white--text align-end project-image rounded mb-3" :src="project.image"> </v-img>
                <v-img v-else height="250" class="white--text align-end project-image rounded mb-3" :src="project.dynamicImage"> </v-img>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <project-card class="compact-card hidden-md-and-up fade-in-right" :project="project"></project-card>
    </v-col>
    <pagination :current-page="index" @pageChange="updatePage" :page-count="projects.length"></pagination>
  </v-row>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import type { Project } from "@/interfaces/project";
import { resumeStore } from "@/stores/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectContainer",
  components: {
    Pagination,
    ProjectCard,
  },
  props: {
    projects: {
      type: [],
      default: [],
    },
  },
  data() {
    return {
      index: 0,
      resumeMetaData: resumeStore().siteMetaData,
    };
  },
  methods: {
    sliceItems(): Project[] {
      return this.projects.slice(this.index, this.index + 1);
    },
    updatePage(newPage: number): void {
      this.index = newPage;
      console.log(this.sliceItems());
    },
  },
});
</script>

<style lang="scss" scoped>
@use "node_modules/vuetify/settings";

.project-icon {
  font-size: 28px;
}

p.summary {
  flex-grow: 1;
}

.project-icon-expanded {
  font-size: 34px;
}

@media #{map-get(settings.$display-breakpoints, 'sm-and-down')} {
  .full-card {
    display: none;
  }
}

.fade-in-right {
  -webkit-animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
