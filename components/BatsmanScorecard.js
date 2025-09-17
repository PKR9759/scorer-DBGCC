"use client";

import React from 'react';

// ...inside BatsmanScorecard.js...
// This is the full, updated component after all changes are applied.

const BatsmanScorecard = ({ inningsData, teamPlayersCount }) => {
  const batsmanStats = {};

  const allBalls = [
      ...inningsData.overHistory.flatMap(over => over.balls),
      ...inningsData.currentOver
  ];
  
  allBalls.forEach(ball => {
    const { batsman, runs, isWicket, isExtra, type, dismissalBowler } = ball;
    
    if (!batsman || batsman === '') return;
    
    if (!batsmanStats[batsman]) {
      batsmanStats[batsman] = { runs: 0, balls: 0, howOut: null, dismissalBowler: null };
    }
    
    if (type !== 'wide') {
      batsmanStats[batsman].runs += runs;
    }
    
    if (!isExtra) {
        batsmanStats[batsman].balls += 1;
    }
    
    if (isWicket && !batsmanStats[batsman].howOut) {
      batsmanStats[batsman].howOut = 'Wicket'; 
      batsmanStats[batsman].dismissalBowler = dismissalBowler;
    }
  });

  const battingScorecard = Object.keys(batsmanStats).map(batsman => ({
    name: batsman,
    ...batsmanStats[batsman]
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Batting</h4>
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 text-sm font-medium text-gray-500">Batsman</th>
            <th className="py-2 text-sm font-medium text-gray-500">R</th>
            <th className="py-2 text-sm font-medium text-gray-500">B</th>
          </tr>
        </thead>
        <tbody>
          {battingScorecard.map((player, index) => (
            <tr key={index} className="border-b border-gray-100 last:border-b-0">
              <td className="py-2 text-sm text-gray-700 font-medium">
                {player.howOut
                  ? `${player.name} (Wk: ${player.dismissalBowler})`
                  : `${player.name} (Not Out)`}
              </td>
              <td className="py-2 text-sm text-gray-700">{player.runs}</td>
              <td className="py-2 text-sm text-gray-700">{player.balls}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BatsmanScorecard;