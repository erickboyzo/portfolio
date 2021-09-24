<template>
  <div class="project">
    <v-container>
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
                      <h1 class="d-flex justify-center">Development Experience</h1>
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
                          :value="skill.experience"
                          color="primary"
                          rounded
                          height="45">
                          <template slot="default">
                            <div class="text-subtitle-2 white--text">
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
                      <h1 class="d-flex justify-center">Technical Skills</h1>
                    </div>
                    <div class="pa-5" v-for="(skill, index) in skillsData"
                         v-bind:key="index">
                      <div class="d-flex flex-row justify-center">
                        <div class="mr-3">
                      <span class="v-icon project-icon">
                        <i :class="skill.icon"></i></span>
                        </div>
                        <v-progress-linear
                          :value="skill.experience"
                          color="primary"
                          rounded
                          height="45"
                        >
                        </v-progress-linear>
                      </div>
                    </div>
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

</style>
