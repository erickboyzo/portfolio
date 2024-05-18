<template>
  <div class="about">
    <v-row no-gutters class="px-2">
      <v-col cols="12" sm="7">
        <h1 class="d-flex font-weight-regular" v-html="resumeMetaData.GREETING"></h1>
        <h1 class="font-weight-regular greeting-intro" v-html="$filters.replacePlaceHolder(resumeMetaData.GREETING_INTRO, resume.basics.name)"></h1>
        <v-col class="px-0" cols="12" sm="12">
          <div class="title-headers">
            <span class="typewriter">
              <h2 v-if="!typingDone" class="font-weight-regular">{{ resumeMetaData.TITLE }}</h2>
            </span>
            <h1 class="font-weight-regular role-title" v-if="typingDone">{{ resume.basics.label }}.</h1>
          </div>
        </v-col>
        <v-col class="hidden-sm-and-up" cols="12" sm="5">
          <v-img position="top center" class="rounded-circle v-responsive mx-auto" height="200" width="200" :alt="resume.basics.name" :src="resume.basics.image"></v-img>
        </v-col>
        <v-col class="px-0" cols="12" sm="12">
          <p class="my-5" v-html="resume.basics.summary"></p>
          <p class="my-5" v-html="resumeMetaData.ABOUT_CONTACT_TEXT"></p>
        </v-col>
      </v-col>
      <v-col class="hidden-xs" cols="12" sm="5">
        <v-img position="top center" class="rounded-circle mx-auto" height="320" width="350" :alt="resume.basics.name" :src="resume.basics.image"></v-img>
      </v-col>
      <v-col class="px-0 d-flex contact-me-container" cols="12" sm="12">
        <v-btn size="x-large" height="auto" color="primary" @click="$router.push('contact')" variant="tonal">{{ resumeMetaData.CONTACT_ME }}</v-btn>
        <IconLinks class="ml-md-3 d-flex justify-center"></IconLinks>
      </v-col>
      <v-col class="mt-10" cols="12">
        <h1 class="font-weight-light mt-5 mb-2 text-h2">
          {{ resumeMetaData.DEV_EXPERIENCE_TITLE }}
        </h1>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="6" class="my-3" v-for="(skill, index) in resumeMetaData.PROFESSIONAL_SKILLS" v-bind:key="index">
        <v-card outlined elevation="1" class="ma-2 fill-height">
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

<script lang="ts">
import { resumeStore } from '@/stores/store';
import { defineComponent } from 'vue';
import IconLinks from '../components/IconLinks.vue';

export default defineComponent({
  name: 'AboutView',
  components: {IconLinks},
  data: () => ({
    resume: resumeStore().resume,
    resumeMetaData: resumeStore().siteMetaData,
    typingDone: false,
  }),
  methods: {
    removeCode() {
      setTimeout(() => {
        this.typingDone = true;
      }, 4000);
    }
  },
  mounted() {
    this.removeCode();
  }
});
</script>
<style lang="scss">
@use "node_modules/vuetify/settings";

.about {
  padding-top: 50px;
  padding-bottom: 50px;

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
    span.emoji {
      font-size: 2rem !important;
      margin-left: 20px;
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

  .greeting-intro {
    span {
      color: rgb(var(--v-theme-primary));
    }
  }

  .typewriter h3,
  h2 {
    overflow: hidden;
    border-right: 0.1em solid gray;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.09em;
    animation: typing 3.3s steps(30, end),
    blink-caret 0.5s step-end infinite;
  }

  .info-icons {
    .icon-link {
      color: white !important;

      i {
        font-size: 34px;
      }
    }
  }

  .detail {
    label,
    a,
    .label__info {
      font-size: 18px;
    }
  }

  .about-me-content {
    font-size: 16px;
  }

  img.emojione {
    margin: 0 !important;
    display: inline !important;
  }

  span.emoji {
    font-size: 3rem;
    margin-left: 20px;
  }

  .icon-link > i {
    font-size: 48px;
  }

  .icon-link {
    margin-right: 10px;
    height: 60px !important;
    width: 60px !important;

    i {
      font-size: 40px !important;
    }
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: gray;
  }
}

.v-img__img--contain {
  object-fit: cover;
}
</style>
