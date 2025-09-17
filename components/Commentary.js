"use client";

import React from 'react';
import { useCricket } from '../hooks/useCricket';


// ... existing code ...

const Commentary = () => {
  const { state } = useCricket();
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;
  const { ballCommentary } = currentInnings;

  if (ballCommentary.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ball-by-Ball Commentary</h3>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {ballCommentary.slice(0, 10).map((comment, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-sm ${
             
                 'bg-gray-50 text-gray-700'
            }`}
          >
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Commentary;