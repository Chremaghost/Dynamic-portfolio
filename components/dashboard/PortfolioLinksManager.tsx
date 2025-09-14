"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Link as LinkIcon, Eye, EyeOff } from 'lucide-react';
import { PortfolioLink } from '@/types/portfolio';

interface PortfolioLinksManagerProps {
  isDark: boolean;
}

export function PortfolioLinksManager({ isDark }: PortfolioLinksManagerProps) {
  const [portfolioLinks, setPortfolioLinks] = useState<PortfolioLink[]>([
    {
      id: '1',
      title: 'Développement Web',
      slug: 'dev-web',
      description: 'Applications web modernes et responsive',
      color: 'from-blue-400 to-blue-600',
      icon: 'Code',
      isActive: true,
      order: 1
    },
    {
      id: '2',
      title: 'Game Development',
      slug: 'game-dev',
      description: 'Création de jeux vidéo et expériences interactives',
      color: 'from-purple-400 to-purple-600',
      icon: 'Gamepad2',
      isActive: true,
      order: 2
    },
    {
      id: '3',
      title: 'Cybersecurity Analyst',
      slug: 'cybersec',
      description: 'Sécurité informatique et analyse des menaces',
      color: 'from-red-400 to-red-600',
      icon: 'Shield',
      isActive: true,
      order: 3
    }
  ]);

  const [editingLink, setEditingLink] = useState<PortfolioLink | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSaveLink = (linkData: Partial<PortfolioLink>) => {
    if (editingLink) {
      setPortfolioLinks(prev => prev.map(link => 
        link.id === editingLink.id 
          ? { ...link, ...linkData }
          : link
      ));
    } else {
      const newLink: PortfolioLink = {
        id: Date.now().toString(),
        title: '',
        slug: '',
        description: '',
        color: 'from-gray-400 to-gray-600',
        icon: 'Briefcase',
        isActive: true,
        order: portfolioLinks.length + 1,
        ...linkData
      } as PortfolioLink;
      setPortfolioLinks(prev => [...prev, newLink]);
    }
    setEditingLink(null);
    setShowForm(false);
  };

  const handleDeleteLink = (id: string) => {
    setPortfolioLinks(prev => prev.filter(link => link.id !== id));
  };

  const toggleLinkStatus = (id: string) => {
    setPortfolioLinks(prev => prev.map(link => 
      link.id === id 
        ? { ...link, isActive: !link.isActive }
        : link
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Liens Portfolio
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gérez les sections de votre portfolio public
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Lien</span>
        </button>
      </div>

      {(showForm || editingLink) && (
        <LinkForm
          isDark={isDark}
          link={editingLink}
          onSave={handleSaveLink}
          onCancel={() => {
            setShowForm(false);
            setEditingLink(null);
          }}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioLinks
          .sort((a, b) => a.order - b.order)
          .map((link) => (
            <div
              key={link.id}
              className={`group relative p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
                isDark
                  ? 'bg-gray-800 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]'
                  : 'bg-gray-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
              } ${!link.isActive ? 'opacity-60' : ''}`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} shadow-lg`}>
                    <LinkIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleLinkStatus(link.id)}
                      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                        link.isActive
                          ? isDark
                            ? 'bg-green-600/80 hover:bg-green-600 text-white'
                            : 'bg-green-600/80 hover:bg-green-600 text-white'
                          : isDark
                            ? 'bg-gray-600/80 hover:bg-gray-600 text-white'
                            : 'bg-gray-600/80 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {link.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setEditingLink(link)}
                      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'bg-blue-600/80 hover:bg-blue-600 text-white'
                          : 'bg-blue-600/80 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'bg-red-600/80 hover:bg-red-600 text-white'
                          : 'bg-red-600/80 hover:bg-red-600 text-white'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {link.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {link.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    /{link.slug}
                  </span>
                  
                  <a
                    href={`/portfolio/${link.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Voir Portfolio
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

interface LinkFormProps {
  isDark: boolean;
  link: PortfolioLink | null;
  onSave: (link: Partial<PortfolioLink>) => void;
  onCancel: () => void;
}

function LinkForm({ isDark, link, onSave, onCancel }: LinkFormProps) {
  const [formData, setFormData] = useState({
    title: link?.title || '',
    slug: link?.slug || '',
    description: link?.description || '',
    color: link?.color || 'from-blue-400 to-blue-600',
    icon: link?.icon || 'Briefcase'
  });

  const colorOptions = [
    { value: 'from-blue-400 to-blue-600', label: 'Bleu' },
    { value: 'from-purple-400 to-purple-600', label: 'Violet' },
    { value: 'from-red-400 to-red-600', label: 'Rouge' },
    { value: 'from-green-400 to-green-600', label: 'Vert' },
    { value: 'from-yellow-400 to-yellow-600', label: 'Jaune' },
    { value: 'from-pink-400 to-pink-600', label: 'Rose' },
    { value: 'from-indigo-400 to-indigo-600', label: 'Indigo' },
    { value: 'from-teal-400 to-teal-600', label: 'Teal' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    onSave({
      ...formData,
      slug
    });
  };

  return (
    <div className={`p-8 rounded-2xl transition-all duration-300 ${
      isDark
        ? 'bg-gray-700 shadow-[inset_4px_4px_8px_#1f2937,inset_-4px_-4px_8px_#374151]'
        : 'bg-gray-200 shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]'
    }`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {link ? 'Modifier le Lien' : 'Nouveau Lien Portfolio'}
        </h3>
        <button
          onClick={onCancel}
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            isDark
              ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
              : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Titre du Portfolio
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Slug URL (optionnel)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="Généré automatiquement si vide"
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-gray-800 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Couleur du thème
            </label>
            <select
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              rows={6}
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg font-medium transition-all duration-300 hover:scale-[0.98] ${
              isDark
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{link ? 'Mettre à jour' : 'Créer le lien'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}