import { defineStore } from 'pinia';
import axios from 'axios';

import type { ResumeSchema } from '@/interfaces/resume';
import type { SiteMetaDataSchema } from '@/interfaces/site-meta-data';

export const useResumeStore = defineStore('resumeStore', {
  state: () => ({
    gitConnectedProfile: 'erickboyzo',
    metaData: {} as SiteMetaDataSchema,
    resumeData: {} as ResumeSchema,
    loading: true,
    apiError: false,
  }),
  getters: {
    resume: (state) => state.resumeData,
    siteMetaData: (state) => state.metaData,
    gitConnectedProfileKey: (state) => state.gitConnectedProfile,
    isLoading: (state) => state.loading,
    hasApiError: (state) => state.apiError,
  },
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
    setApiError(value: boolean) {
      this.apiError = value;
    },
    async fetchProfile() {
      this.setLoading(true);
      this.setApiError(false);

      try {
        const response = await axios.post(
          'portfolio',
          { gitConnectedProfileKey: this.gitConnectedProfile },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { profile, siteMetaData } = response.data;
        this.$patch((state) => {
          state.resumeData = profile;
          state.metaData = siteMetaData;
        });
        this.setLoading(false);
      } catch {
        this.setApiError(true);
        this.setLoading(false);
      }
    },
  },
});
