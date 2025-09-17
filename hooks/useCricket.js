"use client";

import { useContext } from 'react';
import { CricketContext } from '../context/CricketContext';

// Hook to use cricket context
export const useCricket = () => {
  const context = useContext(CricketContext);
  if (!context) {
    throw new Error('useCricket must be used within CricketProvider');
  }
  return context;
};

