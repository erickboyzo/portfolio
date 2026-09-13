<template>
  <PageSkeletonLoader>
    <div class="project">
      <v-container class="pa-0">
        <SectionHeader>
          {{ resumeMetaData.navigation.projects }}
          <template #subtitle>
            {{ resumeMetaData.sections.devExperienceSubTitle }}
          </template>
        </SectionHeader>
        <v-row>
          <v-col cols="12">
            <ProjectContainer :projects="projects" />
          </v-col>
        </v-row>
      </v-container>

      <v-container class="px-0 py-10 my-5">
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
  </PageSkeletonLoader>
</template>

<script setup lang="ts">
import PageSkeletonLoader from '@/components/PageSkeletonLoader.vue';
import ProjectContainer from '@/components/ProjectContainer.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import SkillCard from '@/components/SkillCard.vue';
import type { Images, Project } from '@/interfaces/project';
import { useResumeStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const store = useResumeStore();
const { resumeData: resume, siteMetaData: resumeMetaData } = storeToRefs(store);

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

  return [...(resume.value.skills ?? [])].sort((a, b) => levelMap[b.level] - levelMap[a.level]);
});

const processProjectImages = (projectData: Project[]) => {
  return projectData.map((project) => mapProjectImages(project));
};

const mapProjectImages = (project: Project) => {
  const images = Object.values(project.images as Images).map(
    (image) => image.resolutions.desktop.url
  );
  const icons = [...(project.libraries as string[]), ...(project.languages as string[])];
  return {
    ...project,
    mappedImages: images.length ? images : [`/images/${getRandomDefaultImage()}`],
    icons,
  };
};

const getRandomDefaultImage = () => {
  const defaultImages = resumeMetaData.value.defaultImages;
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

const initializeProjects = () => {
  projects.value = processProjectImages([...resume.value.projects]);
  isLoading.value = false;
};

watch(
  () => store.isLoading,
  (isLoading) => {
    if (!isLoading && resume.value.projects?.length) {
      initializeProjects();
    }
  },
  { immediate: true }
);
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
