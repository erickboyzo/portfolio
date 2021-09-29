import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: '#2980B9',
        accent: '#F1C40F',
        secondary: '#3498DB',
        success: '#2ECC71',
        info: '#2196F3',
        warning: '#F39C12',
        error: '#E74C3C',
      },
      light: {
        primary: '#2980B9',
        accent: '#F1C40F',
        secondary: '#3498DB',
        success: '#2ECC71',
        info: '#2196F3',
        warning: '#F39C12',
        error: '#E74C3C',
      },
    },
  },
});
