"use client";

import { Skill } from '@/types/portfolio';

interface SkillBadgeProps {
  skill: Skill;
  isDark: boolean;
}

export function SkillBadge({ skill, isDark }: SkillBadgeProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return isDark ? 'bg-red-900/30 text-red-400 border-red-500/30' : 'bg-red-100 text-red-800 border-red-300';
      case 'Intermédiaire':
        return isDark ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Avancé':
        return isDark ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Expert':
        return isDark ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-300';
      default:
        return isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-200 text-gray-700 border-gray-300';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'Débutant': return 'w-1/4';
      case 'Intermédiaire': return 'w-2/4';
      case 'Avancé': return 'w-3/4';
      case 'Expert': return 'w-full';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {skill.name}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full border ${getLevelColor(skill.level)}`}>
          {skill.level}
        </span>
      </div>
      <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            skill.level === 'Expert' ? 'bg-gradient-to-r from-green-400 to-green-600' :
            skill.level === 'Avancé' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
            skill.level === 'Intermédiaire' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
            'bg-gradient-to-r from-red-400 to-red-600'
          } ${getLevelWidth(skill.level)}`}
        />
      </div>
    </div>
  );
}