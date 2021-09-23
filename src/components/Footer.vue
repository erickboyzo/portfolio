<template>
  <v-footer
    absolute
    app
  >
    <v-container class="py-5 fill-height">
      <v-row>
        <v-col cols="12" class="d-flex justify-center pa-0">
          <IconLinks></IconLinks>
        </v-col>
        <v-col cols="12" class="d-flex justify-center pa-0">
          &copy; {{ currentYear }}{{ copyRight }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import IconLinks from '@/components/IconLinks.vue';

export default {
  name: 'Footer',
  components: { IconLinks },
  data: () => ({
    currentYear: new Date().getFullYear(),
    copyRight: ', Erick Boyzo, All rights reserved.',
  }),
};
</script>

<style lang="scss" scoped>
.icon-link{
  i{
    font-size: 28px;
  }
}
</style>
