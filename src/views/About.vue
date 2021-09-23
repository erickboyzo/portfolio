<template>
  <div class="about">
    <v-row no-gutters>
      <v-col cols="12">
        <Section>
          <template v-slot:header>
            <v-container class="pa-0">
              <v-row>
                <v-col cols="12" class="d-flex justify-center py-2">
                  <h1 class="font-weight-regular">{{ $Constants.APP_NAME }}</h1>
                </v-col>
                <v-col cols="12" class="d-flex justify-center py-2">
                  <div v-for="(title, index) in $Constants.ABOUT_ME_TITLES"
                       v-bind:key="index">
                    <span v-if="ind === index"
                          class="typewriter">
                      <h3 class="font-weight-regular">{{ title }}</h3>
                    </span>
                  </div>
                </v-col>
                <v-col cols="12" class="d-flex justify-center py-2">
                  <IconLinks></IconLinks>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:content>
            <v-row>
              <v-col class="d-flex flex-column justify-center pb-0" cols="12">
                <v-img class="rounded-circle mx-auto" height="225" width="225" alt="Erick Boyzo"
                       src="@/assets/images/me.jpg"></v-img>
              </v-col>
              <v-col class="d-flex flex-column" cols="12" sm="6">
                <div class="mt-5 px-6">
                  <h2 class="d-flex justify-center font-weight-regular my-5">
                    {{ $Constants.ABOUT_ME }}</h2>
                  <p v-html="$Constants.ABOUT_CONTENT"></p>
                </div>

              </v-col>
              <v-divider vertical></v-divider>
              <v-col sm="6" cols="12">
                <h2 class="d-flex justify-center my-8 font-weight-regular">
                  {{ $Constants.ABOUT_PERSONAL_DETAILS }}</h2>

                <div class="detail px-6 mt-3"
                     v-for="(icon, index) in $Constants.ABOUT_ICONS" v-bind:key="icon.label">
                  <label class="my-5 font-weight-medium">
                    <v-icon color="primary"
                            class="mr-2">{{ icon.icon }}
                    </v-icon>
                    {{ icon.label }}</label>
                  <div v-if="icon.link" class="my-5 ml-5 font-weight-light">
                    <a class="v-list-item--link" target="_blank"
                       :href="'mailto: ' + icon.value">{{ icon.value }}</a>
                  </div>
                  <div v-else class="label__info my-5 ml-5 font-weight-light"> {{ icon.value }}</div>
                  <v-divider v-if="index !== ($Constants.ABOUT_ICONS.length - 1)"></v-divider>
                </div>
              </v-col>
            </v-row>
          </template>
          <template v-slot:actions>
          </template>
        </Section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import Section from '../components/Section.vue';
import IconLinks from '../components/IconLinks.vue';

export default Vue.extend({
  name: 'About',
  components: { IconLinks, Section },
  data: () => ({
    ind: 0,
    interval: null,
  }),
  mounted() {
    this.interval = setInterval(() => {
      if (this.ind < (this.$Constants.ABOUT_ME_TITLES.length - 1)) {
        this.ind += 1;
      } else {
        this.ind = 0;
      }
      this.isActive = true;
    }, 6000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
});
</script>
<style lang="scss" scoped>
.typewriter h3 {
  overflow: hidden;
  border-right: .15em solid orange;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
  animation: typing 3.5s steps(30, end),
  blink-caret .5s step-end infinite;
}

@keyframes typing {
  from {
    width: 0
  }
  to {
    width: 100%
  }
}

@keyframes blink-caret {
  from, to {
    border-color: transparent
  }
  50% {
    border-color: orange
  }
}

.icon-link.theme--light.v-btn.v-btn--icon {
  color: white !important;

  i {
    font-size: 36px;
  }
}

.detail {
  label, a, .label__info {
    font-size: 18px;
  }
}
</style>
