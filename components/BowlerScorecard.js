"use client";

import React from 'react';

const BowlerScorecard = ({ inningsData }) => {
  const bowlerStats = {};

  // First, calculate stats from the completed overs
  inningsData.overHistory.forEach(over => {
    const { bowler, runs, wickets } = over;
    if (!bowlerStats[bowler]) {
      bowlerStats[bowler] = { runs: 0, wickets: 0, overs: 0, balls: 0 };
    }
    bowlerStats[bowler].runs += runs;
    bowlerStats[bowler].wickets += wickets;
    bowlerStats[bowler].overs += 1;
  });

  // Second, add stats from the current, unfinished over
  inningsData.currentOver.forEach(ball => {
    const { bowler, runs, isWicket, isExtra } = ball;
    if (!bowlerStats[bowler]) {
      bowlerStats[bowler] = { runs: 0, wickets: 0, overs: 0, balls: 0 };
    }
    // Only add runs and balls if they are for the current bowler
    if (bowler === inningsData.currentBowler) {
      if (!isExtra) {
        bowlerStats[bowler].balls += 1;
      }
      bowlerStats[bowler].runs += runs;
      if (isWicket) {
        bowlerStats[bowler].wickets += 1;
      }
    }
  });

  // Get a list of all bowlers who participated
  const allBowlers = Object.keys(bowlerStats);
  if (inningsData.currentBowler && !allBowlers.includes(inningsData.currentBowler)) {
      allBowlers.push(inningsData.currentBowler);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Bowling</h4>
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 text-sm font-medium text-gray-500">Bowler</th>
            <th className="py-2 text-sm font-medium text-gray-500">O</th>
            <th className="py-2 text-sm font-medium text-gray-500">R</th>
            <th className="py-2 text-sm font-medium text-gray-500">W</th>
          </tr>
        </thead>
        <tbody>
          {allBowlers.map((bowler, index) => {
            const stats = bowlerStats[bowler] || { runs: 0, wickets: 0, overs: 0, balls: 0 };
            const oversDisplay = `${stats.overs}.${stats.balls}`;
            return (
              <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-2 text-sm text-gray-700 font-medium">{bowler}</td>
                <td className="py-2 text-sm text-gray-700">{oversDisplay}</td>
                <td className="py-2 text-sm text-gray-700">{stats.runs}</td>
                <td className="py-2 text-sm text-gray-700">{stats.wickets}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BowlerScorecard;