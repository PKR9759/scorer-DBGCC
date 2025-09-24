// File: app/page.js

"use client";

import React, { useEffect } from 'react';
import CricketApp from '../components/CricketApp';

export default function Home() {
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // This will always show a confirmation dialog on refresh.
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <CricketApp />;
}