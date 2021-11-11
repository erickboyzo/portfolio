<template>
  <div class="project">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="12"
               md="12">
          <Section :loading="loading">
            <template v-slot:header>
              <div class="d-flex justify-center">
                <h3 class="font-weight-regular">{{ $Constants.PROJECTS }}</h3>
              </div>
            </template>
            <template v-slot:content>
              <template v-if="!projectsData || loading">
                <v-row>
                  <v-col v-for="num in placeHolders" v-bind:key="num"
                         cols="12"
                         md="4">
                    <v-skeleton-loader
                      v-bind="attrs"
                      type="card-avatar, article, actions"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </template>
              <template v-else>
                <v-row>
                  <v-col v-for="(project, index) in projectsData"
                         v-bind:key="index"
                         cols="12"
                         md="4">
                    <project-card :project="project"></project-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6">
                    <div class="pa-4">
                      <h2 class="d-flex justify-center
                      font-weight-regular text--primary text-h5">{{$Constants.DEV_EXPERIENCE}}</h2>
                    </div>
                    <div class="pa-5" v-for="(skill, index) in developmentSills"
                         v-bind:key="index">
                      <div class="d-flex flex-row justify-center">
                        <div class="mr-3 d-flex flex-column">
                          <v-icon class="v-icon project-icon">
                            {{ skill.icon }}
                          </v-icon>
                        </div>
                        <v-progress-linear
                          class="rounded-pill"
                          :value="skill.experience"
                          color="primary"
                          rounded
                          height="45">
                          <template slot="default">
                            <div class="experience-label white--text">
                              {{ skill.label }}
                            </div>
                          </template>
                        </v-progress-linear>
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6">
                    <div class="pa-4">
                      <h2 class="d-flex justify-center
                      font-weight-regular text--primary text-h5">{{$Constants.TECH_SKILLS}}</h2>
                    </div>
                    <div class="pa-5" v-for="(skill, index) in
                    (showLess ? skillsData.slice(0, 4) :skillsData)"
                         v-bind:key="index">
                      <div class="d-flex flex-row justify-center">
                        <div class="mr-3">
                      <span class="v-icon project-icon">
                        <i :class="skill.icon"></i></span>
                        </div>
                        <v-progress-linear class="rounded-pill"
                          :value="skill.experience"
                          color="primary"
                          rounded
                          height="45"
                        >
                          <div class="d-flex justify-space-between text-subtitle-2
                          white--text flex-grow-1">
                            <div class="ml-2">{{skill.displayLabel}}</div>
                            <div class="mr-2">
                              <strong>{{Math.ceil(skill.experience)}}%</strong>
                            </div>
                          </div>
                        </v-progress-linear>
                      </div>
                    </div>
                    <div class="d-flex justify-center">
                      <v-btn
                        large
                        color="primary"
                        rounded
                        @click="showLess =!showLess">
                        {{ showLess ? $Constants.SHOW_MORE: $Constants.SHOW_LESS }}
                        <v-icon>{{ showLess ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
                    </v-btn></div>
                  </v-col>
                </v-row>
              </template>
            </template>
            <template v-slot:actions>
            </template>
          </Section>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import Section from '../components/Section.vue';
import ProjectCard from '../components/ProjectCard.vue';

export default {
  name: 'Projects',
  components: { ProjectCard, Section },
  data: () => ({
    loading: false,
    placeHolders: Array(9).fill(undefined, undefined, undefined).map((_, i) => i + 1),
    projectsData: null,
    skillsData: null,
    developmentSills: null,
    showLess: true,
    attrs: {
      class: 'mb-6',
      boilerplate: true,
      elevation: 4,
    },
  }),
  methods: {
    mapProjectIcons(topics) {
      if (topics.length === 0) return [];
      const icons = [];
      topics.forEach((t) => {
        this.$Constants.TOPIC_ICONS.forEach((iconMap) => {
          if (iconMap.value.includes(t)) {
            icons.push(iconMap.icon);
          }
        });
      });
      return icons;
    },
    mapImageUrl(appName) {
      const image = this.$Constants.APP_IMAGES.find((r) => r.indexOf(appName) > -1);
      return image || this.$Constants.DEFAULT_IMAGES[
        Math.floor(Math.random() * this.$Constants.DEFAULT_IMAGES.length)];
    },

    setViewData(response) {
      response.data.forEach((p) => {
        p.formattedName = p.name.replace(/-/g, ' ');
        p.show = false;
        p.projectIcons = this.mapProjectIcons(p.topics);
        p.imageUrl = this.mapImageUrl(p.name);
      });
      this.projectsData = response.data;
      this.skillsData = this.$Constants.TOPIC_ICONS
        .filter((t) => !!t.experience)
        .sort((a, b) => b.experience - a.experience);
      this.developmentSills = [...this.$Constants.PROFESSIONAL_SKILLS]
        .sort((a, b) => b.experience - a.experience);
    },
  },
  mounted() {
    this.loading = true;
    axios.get('https://api.github.com/users/erickboyzo/repos', {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    })
      .then((response) => this.setViewData(response))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.project-icon {
  font-size: xxx-large;
}

.experience-label {
  font-size: 13px;
}

</style>
