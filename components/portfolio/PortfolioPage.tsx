"use client";

import { useState } from 'react';
import { Moon, Sun, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Download, ExternalLink, Calendar, Award } from 'lucide-react';
import { Profile, PortfolioLink } from '@/types/portfolio';
import { GlassCard } from '@/components/ui/GlassCard';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { ProjectCarousel } from '@/components/portfolio/ProjectCarousel';
import { ContactForm } from '@/components/portfolio/ContactForm';

interface PortfolioPageProps {
  portfolioLink: PortfolioLink;
  profile: Profile;
}

export function PortfolioPage({ portfolioLink, profile }: PortfolioPageProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const filteredProjects = profile.projects.filter(project => 
    project.category === portfolioLink.slug || project.featured
  );

  const socialLinks = [
    { icon: Github, url: profile.github, label: 'GitHub' },
    { icon: Linkedin, url: profile.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: profile.twitter, label: 'Twitter' },
    { icon: Instagram, url: profile.instagram, label: 'Instagram' },
    { icon: Globe, url: profile.website, label: 'Website' }
  ].filter(link => link.url);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex justify-between items-center p-4 rounded-2xl transition-all duration-300 ${
            isDark 
              ? 'bg-gray-800 shadow-[inset_8px_8px_16px_#1f2937,inset_-8px_-8px_16px_#374151]' 
              : 'bg-gray-100 shadow-[inset_8px_8px_16px_#d1d5db,inset_-8px_-8px_16px_#ffffff]'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${portfolioLink.color} shadow-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {portfolioLink.title}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {profile.name}
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-gray-800 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151] hover:shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
                  : 'bg-gray-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] hover:shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
              }`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className={`text-4xl lg:text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {profile.name}
                </h1>
                <h2 className={`text-xl lg:text-2xl mb-6 bg-gradient-to-r ${portfolioLink.color} bg-clip-text text-transparent font-semibold`}>
                  {profile.title}
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {profile.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                } shadow-lg`}>
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                } shadow-lg`}>
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                {profile.phone && (
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                  } shadow-lg`}>
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
                          : 'bg-white hover:bg-gray-50 text-gray-700 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
                      }`}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <div className={`relative p-2 rounded-3xl ${
                isDark
                  ? 'bg-gray-800 shadow-[16px_16px_32px_#1f2937,-16px_-16px_32px_#374151]'
                  : 'bg-gray-100 shadow-[16px_16px_32px_#d1d5db,-16px_-16px_32px_#ffffff]'
              }`}>
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-64 h-64 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Compétences
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(
              profile.skills.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {} as Record<string, typeof profile.skills>)
            ).map(([category, skills]) => (
              <GlassCard key={category} isDark={isDark} className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {category}
                </h3>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} isDark={isDark} />
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Expérience Professionnelle
          </h2>
          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <GlassCard key={exp.id} isDark={isDark} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {exp.title}
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      {exp.company}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exp.location}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 mt-2 md:mt-0 px-3 py-1 rounded-full text-sm ${
                    exp.current
                      ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                      : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(exp.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} - {
                        exp.current ? 'Présent' : new Date(exp.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
                      }
                    </span>
                  </div>
                </div>
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs rounded-full ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Formation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profile.education.map((edu) => (
              <GlassCard key={edu.id} isDark={isDark} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {edu.degree}
                    </h3>
                    <p className={`text-md ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      {edu.school}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {edu.location}
                    </p>
                  </div>
                  {edu.grade && (
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <Award className="w-3 h-3" />
                      <span>{edu.grade}</span>
                    </div>
                  )}
                </div>
                <div className={`flex items-center space-x-2 mb-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(edu.startDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} - {
                      new Date(edu.endDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
                    }
                  </span>
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {edu.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Langues
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.languages.map((language) => (
              <GlassCard key={language.id} isDark={isDark} className="p-4 text-center">
                <div className="text-3xl mb-2">{language.flag}</div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {language.name}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language.level}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Projets
          </h2>
          <ProjectCarousel projects={filteredProjects} isDark={isDark} />
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Contact
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <GlassCard isDark={isDark} className="p-8">
              <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Informations de Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <a href={`mailto:${profile.email}`} className={`hover:underline ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {profile.email}
                  </a>
                </div>
                {profile.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <a href={`tel:${profile.phone}`} className={`hover:underline ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {profile.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <MapPin className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    {profile.location}
                  </span>
                </div>
                {profile.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className={`hover:underline flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <span>{profile.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Réseaux Sociaux
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                          isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                        title={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlassCard>

            <ContactForm isDark={isDark} />
          </div>
        </section>
      </div>
    </div>
  );
}