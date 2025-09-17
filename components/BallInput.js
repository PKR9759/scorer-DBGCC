"use client";

import React from 'react';
import { useCricket } from '../hooks/useCricket';

// No Ball Secondary Input
const NoBallInput = () => {
  const { dispatch } = useCricket();

  const handleNoBallInput = (touchedBat) => {
    dispatch({
      type: 'ADD_DELIVERY',
      payload: {
        type: 'noball',
        runs: touchedBat ? 1 : 0,
        isExtra: true
      }
    });
  };

  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold text-yellow-800 mb-3 text-center">
        No Ball - Did the ball touch the bat?
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleNoBallInput(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Yes (+1 run)
        </button>
        <button
          onClick={() => handleNoBallInput(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          No (0 runs)
        </button>
      </div>
    </div>
  );
};

// Ball Input Component
const BallInput = () => {
  const { state, dispatch } = useCricket();

  if (state.secondaryInput === 'noball') {
    return <NoBallInput />;
  }

  const handleDelivery = (type, runs = 0, isWicket = false, isExtra = false) => {
    if (type === 'noball') {
      dispatch({ type: 'SET_SECONDARY_INPUT', payload: 'noball' });
      return;
    }

    dispatch({
      type: 'ADD_DELIVERY',
      payload: { type, runs, isWicket, isExtra }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Record Delivery
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => handleDelivery('dot', 0)}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          0 Runs
        </button>
        <button
          onClick={() => handleDelivery('single', 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          1 Run
        </button>
        <button
          onClick={() => handleDelivery('wicket', 0, true)}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Wicket
        </button>
        <button
          onClick={() => handleDelivery('noball')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          No Ball
        </button>
      </div>
      
      <button
        onClick={() => handleDelivery('wide', 0, false, true)}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        Wide Ball
      </button>
    </div>
  );
};

export default BallInput;
