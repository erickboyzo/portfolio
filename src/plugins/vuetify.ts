import { createVuetify, type VuetifyOptions } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

let vuetifyConfig: VuetifyOptions = {
  // Theme
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: "#2980B9",
          accent: "#F1C40F",
          secondary: "#E67E22",
          success: "#2ECC71",
          info: "#2196F3",
          warning: "#F39C12",
          error: "#E74C3C",
          background: "#121212",
          surface: "#1E1E1E",
          text: "#FFFFFF",
        },
      },
      light: {
        dark: false,
        colors: {
          primary: "#094067",
          accent: "#F1C40F",
          secondary: "#4ECDC4",
          success: "#2ECC71",
          info: "#2196F3",
          warning: "#F39C12",
          error: "#E74C3C",
          background: "#fffffe",
          surface: "#F4F4F4",
          text: "#000000",
        },
      },
    },
    defaultTheme: "dark",
  },
};

if (import.meta.env.DEV) {
  // Disable treeshaking for DEV mode.
  vuetifyConfig = {
    components: { components },
    directives,
    ...vuetifyConfig,
  };
}
export default createVuetify(vuetifyConfig);

// Export for test.
export { components, directives };
