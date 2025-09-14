export interface PortfolioLink {
  id: string;
  title: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  projects: Project[];
  profileImage: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  category: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  grade?: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Natif';
  flag: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  image: string;
  featured: boolean;
}