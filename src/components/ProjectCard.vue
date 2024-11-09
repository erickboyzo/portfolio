<template>
  <v-card variant="tonal" class="my-5">
    <div class="img-hover-zoom">
      <v-img v-if="project.image" class="white--text align-end project-image" height="200px" v-bind:src="project.image"> </v-img>

      <v-img v-else class="white--text align-end project-image" height="200px" :src="project.dynamicImage"> </v-img>
    </div>
    <v-card-title class="text-capitalize text-h5">{{ $filters.formatName(project.displayName) }} </v-card-title>
    <div class="ml-3">
      <span class="v-icon project-icon ma-2" v-for="(icon, index) of project.libraries" v-bind:key="index">
        <i :class="$filters.deviconIcon(icon)"></i>
      </span>
      <span class="v-icon project-icon ma-2" v-for="(icon, index) of project.languages" v-bind:key="index">
        <i :class="$filters.deviconIcon(icon)"></i>
      </span>
    </div>
    <v-card-subtitle class="text--secondary">{{ resumeMetaData.DESCRIPTION }}</v-card-subtitle>
    <v-card-text style="height: 90px" class="pb-0 description overflow-hidden">
      <p class="text--primary">
        {{ project.summary }}
      </p>
    </v-card-text>

    <v-card-actions>
      <div class="d-flex actions my-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn :href="project.githubUrl" target="_blank" color="primary" text v-on="on" large>
              <v-icon class="mr-1">mdi-file-code-outline</v-icon>
              Github
            </v-btn>
          </template>
          <span>{{ resumeMetaData.VIEW_SOURCE }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-if="project.website" :href="project.website" target="_blank" color="primary" text v-on="on" large>
              <v-icon class="mr-1">mdi-web</v-icon>
              Website
            </v-btn>
          </template>
          <span>{{ resumeMetaData.GO_TO_APP }}</span>
        </v-tooltip>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { resumeStore } from "@/stores/store";
import type { Project } from "@/interfaces/project";
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  name: "ProjectCard",
  props: {
    project: { type: Object as PropType<Project>, required: true },
  },
  setup(props) {
    props.project;
  },
  data() {
    return {
      resumeMetaData: resumeStore().siteMetaData,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.roll-in-left {
  -webkit-animation: roll-in-left 0.6s ease-out both;
  animation: roll-in-left 0.6s ease-out both;
}

.project-icon {
  font-size: xx-large;
}

.actions {
  width: 100%;
  justify-content: space-evenly;
}

.project-description {
  height: 200px;
  overflow: auto;
}

.img-hover-zoom {
  height: 200px;
  overflow: hidden;
}

.img-hover-zoom {
  .project-image {
    transition: transform 0.5s ease;
  }
}

.img-hover-zoom:hover {
  .project-image {
    transform: scale(1.3);
  }
}
</style>
