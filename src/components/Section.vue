<template>
  <div class="my-10">
    <v-card rounded>
      <v-card-title class="pa-0">

        <v-app-bar color="primary" rounded>
          <div class="flex flex-column ma-5">
            <slot name="header"></slot>
          </div>

        </v-app-bar>
        </v-card-title>
      <v-card-text class="my-10">
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Section',

  components: {},
});
</script>

<style scoped>

</style>
