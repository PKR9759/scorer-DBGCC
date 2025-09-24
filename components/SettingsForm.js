// File: components/SettingsForm.js

"use client";

import React, { useState } from 'react';
import { useCricket } from '../hooks/useCricket';
import { CheckCircle, XCircle } from 'lucide-react';

const SettingsForm = () => {
    const { state, dispatch } = useCricket();
    const [setup, setSetup] = useState({
        totalOvers: state.matchSetup.totalOvers,
        playersTeamA: state.matchSetup.playersTeamA,
        playersTeamB: state.matchSetup.playersTeamB
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'UPDATE_MATCH_SETUP',
            payload: {
                totalOvers: parseInt(setup.totalOvers),
                playersTeamA: parseInt(setup.playersTeamA),
                playersTeamB: parseInt(setup.playersTeamB),
            },
        });
    };

    const handleCancel = () => {
        dispatch({
            type: 'GO_BACK_TO_GAME',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                        Match Settings
                    </h1>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Adjust match configurations during the game.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total Overs
                            </label>
                            <input
                                type="number"
                                value={setup.totalOvers}
                                onChange={(e) => setSetup({ ...setup, totalOvers: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {state.matchSetup.teamA} Players
                            </label>
                            <input
                                type="number"
                                value={setup.playersTeamA}
                                onChange={(e) => setSetup({ ...setup, playersTeamA: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="11"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {state.matchSetup.teamB} Players
                            </label>
                            <input
                                type="number"
                                value={setup.playersTeamB}
                                onChange={(e) => setSetup({ ...setup, playersTeamB: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="11"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <XCircle className="w-5 h-5 mr-2" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsForm;