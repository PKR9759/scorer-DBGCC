"use client";

import React from 'react';
import { useCricket } from '../hooks/useCricket';

const PlayerInfo = () => {
  const { state } = useCricket();
  const currentInnings = state.currentInnings === 1 ? state.innings1 : state.innings2;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Current Players
      </h3>
      
      <div className="space-y-3">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-600">Batsman</div>
          <div className="font-semibold text-blue-800">
            {currentInnings.currentBatsman}
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-600">Bowler</div>
          <div className="font-semibold text-green-800">
            {currentInnings.currentBowler}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;

