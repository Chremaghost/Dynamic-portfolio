"use client";

import { useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, X } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  name: string;
  isProfilePhoto: boolean;
}

interface PhotoGalleryProps {
  isDark: boolean;
}

export function PhotoGallery({ isDark }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'profile-1.jpg',
      isProfilePhoto: true
    },
    {
      id: '2',
      url: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'profile-2.jpg',
      isProfilePhoto: false
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleUpload = () => {
    // Simuler l'upload d'une photo
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: `photo-${Date.now()}.jpg`,
      isProfilePhoto: false
    };
    setPhotos(prev => [...prev, newPhoto]);
  };

  const handleDelete = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleSetProfilePhoto = (id: string) => {
    setPhotos(prev => prev.map(p => ({
      ...p,
      isProfilePhoto: p.id === id
    })));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Galerie Photos
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gérez vos photos de profil et images d'identité
          </p>
        </div>
        <button
          onClick={handleUpload}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDark
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-[4px_4px_8px_#1f2937,-4px_-4px_8px_#374151]'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff]'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Photo</span>
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover:border-purple-500 cursor-pointer ${
          isDark
            ? 'border-gray-600 bg-gray-800/50'
            : 'border-gray-300 bg-gray-50'
        }`}
        onClick={handleUpload}
      >
        <ImageIcon className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <p className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Glissez vos photos ici ou cliquez pour sélectionner
        </p>
        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
          PNG, JPG, GIF jusqu'à 10MB
        </p>
      </div>

      {/* Photos Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-gray-800 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151]'
                : 'bg-gray-100 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]'
            }`}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.url}
              alt={photo.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetProfilePhoto(photo.id);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg font-medium transition-all duration-300 ${
                    photo.isProfilePhoto
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {photo.isProfilePhoto ? 'Photo profil' : 'Définir comme profil'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(photo.id);
                  }}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Photo Badge */}
            {photo.isProfilePhoto && (
              <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs rounded-md font-medium">
                Profil
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden ${
            isDark
              ? 'bg-gray-800 shadow-[16px_16px_32px_#1f2937,-16px_-16px_32px_#374151]'
              : 'bg-white shadow-[16px_16px_32px_#d1d5db,-16px_-16px_32px_#ffffff]'
          }`}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 hover:scale-110 z-10 ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              className="w-full h-full object-contain"
            />

            <div className={`absolute bottom-0 left-0 right-0 p-4 ${
              isDark
                ? 'bg-gray-900/90 backdrop-blur-md'
                : 'bg-white/90 backdrop-blur-md'
            }`}>
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {selectedPhoto.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-sm ${
                  selectedPhoto.isProfilePhoto
                    ? 'text-green-600'
                    : isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedPhoto.isProfilePhoto ? 'Photo de profil' : 'Image de galerie'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSetProfilePhoto(selectedPhoto.id)}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
                      selectedPhoto.isProfilePhoto
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : isDark
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={selectedPhoto.isProfilePhoto}
                  >
                    {selectedPhoto.isProfilePhoto ? 'Photo profil actuelle' : 'Définir comme profil'}
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(selectedPhoto.id);
                      setSelectedPhoto(null);
                    }}
                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}