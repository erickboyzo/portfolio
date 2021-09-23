<template>
  <div>
    <v-btn class="icon-link" v-for="(button, index) of $Constants.SOCIAL_ICONS"
           v-bind:key="index"
           icon x-large :href="button.link" target="_blank"><i :class="button.icon"></i></v-btn>
  </div>
</template>

<script>
export default {
  name: 'IconLinks',
};
</script>

<style lang="scss" scoped>
.icon-link {
  i {
    font-size: 28px;
  }
}
</style>
