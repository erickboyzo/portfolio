<template>
  <div class="project">
    <v-container class="pa-0">
      <SectionHeader>
        {{ resumeMetaData.navigation.projects }}
        <template #subtitle>
          {{ resumeMetaData.sections.devExperienceSubTitle }}
        </template>
      </SectionHeader>

      <template v-if="isLoading">
        <v-row>
          <v-col v-for="num in PLACEHOLDER_COUNT" :key="`placeholder-${num}`" cols="12" md="4">
            <v-skeleton-loader v-bind="skeletonAttrs" type="card-avatar, article, actions" />
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-row>
          <v-col cols="12">
            <ProjectContainer :projects="projects" />
          </v-col>
        </v-row>
      </template>
    </v-container>

    <v-container v-if="!isLoading" class="px-0 py-10 my-5">
      <SectionHeader>
        {{ resumeMetaData.sections.techSkills }}
        <template #subtitle>
          {{ resumeMetaData.sections.techSkillsSubTitle }}
        </template>
      </SectionHeader>

      <v-row>
        <v-col v-for="(skill, index) in sortedSkills" :key="`skill-${index}`" sm="6" md="3">
          <SkillCard :skill="skill" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import ProjectContainer from "@/components/ProjectContainer.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import SkillCard from "@/components/SkillCard.vue";
import type { Project } from "@/interfaces/project";
import { useResumeStore } from "@/stores/store";
import { computed, onMounted, ref } from "vue";

const PLACEHOLDER_COUNT = 9;

const store = useResumeStore();
const { resumeData: resume, siteMetaData: resumeMetaData } = store;

const isLoading = ref(true);
const projects = ref<Project[]>([]);

const sortedSkills = computed(() => {
  const levelMap: Record<string, number> = {
    Learning: 0,
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
  };

  return [...resume.skills].sort((a, b) => levelMap[b.level] - levelMap[a.level]);
});

// Props for v-skeleton-loader
const skeletonAttrs = {
  class: "mb-6",
  boilerplate: true,
  elevation: 4,
};

// Methods
const processProjectImages = (projectData: Project[]) => {
  return projectData.map((project) => ({
    ...project,
    dynamicImage: `/images/${getRandomDefaultImage()}`,
    image: project.images[0]?.resolutions.desktop.url,
  }));
};

const getRandomDefaultImage = () => {
  const defaultImages = resumeMetaData.defaultImages;
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

const initializeProjects = () => {
  projects.value = processProjectImages([...resume.projects]);
  isLoading.value = false;
};

// Lifecycle
onMounted(() => {
  initializeProjects();
});
</script>

<style lang="scss" scoped>
.project {
  &-icon {
    font-size: xxx-large;
  }
}

.experience-label {
  font-size: 0.813rem; // 13px converted to rem
}
</style>
