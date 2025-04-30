interface Messages {
  success: string;
  delivered: string;
  emailErrorMessage: string;
  emailErrorTitle: string;
}

interface Navigation {
  contactMe: string;
  viewProjects: string;
  projects: string;
  aboutMe: string;
}

interface Sections {
  aboutPersonalDetails: string;
  devExperienceTitle: string;
  devExperienceSubTitle: string;
  techSkills: string;
  techSkillsSubTitle: string;
}

interface Actions {
  showMore: string;
  showLess: string;
  viewSource: string;
  viewSourceLabel: string;
  goToApp: string;
  goToAppLabel: string;
  sendMessage: string;
}

interface Content {
  description: string;
  projectTags: string;
  greeting: string;
  greetingIntro: string;
  title: string;
  contactMeMessage: string;
  aboutContactText: string;
}

interface ProfessionalSkill {
  icon: string;
  label: string;
  text: string;
  experience: number;
}

export interface SiteMetaDataSchema {
  messages: Messages;
  navigation: Navigation;
  sections: Sections;
  actions: Actions;
  content: Content;
  professionalSkills: ProfessionalSkill[];
  defaultImages: string[];
}
