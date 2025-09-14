"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { GlassCard } from '@/components/ui/GlassCard';

interface ProjectCarouselProps {
  projects: Project[];
  isDark: boolean;
}

export function ProjectCarousel({ projects, isDark }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return (
      <GlassCard isDark={isDark} className="p-8 text-center">
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Aucun projet disponible pour cette section.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div key={project.id} className="w-full flex-shrink-0">
              <GlassCard isDark={isDark} className="mx-2">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 text-sm rounded-full ${
                            isDark
                              ? 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
                              : 'bg-gray-200/80 text-gray-700 border border-gray-300/50'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4 pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                            isDark
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {projects.length > 1 && (
        <>
          <button
            onClick={prevProject}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
              isDark
                ? 'bg-gray-800/80 hover:bg-gray-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
                : 'bg-white/80 hover:bg-gray-100 text-gray-700 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextProject}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 ${
              isDark
                ? 'bg-gray-800/80 hover:bg-gray-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
                : 'bg-white/80 hover:bg-gray-100 text-gray-700 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? isDark ? 'bg-white' : 'bg-gray-800'
                    : isDark ? 'bg-gray-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}