"use client";

import { useState } from 'react';
import { Moon, Sun, User, Briefcase, Shield, Camera, Settings, Plus, Github, ExternalLink } from 'lucide-react';
import { ProfileEditor } from '@/components/dashboard/ProfileEditor';
import { ProjectManager } from '@/components/dashboard/ProjectManager';
import { PhotoGallery } from '@/components/dashboard/PhotoGallery';
import { PortfolioLinksManager } from '@/components/dashboard/PortfolioLinksManager';

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const portfolioLinks = [
    { id: 'dev_web', title: 'Développement Web', icon: Briefcase, color: 'from-blue-400 to-blue-600' },
    { id: 'game_dev', title: 'Game Development', icon: Settings, color: 'from-purple-400 to-purple-600' },
    { id: 'cybersec', title: 'Cybersecurity Analyst', icon: Shield, color: 'from-red-400 to-red-600' }
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

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
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Portfolio Dashboard
            </h1>
            
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
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <nav className="space-y-4">
              <div className={`p-6 rounded-2xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]' 
                  : 'bg-gray-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
              }`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Sections Portfolio
                </h2>
                <div className="space-y-3">
                  {portfolioLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={link.id}
                        className={`w-full p-3 rounded-xl transition-all duration-300 group hover:scale-[0.98] ${
                          isDark
                            ? 'bg-gray-700 shadow-[inset_4px_4px_8px_#1f2937,inset_-4px_-4px_8px_#374151] hover:shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                            : 'bg-gray-200 shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${link.color} shadow-lg`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                            {link.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`p-6 rounded-2xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]' 
                  : 'bg-gray-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
              }`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Gestion
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'profile', title: 'Profil', icon: User },
                    { id: 'projects', title: 'Projets', icon: Briefcase },
                    { id: 'gallery', title: 'Galerie', icon: Camera },
                    { id: 'portfolio-links', title: 'Liens Portfolio', icon: Settings }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full p-3 rounded-xl transition-all duration-300 group hover:scale-[0.98] ${
                          activeSection === item.id
                            ? isDark
                              ? 'bg-gray-700 shadow-[inset_4px_4px_8px_#1f2937,inset_-4px_-4px_8px_#374151]'
                              : 'bg-gray-200 shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]'
                            : isDark
                              ? 'bg-gray-800 shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151] hover:shadow-[2px_2px_4px_#1f2937,-2px_-2px_4px_#374151]'
                              : 'bg-gray-100 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-5 h-5 ${
                            activeSection === item.id
                              ? isDark ? 'text-blue-400' : 'text-blue-600'
                              : isDark ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                          <span className={`text-sm font-medium ${
                            activeSection === item.id
                              ? isDark ? 'text-blue-400' : 'text-blue-600'
                              : isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {item.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          <div className="lg:col-span-3">
            <div className={`p-8 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]' 
                : 'bg-gray-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
            }`}>
              {activeSection === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      Bienvenue sur votre Dashboard
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Gérez votre portfolio professionnel depuis cette interface.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: 'Projets', value: '12', change: '+3 ce mois' },
                      { title: 'Vues Portfolio', value: '1,284', change: '+15%' },
                      { title: 'Messages', value: '8', change: '2 non lus' }
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl transition-all duration-300 ${
                          isDark
                            ? 'bg-gray-700 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                            : 'bg-gray-200 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
                        }`}
                      >
                        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {stat.title}
                        </h3>
                        <div className="mt-2">
                          <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {stat.value}
                          </span>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      Actions Rapides
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setActiveSection('projects')}
                        className={`p-4 rounded-xl transition-all duration-300 hover:scale-[0.98] ${
                          isDark
                            ? 'bg-gray-800 shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151] hover:shadow-[2px_2px_4px_#1f2937,-2px_-2px_4px_#374151]'
                            : 'bg-gray-100 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Plus className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                            Ajouter un projet
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => setActiveSection('profile')}
                        className={`p-4 rounded-xl transition-all duration-300 hover:scale-[0.98] ${
                          isDark
                            ? 'bg-gray-800 shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151] hover:shadow-[2px_2px_4px_#1f2937,-2px_-2px_4px_#374151]'
                            : 'bg-gray-100 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <User className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                          <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                            Modifier le profil
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'profile' && <ProfileEditor isDark={isDark} />}
              {activeSection === 'projects' && <ProjectManager isDark={isDark} />}
              {activeSection === 'gallery' && <PhotoGallery isDark={isDark} />}
              {activeSection === 'portfolio-links' && <PortfolioLinksManager isDark={isDark} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}