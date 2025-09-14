"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, Github, ExternalLink, Save, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'dev_web' | 'game_dev' | 'cybersec';
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  image: string;
}

interface ProjectManagerProps {
  isDark: boolean;
}

export function ProjectManager({ isDark }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Portfolio E-commerce',
      description: 'Site e-commerce moderne avec React et Node.js',
      category: 'dev_web',
      githubUrl: 'https://github.com/user/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { value: 'dev_web', label: 'Développement Web' },
    { value: 'game_dev', label: 'Game Development' },
    { value: 'cybersec', label: 'Cybersecurity' }
  ];

  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      setProjects(prev => prev.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...projectData }
          : p
      ));
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: '',
        description: '',
        category: 'dev_web',
        githubUrl: '',
        liveUrl: '',
        technologies: [],
        image: '',
        ...projectData
      } as Project;
      setProjects(prev => [...prev, newProject]);
    }
    setEditingProject(null);
    setShowForm(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Gestionnaire de Projets
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Project Form */}
      {(showForm || editingProject) && (
        <ProjectForm
          isDark={isDark}
          project={editingProject}
          categories={categories}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
              isDark
                ? 'bg-gray-800/50 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151] backdrop-blur-md border border-white/10'
                : 'bg-white/50 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] backdrop-blur-md border border-black/5'
            }`}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm" />
            
            <div className="relative p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <h3 className={`text-lg font-semibold line-clamp-2 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>
                </div>
                
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingProject(project)}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDark
                        ? 'bg-blue-600/80 hover:bg-blue-600 text-white'
                        : 'bg-blue-600/80 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
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

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-md ${
                      isDark
                        ? 'bg-gray-700/80 text-gray-300'
                        : 'bg-gray-200/80 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  project.category === 'dev_web'
                    ? 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
                    : project.category === 'game_dev'
                    ? 'bg-purple-500/20 text-purple-600 border border-purple-500/30'
                    : 'bg-red-500/20 text-red-600 border border-red-500/30'
                }`}>
                  {categories.find(c => c.value === project.category)?.label}
                </span>

                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'bg-gray-700/80 hover:bg-gray-700 text-gray-300'
                          : 'bg-gray-200/80 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                        isDark
                          ? 'bg-gray-700/80 hover:bg-gray-700 text-gray-300'
                          : 'bg-gray-200/80 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProjectFormProps {
  isDark: boolean;
  project: Project | null;
  categories: Array<{ value: string; label: string }>;
  onSave: (project: Partial<Project>) => void;
  onCancel: () => void;
}

function ProjectForm({ isDark, project, categories, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || 'dev_web',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    technologies: project?.technologies?.join(', ') || '',
    image: project?.image || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
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
          {project ? 'Modifier le Projet' : 'Nouveau Projet'}
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
              Titre du projet
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Lien GitHub
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Lien Live
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Technologies (séparées par des virgules)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
              placeholder="React, Node.js, MongoDB"
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
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
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{project ? 'Mettre à jour' : 'Créer le projet'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}