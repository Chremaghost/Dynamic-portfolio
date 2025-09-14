"use client";

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface ContactFormProps {
  isDark: boolean;
}

export function ContactForm({ isDark }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pourriez intégrer avec un service d'email comme EmailJS
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <GlassCard isDark={isDark} className="p-8 text-center">
        <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Message envoyé !
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Merci pour votre message. Je vous répondrai dans les plus brefs délais.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard isDark={isDark} className="p-8">
      <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Envoyez-moi un message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Nom *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800/50 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white/50 text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800/50 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                  : 'bg-white/50 text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
              }`}
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Sujet *
          </label>
          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-0 outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'bg-gray-800/50 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                : 'bg-white/50 text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
            }`}
            placeholder="Sujet de votre message"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Message *
          </label>
          <textarea
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-0 outline-none resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'bg-gray-800/50 text-white placeholder-gray-500 shadow-[inset_2px_2px_4px_#1f2937,inset_-2px_-2px_4px_#374151]'
                : 'bg-white/50 text-gray-900 placeholder-gray-400 shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]'
            }`}
            placeholder="Votre message..."
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
          <Send className="w-4 h-4" />
          <span>Envoyer le message</span>
        </button>
      </form>
    </GlassCard>
  );
}