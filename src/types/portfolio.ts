export interface Social {
  id: string;
  title: string;
  link: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  url: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  dates: string;
  type: string;
  position: string;
  bullets: string[];
}

export interface Education {
  id: string;
  name: string;
  dates: string;
  note: string;
}

export interface Resume {
  tagline: string;
  description: string;
  experiences: Experience[];
  /** An array since 4.0: the single-object shape could only hold one school. */
  education: Education[];
  /** Awards and certifications. */
  others: string[];
}

export interface Portfolio {
  name: string;
  headerTaglineOne: string;
  headerTaglineTwo: string;
  headerTaglineThree: string;
  headerTaglineFour: string;
  showCursor: boolean;
  showBlog: boolean;
  darkMode: boolean;
  showResume: boolean;
  socials: Social[];
  projects: Project[];
  services: Service[];
  aboutpara: string;
  resume: Resume;
}
