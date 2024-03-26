import type { ResumeSchema } from "@/interfaces/resume";
import { defineStore } from "pinia";
import siteMetaData from "./site-meta-data";

export const resumeStore = defineStore("resumeStore", {
  state: () => ({
    gitConnectedProfile: "erickboyzo",
    metaData: siteMetaData,
    resumeData: {} as ResumeSchema,
  }),
  getters: {
    resume: (state) => state.resumeData,
    siteMetaData: (state) => state.metaData,
    gitConnectedProfileKey: (state) => state.gitConnectedProfile,
  },
});
