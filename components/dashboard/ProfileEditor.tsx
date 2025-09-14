"use client";

import { useState } from "react";
import {
  Save,
  User,
  Mail,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import type { Profile } from "@/types/portfolio";

interface ProfileEditorProps {
  isDark: boolean;
}

export function ProfileEditor({ isDark }: ProfileEditorProps) {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    title: "",
    bio: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    skills: [],
    experience: [],
    education: [],
    languages: [],
    projects: [],
    profileImage: "",
  });

  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);

  const handleSave = () => {
    setSavedProfile(profile);
  };

  const sections = [
    {
      title: "Informations Personnelles",
      fields: [
        { key: "name", label: "Nom complet", type: "text", icon: User },
        { key: "title", label: "Titre professionnel", type: "text", icon: User },
        { key: "location", label: "Localisation", type: "text", icon: MapPin },
        { key: "email", label: "Email", type: "email", icon: Mail },
      ],
    },
    {
      title: "Réseaux Sociaux",
      fields: [
        { key: "website", label: "Site web", type: "url", icon: Globe },
        { key: "github", label: "GitHub", type: "url", icon: Github },
        { key: "linkedin", label: "LinkedIn", type: "url", icon: Linkedin },
        { key: "twitter", label: "Twitter", type: "url", icon: Twitter },
      ],
    },
  ];

  const textAreas = [
    { key: "bio", label: "Biographie", placeholder: "Décrivez-vous..." },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Éditeur de Profil
        </h2>
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]"
          }`}
        >
          <Save className="w-4 h-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      {savedProfile && (
        <div
          className={`p-4 rounded-xl ${
            isDark
              ? "bg-green-900/20 border border-green-800"
              : "bg-green-100 border border-green-300"
          }`}
        >
          <p
            className={`text-sm ${
              isDark ? "text-green-400" : "text-green-800"
            }`}
          >
            ✓ Profil sauvegardé avec succès !
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`p-6 rounded-xl transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]"
                  : "bg-gray-200 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.fields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.key} className="space-y-2">
                      <label
                        className={`text-sm font-medium flex items-center space-x-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{field.label}</span>
                      </label>
                      <input
                        type={field.type}
                        value={profile[field.key as keyof Profile] as string}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                          isDark
                            ? "bg-gray-800 text-white shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]"
                            : "bg-white text-gray-900 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {textAreas.map((field) => (
            <div
              key={field.key}
              className={`p-6 rounded-xl transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]"
                  : "bg-gray-200 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
              }`}
            >
              <label
                className={`block text-sm font-medium mb-3 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {field.label}
              </label>
              <textarea
                rows={6}
                value={profile[field.key as keyof Profile] as string}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                placeholder={field.placeholder}
                className={`w-full p-3 rounded-lg border-0 outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-800 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]"
                    : "bg-white text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
