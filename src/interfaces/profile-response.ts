import type { ResumeSchema } from "@/interfaces/resume";
import type { SiteMetaDataSchema } from "@/interfaces/site-meta-data";

export interface ProfileResponse {
  profile: ResumeSchema;
  siteMetaData: SiteMetaDataSchema;
}
