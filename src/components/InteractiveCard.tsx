'use client'

import React, { useState } from 'react';

export default function InteractiveCard({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`w-64 h-[300px] ${isHovered ? 'shadow-2xl bg-neutral-200' : 'shadow-lg bg-white'} rounded-lg transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}