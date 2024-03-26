import { Project } from "@/interfaces/project";

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

interface WorkExperience {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

interface VolunteerExperience {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

interface Award {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

interface Certificate {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

interface Publication {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

interface Language {
  language: string;
  fluency: string;
}

interface Interest {
  name: string;
  keywords: string[];
}

interface Reference {
  name: string;
  reference: string;
}

interface Meta {
  canonical?: string;
  version?: string;
  lastModified?: string;
  [k: string]: unknown;
}

export interface ResumeSchema {
  $schema?: string;
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: Location;
    profiles: Profile[];
  };
  work: WorkExperience[];
  volunteer: VolunteerExperience[];
  education: Education[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
  meta: Meta;
}
