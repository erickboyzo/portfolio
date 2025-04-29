<template>
  <div class="about mt-11">
    <v-row no-gutters class="px-2">
      <v-col cols="12" sm="7">
        <h1 class="d-flex font-weight-regular" v-html="resumeMetaData.content.greeting" />
        <h1 class="font-weight-regular greeting-intro" v-html="replacePlaceholder(resumeMetaData.content.greetingIntro, resume.basics.name)" />
        <v-col class="px-0" cols="12" sm="12">
          <div class="title-headers">
            <span class="typewriter">
              <h2 v-if="!typingDone" class="font-weight-regular">{{ displayText }}<span class="caret" :class="{ blink: isBlinking }" /></h2>
            </span>
            <h1 v-if="typingDone" class="font-weight-regular role-title">{{ resume.basics.label }}.</h1>
          </div>
        </v-col>
        <v-col class="hidden-sm-and-up" cols="12" sm="5">
          <v-img position="top center" class="rounded-circle v-responsive mx-auto" height="200" width="200" :alt="resume.basics.name" :src="resume.basics.image" />
        </v-col>
        <v-col class="px-0" cols="12" sm="12">
          <p class="my-5" v-html="resume.basics.summary" />
          <p class="my-5" v-html="resumeMetaData.content.aboutContactText" />
        </v-col>
      </v-col>
      <v-col class="hidden-xs" cols="12" sm="5">
        <v-img position="top center" class="rounded-circle mx-auto" height="320" width="350" :alt="resume.basics.name" :src="resume.basics.image" />
      </v-col>
      <v-col class="px-0 d-flex contact-me-container" cols="12" sm="12">
        <v-btn size="x-large" color="primary" variant="tonal" @click="navigateTo('projects')">
          {{ resumeMetaData.navigation.viewProjects }}
        </v-btn>
        <v-btn class="mx-2" size="x-large" color="primary" variant="tonal" @click="navigateTo('contact')">
          {{ resumeMetaData.navigation.contactMe }}
        </v-btn>
        <IconLinks class="ml-md-3 d-flex justify-center" />
      </v-col>
      <v-col class="mt-10" cols="12">
        <SectionHeader>{{ resumeMetaData.sections.devExperienceTitle }}</SectionHeader>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-for="(skill, index) in resumeMetaData.professionalSkills" :key="`skill-${index}`" cols="12" sm="6" class="my-3">
        <v-card variant="tonal" class="ma-2 fill-height">
          <div class="d-flex flex-column justify-center pa-3">
            <div class="d-flex flex-column pa-2">
              <div class="text-center">
                <v-icon color="primary" size="80" class="v-icon project-icon mb-2">
                  {{ skill.icon }}
                </v-icon>
              </div>
              <div>
                <h3 class="text-center mb-2">{{ skill.label }}</h3>
                <p class="overview text-center">{{ skill.text }}</p>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useResumeStore } from "@/stores/store";
import { replacePlaceholder } from "@/utils/formatting";
import SectionHeader from "@/components/SectionHeader.vue";
import IconLinks from "@/components/IconLinks.vue";

const router = useRouter();

const store = useResumeStore();
const { resume, siteMetaData: resumeMetaData } = store;

const displayText = ref("");
const typingDone = ref(false);
const isBlinking = ref(true);

const getRandomDelay = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

const navigateTo = (route: string): void => {
  router.push(route);
};

const typeText = async (fullText: string): Promise<void> => {
  const delays = {
    typing: { min: 100, max: 200 },
    pause: { min: 200, max: 500 },
    longPause: { min: 500, max: 1000 },
  };

  for (let i = 0; i <= fullText.length; i++) {
    isBlinking.value = false;
    displayText.value = fullText.substring(0, i);

    const delay = getRandomDelay(delays.typing.min, delays.typing.max);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  isBlinking.value = true;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  typingDone.value = true;
};

onMounted(() => {
  typeText(resumeMetaData.content.title);
});
</script>

<style lang="scss">
@use "vuetify/settings";

.about {
  h1 {
    font-size: 50px;
  }

  p:not(.overview) {
    font-size: 21px;
  }

  .title-headers {
    h2 {
      font-size: 37px;
      color: rgb(var(--v-theme-on-background));
    }
  }

  .role-title {
    color: rgb(var(--v-theme-primary));
  }

  @media #{map-get(settings.$display-breakpoints, 'sm-and-down')} {
    h1 {
      font-size: 32px;
    }

    .title-headers {
      h2 {
        font-size: 24px;
      }
    }

    .role-title {
      font-size: 36px;
    }
  }

  @media #{map-get(settings.$display-breakpoints, 'xs')} {
    h1 {
      font-size: 36px;
    }

    .title-headers {
      h2 {
        font-size: 26px;
      }
    }

    .contact-me-container {
      flex-direction: column-reverse;

      .v-btn {
        margin-top: 15px;
      }
    }
  }

  .greeting-intro span {
    color: rgb(var(--v-theme-primary));
  }

  .icon-link {
    margin-right: 10px;
    height: 60px;
    width: 60px;

    i {
      font-size: 40px !important;
    }
  }
}

.typewriter {
  h2,
  h3 {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.12em;
  }
}

.caret {
  display: inline-block;
  width: 3px;
  height: 1.2em;
  margin-left: 2px;
  background-color: rgb(var(--v-theme-primary));
  vertical-align: text-bottom;
  opacity: 1;

  &.blink {
    animation: blink 0.75s step-end infinite;
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
