<template>
  <v-footer
    absolute
    app
   elevation="12"
  >
    <v-container class="py-5 fill-height">
      <v-row>
        <v-col cols="12" class="d-flex justify-center pa-0">
        <v-btn class="footer-icon"  v-for="(button, index) of footerIcons"
               v-bind:key="index"
               icon x-large :href="button.link"><i :class="button.icon"></i></v-btn>
        </v-col>
        <v-col cols="12" class="d-flex justify-center pa-0">
          &copy; {{currentYear}}{{copyRight}}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    currentYear: new Date().getFullYear(),
    copyRight: ', Erick Boyzo, All rights reserved.',
    footerIcons: [
      { icon: 'devicon-linkedin-plain colored', link: 'https://www.linkedin.com/in/erick-boyzo-258023a1' },
      { icon: 'devicon-github-original', link: 'https://github.com/erickboyzo' },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.footer-icon{
  i{
    font-size: 28px;
  }
}
</style>
