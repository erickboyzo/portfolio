<template>
  <div class="project">
    <v-container>
      <v-row>
        <v-col cols="12"
               md="12">
          <Section>
            <template v-slot:header>
              <div class="d-flex justify-center">
                <h3 class="font-weight-regular">Projects & Skills</h3>
              </div> </template>
            <template v-slot:content>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-skeleton-loader
                    v-bind="attrs"
                    type="card-avatar, article, actions"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    v-bind="attrs"
                    type="date-picker"
                  ></v-skeleton-loader>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-skeleton-loader
                    v-bind="attrs"
                    type="article, actions"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    v-bind="attrs"
                    type="table-heading, list-item-two-line, image, table-tfoot"
                  ></v-skeleton-loader>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-avatar, divider,
                    list-item-three-line, card-heading, image, actions"
                  ></v-skeleton-loader>

                  <v-skeleton-loader
                    v-bind="attrs"
                    type="list-item-avatar-three-line, image, article"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
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
import Section from '../components/Section.vue';

export default {
  name: 'Projects',
  components: { Section },
  data: () => ({
    attrs: {
      class: 'mb-6',
      boilerplate: true,
      elevation: 2,
    },
  }),
};
</script>

<style scoped>

</style>
