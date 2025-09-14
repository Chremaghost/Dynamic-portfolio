import { notFound } from 'next/navigation';
import { PortfolioPage } from '@/components/portfolio/PortfolioPage';

const portfolioLinks = [
  {
    id: '1',
    title: 'Développement Web',
    slug: 'dev-web',
    description: 'Applications web modernes et responsive',
    color: 'from-blue-400 to-blue-600',
    isActive: true
  },
  {
    id: '2',
    title: 'Game Development',
    slug: 'game-dev',
    description: 'Création de jeux vidéo et expériences interactives',
    color: 'from-purple-400 to-purple-600',
    isActive: true
  },
  {
    id: '3',
    title: 'Cybersecurity Analyst',
    slug: 'cybersec',
    description: 'Sécurité informatique et analyse des menaces',
    color: 'from-red-400 to-red-600',
    isActive: true
  }
];

const mockProfile = {
  name: 'John Doe',
  title: 'Développeur Full Stack & Analyste Cybersécurité',
  bio: 'Passionné par la technologie et l\'innovation, je développe des solutions web modernes tout en assurant leur sécurité. Mon expertise couvre le développement full-stack, la création de jeux vidéo et l\'analyse de sécurité informatique.',
  location: 'Paris, France',
  email: 'john.doe@example.com',
  phone: '+33 1 23 45 67 89',
  website: 'https://johndoe.dev',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  twitter: 'https://twitter.com/johndoe',
  instagram: 'https://instagram.com/johndoe',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
  skills: [
    { id: '1', name: 'React', level: 'Expert' as const, category: 'Frontend' },
    { id: '2', name: 'Node.js', level: 'Avancé' as const, category: 'Backend' },
    { id: '3', name: 'TypeScript', level: 'Avancé' as const, category: 'Langage' },
    { id: '4', name: 'Python', level: 'Avancé' as const, category: 'Langage' },
    { id: '5', name: 'Cybersécurité', level: 'Expert' as const, category: 'Sécurité' },
    { id: '6', name: 'Unity', level: 'Intermédiaire' as const, category: 'Game Dev' }
  ],
  experience: [
    {
      id: '1',
      title: 'Développeur Full Stack Senior',
      company: 'TechCorp',
      location: 'Paris, France',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Développement d\'applications web complexes avec React et Node.js. Mise en place d\'architectures scalables et sécurisées.',
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB']
    },
    {
      id: '2',
      title: 'Analyste Cybersécurité',
      company: 'SecureIT',
      location: 'Lyon, France',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: 'Analyse des vulnérabilités, tests de pénétration et mise en place de politiques de sécurité.',
      technologies: ['Kali Linux', 'Metasploit', 'Wireshark', 'Python']
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Master en Cybersécurité',
      school: 'École Supérieure d\'Informatique',
      location: 'Paris, France',
      startDate: '2018-09',
      endDate: '2020-06',
      description: 'Spécialisation en sécurité des systèmes d\'information et cryptographie.',
      grade: 'Mention Très Bien'
    },
    {
      id: '2',
      degree: 'Licence Informatique',
      school: 'Université de Technologie',
      location: 'Lyon, France',
      startDate: '2015-09',
      endDate: '2018-06',
      description: 'Formation générale en informatique avec spécialisation développement.',
      grade: 'Mention Bien'
    }
  ],
  languages: [
    { id: '1', name: 'Français', level: 'Natif' as const, flag: '🇫🇷' },
    { id: '2', name: 'Anglais', level: 'C1' as const, flag: '🇬🇧' },
    { id: '3', name: 'Espagnol', level: 'B2' as const, flag: '🇪🇸' },
    { id: '4', name: 'Allemand', level: 'A2' as const, flag: '🇩🇪' }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Plateforme e-commerce complète avec paiement sécurisé',
      category: 'dev-web',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '2',
      title: 'Security Audit Tool',
      description: 'Outil d\'audit de sécurité automatisé pour applications web',
      category: 'cybersec',
      githubUrl: 'https://github.com/johndoe/security-audit',
      liveUrl: '',
      technologies: ['Python', 'Flask', 'SQLite', 'Nmap'],
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    }
  ]
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Portfolio({ params }: PageProps) {
  const portfolioLink = portfolioLinks.find(link => link.slug === params.slug);
  
  if (!portfolioLink || !portfolioLink.isActive) {
    notFound();
  }

  return (
    <PortfolioPage 
      portfolioLink={portfolioLink}
      profile={mockProfile}
    />
  );
}

export async function generateStaticParams() {
  return portfolioLinks
    .filter(link => link.isActive)
    .map((link) => ({
      slug: link.slug,
    }));
}