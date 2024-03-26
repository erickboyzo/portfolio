<template>
  <div class="dev-tags-title">
    <router-link class="home-link" to="/about" style="cursor: pointer"> <span class="open-tag">&#60;</span>{{ title }}<span class="close close-tag">&#47;</span><span class="close-tag">&#62;</span> </router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
@import "node_modules/vuetify/styles";
@import "node_modules/vuetify/settings";

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  .dev-tags-title {
    font-size: 24px !important;
  }
}

.dev-tags-title > a {
  text-decoration: none !important;
  color: rgb(var(--v-text-base));
}

.dev-tags-title {
  font-size: 35px;
  font-weight: 400;
  font-style: italic;
}

.open-tag,
.close-tag {
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  font-size: 1.2em;
}

.close.close-tag {
  font-weight: bold;
  font-size: 1em;
  padding-right: 2px;
}
</style>
