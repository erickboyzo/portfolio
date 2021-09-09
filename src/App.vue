<template>
  <v-app id="portfolio">
    <Header/>
    <v-main >
      <v-container id="scrolling-techniques-7">

        <transition :name="transitionName">
          <router-view class="view"></router-view>
        </transition>
        <v-btn class="message-me"
               v-if="$route.name === 'Projects' || $route.name === 'About'"
               @click="$router.push('contact')"
               fixed
               color="accent"
               elevation="12"
               fab
               bottom
               icon
               right>
          <v-icon>mdi-email-send</v-icon>
        </v-btn>
      </v-container>
    </v-main>

   <Footer/>
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: { Footer, Header },
  data: () => ({
    transitionName: 'slide-left',
  }),
  watch: {
    $route: (to, from) => {
      if (to.meta.index > from.meta.index) {
        this.transitionName = to.meta.index === 2 ? 'slide' : 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    },
  },
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .75s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all .75s cubic-bezier(.55,0,.1,1);
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.message-me{
  bottom: 90px!important;
}
</style>
