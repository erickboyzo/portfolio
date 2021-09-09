<template>
  <div class="about">
    <v-row no-gutters>
      <v-col cols="12">
        <Section>
          <template v-slot:header>
            <div class="d-flex justify-center">
            <h3 class="font-weight-regular">About Me</h3>
          </div></template>
          <template v-slot:content>
            <v-row>
              <v-col cols="6">
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="6">
                Greatest properly off ham exercise all.
                Unsatiable invitation its possession nor off. All difficulty
                estimating unreserved increasing the solicitude.
              </v-col>
            </v-row>
          </template>
          <template v-slot:actions></template>
        </Section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue';
import Section from '../components/Section.vue';

export default Vue.extend({
  name: 'About',

  components: { Section },
});
</script>
