<template>
  <div class="project">
    <v-container class="pa-0">
      <h1 class="font-weight-light my-5 text-h2">{{ resumeMetaData.PROJECTS }}</h1>

      <template v-if="!projectsData || loading">
        <v-row>
          <v-col v-for="num in placeHolders" v-bind:key="num" cols="12" md="4">
            <v-skeleton-loader v-bind="attrs" type="card-avatar, article, actions"></v-skeleton-loader>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row>
          <v-col cols="12">
            <project-container :projects="projectsData"></project-container>
          </v-col>
        </v-row>
      </template>
    </v-container>
    <v-container class="px-0 py-10 my-5" v-if="!loading">
      <h1 class="font-weight-light my-5 text-h2">{{ resumeMetaData.TECH_SKILLS }}</h1>
      <v-row>
        <v-col sm="6" md="3" v-for="(skill, index) in skillsData" v-bind:key="index">
          <skill-card :skill="skill"></skill-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import ProjectContainer from "@/components/ProjectContainer.vue";
import SkillCard from "@/components/SkillCard.vue";
import type { Project } from "@/interfaces/project";
import { resumeStore } from "@/stores/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectsView",
  components: {
    SkillCard,
    ProjectContainer,
  },
  data() {
    return {
      loading: true,
      placeHolders: Array(9)
        .fill(undefined, undefined, undefined)
        .map((_, i) => i + 1),
      projectsData: null,
      skillsData: [],
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 4,
      },
      resumeMetaData: resumeStore().siteMetaData,
      resume: resumeStore().resume,
    };
  },
  methods: {
    setViewData(response: Project[]) {
      response.forEach((p) => {
        const imagesUrl = p.images[0] ? p.images[0].resolutions.desktop.url : undefined;
        p.dynamicImage = `/images/${this.resumeMetaData.DEFAULT_IMAGES[Math.floor(Math.random() * this.resumeMetaData.DEFAULT_IMAGES.length)]}`;
        p.image = imagesUrl;
      });
      this.projectsData = response;
      this.loading = false;
    },
    setSortedSkills(): void {
      const levelMap = {
        Learning: 0,
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
        Expert: 4,
      };
      this.skillsData = this.resume.skills
        .sort((a, b) => {
          return levelMap[a.level] - levelMap[b.level];
        })
        .reverse();
    },
  },

  mounted() {
    this.setViewData([...this.resume.projects]);
    this.setSortedSkills();
  },
});
</script>

<style lang="scss" scoped>
.project-icon {
  font-size: xxx-large;
}

.experience-label {
  font-size: 13px;
}
</style>
