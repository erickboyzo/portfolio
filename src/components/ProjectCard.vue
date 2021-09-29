<template>
  <v-card outlined class="my-5">
    <div class="img-hover-zoom">
      <v-img
        class="white--text align-end project-image"
        height="200px"
        :src="require('@/assets/images/' + project.imageUrl)">
      </v-img>
    </div>
    <v-card-title
      class="text-capitalize text-h5">{{ project.formattedName }}
    </v-card-title>
    <div class="ml-3">
                      <span class="v-icon project-icon mx-1"
                            v-for="(icon, index) of project.projectIcons"
                            v-bind:key="index">
                        <i :class="icon"></i>
                      </span>
    </div>

    <v-card-subtitle class="text--secondary">{{ $Constants.DESCRIPTION }}</v-card-subtitle>
    <v-card-text style="height: 90px;"
                 class="pb-0 description overflow-hidden">
      <p class="text--primary">
        {{ project.description }}
      </p>
    </v-card-text>

    <v-card-actions>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            :href="project.html_url"
            target="_blank"
            icon
            color="primary"
            text
            v-on="on"
            large>
            <v-icon>mdi-file-code-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $Constants.VIEW_SOURCE }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-if="project.homepage"
                 :href="project.homepage"
                 target="_blank"
                 color="primary"
                 text
                 v-on="on"
                 icon
                 large>
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </template>
        <span>{{ $Constants.GO_TO_APP }}</span>
      </v-tooltip>

      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        outlined
        @click="project.show = !project.show">
        {{ $Constants.SHOW_MORE }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="project.show"
        class="transition-fast-in-fast-out v-card--reveal d-flex flex-column"
        style="height: 100%;"
      >
        <v-card-title
          class="text-capitalize pb-0">{{ project.formattedName }}
        </v-card-title>
        <div class="card__body flex-grow-1">
          <v-card-subtitle class="text--secondary py-1">{{ $Constants.DESCRIPTION }}</v-card-subtitle>
          <v-card-text class="pb-0">
            <p class="text--primary mb-1">
              {{ project.description }}
            </p>
          </v-card-text>
          <v-card-subtitle class="text--secondary py-1">
            {{ $Constants.PROJECT_TAGS }}
          </v-card-subtitle>
          <div class="ml-3 overflow-auto">
            <v-chip class="ma-1" color="secondary"
                    v-for="(tag,index) in project.topics"
                    v-bind:key="index">{{ tag }}
            </v-chip>
          </div>
        </div>

        <v-card-actions class="pt-0 my-auto">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                :href="project.html_url"
                target="_blank"
                icon
                color="primary"
                text
                v-on="on"
                large>
                <v-icon>mdi-file-code-outline</v-icon>
              </v-btn>
            </template>
            <span>{{ $Constants.VIEW_SOURCE }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-if="project.homepage"
                     :href="project.homepage"
                     target="_blank"
                     color="primary"
                     text
                     v-on="on"
                     icon
                     large>
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>
            <span>{{ $Constants.GO_TO_APP }}</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            @click="project.show = !project.show">
            {{ $Constants.SHOW_LESS }}
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.project-icon {
  font-size: xx-large;
}

.img-hover-zoom {
  height: 200px;
  overflow: hidden;
}

.img-hover-zoom {
  .project-image {
    transition: transform .5s ease;
  }
}

.img-hover-zoom:hover {
  .project-image {
    transform: scale(1.3);
  }
}
</style>
