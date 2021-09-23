<template>
  <div class="my-10">
    <v-card rounded elevation="8" :loading="loading" :disabled="loading">
      <v-card-title class="pa-0">
        <v-toolbar elevation="2" flat height="auto" v-bind:class="{ 'mt-1' : loading }"
                   rounded class="card-header white--text rounded-b-0" color="primary">
          <div class="flex flex-column ma-5">
            <slot name="header"></slot>
          </div>
        </v-toolbar>
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
  props: ['loading'],
  components: {},
});
</script>

<style lang="scss" scoped>
</style>
