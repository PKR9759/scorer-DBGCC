"use client";

import React from 'react';
import { useCricket } from '../hooks/useCricket';
import { ChevronLeft } from 'lucide-react';
import BatsmanScorecard from './BatsmanScorecard';
import BowlerScorecard from './BowlerScorecard';

const Scorecard = () => {
    const { state, dispatch } = useCricket();

    const innings1 = state.innings1;
    const innings2 = state.innings2;

    const handleGoBack = () => {
        dispatch({ type: 'GO_BACK_TO_GAME' });
    };

    const renderInningsSummary = (inningsData, inningsNumber, playersCount) => (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {inningsData.battingTeam} Innings
            </h3>
            <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-700">
                    {inningsData.score.runs}/{inningsData.score.wickets}
                </span>
                <span className="text-sm text-gray-500">
                    ({inningsData.score.overs}.{inningsData.score.balls} overs)
                </span>
            </div>
            <p className="text-sm text-gray-600">
                vs {inningsData.bowlingTeam}
            </p>
            <hr className="my-3 border-gray-200" />
            
            <BatsmanScorecard inningsData={inningsData} teamPlayersCount={playersCount} />
            <BowlerScorecard inningsData={inningsData} />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to Match
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Scorecard</h1>
                </div>

                <div className="space-y-6">
                    {renderInningsSummary(innings1, 1, state.matchSetup.playersTeamA)}
                    {state.currentInnings > 1 && renderInningsSummary(innings2, 2, state.matchSetup.playersTeamB)}
                </div>
            </div>
        </div>
    );
};

export default Scorecard;