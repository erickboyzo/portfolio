import { defineStore } from 'pinia';

import type { ResumeSchema } from '@/interfaces/resume';
import type { SiteMetaDataSchema } from '@/interfaces/site-meta-data';

export const useResumeStore = defineStore('resumeStore', {
  state: () => ({
    gitConnectedProfile: 'erickboyzo',
    metaData: {} as SiteMetaDataSchema,
    resumeData: {} as ResumeSchema,
  }),
  getters: {
    resume: (state) => state.resumeData,
    siteMetaData: (state) => state.metaData,
    gitConnectedProfileKey: (state) => state.gitConnectedProfile,
  },
});
