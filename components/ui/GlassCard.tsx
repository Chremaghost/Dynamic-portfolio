"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  isDark: boolean;
  className?: string;
}

export function GlassCard({ children, isDark, className }: GlassCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]",
      isDark
        ? "bg-gray-800/50 shadow-[8px_8px_16px_#1f2937,-8px_-8px_16px_#374151] backdrop-blur-md border border-white/10"
        : "bg-white/50 shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff] backdrop-blur-md border border-black/5",
      className
    )}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}