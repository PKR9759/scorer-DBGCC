// File: components/MatchSummaryImage.js

import React from 'react';
import { useCricket } from '@/context/CricketContext';

const MatchSummaryImage = React.forwardRef((props, ref) => {
  const { state } = useCricket();
  const { matchSetup, innings1, innings2, winner, playersA, playersB } = state;

  // Determine which team batted/bowled in each innings
  const isTeamAInnings1 = innings1.battingTeam === matchSetup.teamA;
  const innings1BattingPlayers = isTeamAInnings1 ? playersA : playersB;
  const innings1BowlingPlayers = isTeamAInnings1 ? playersB : playersA;

  const isTeamAInnings2 = innings2.battingTeam === matchSetup.teamA;
  const innings2BattingPlayers = isTeamAInnings2 ? playersA : playersB;
  const innings2BowlingPlayers = isTeamAInnings2 ? playersB : playersA;

  // Helper function to filter for bowlers who bowled at least one ball (overs > 0)
  const getBowlingFigures = (playerList) => {
    return playerList.filter(p => p.bowling.overs > 0 || p.bowling.runs > 0 || p.bowling.wickets > 0);
  };

  // Helper functions to calculate stats
  const calculateSR = (runs, balls) => (balls === 0 ? '0.00' : ((runs / balls) * 100).toFixed(2));
  const calculateEco = (runs, overs) => (overs === 0 ? '0.00' : (runs / overs).toFixed(2));

  // Sub-component for Batting Table
  const BattingTable = ({ players }) => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
      <thead>
        <tr style={{ backgroundColor: '#e0e7ff' }}> {/* Light blue for header */}
          <th style={tableHeaderStyle('left')}>Batsman</th>
          <th style={tableHeaderStyle('left')}></th> {/* For dismissal info */}
          <th style={tableHeaderStyle('right')}>R</th>
          <th style={tableHeaderStyle('right')}>B</th>
          <th style={tableHeaderStyle('right')}>4s</th>
          <th style={tableHeaderStyle('right')}>6s</th>
          <th style={tableHeaderStyle('right')}>SR</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #e2e8f0', color: player.batting.isOut ? '#4a5568' : '#1a202c' }}>
            <td style={tableCellStyle('left', player.batting.isOut ? 'normal' : 'bold')}>
              {player.name}
            </td>
            <td style={tableCellStyle('left', 'normal', '0.875rem', '#718096')}>
              {player.batting.isOut ? player.batting.dismissal : 'not out'}
            </td>
            <td style={tableCellStyle('right', 'bold')}>{player.batting.runs}</td>
            <td style={tableCellStyle('right')}>{player.batting.balls}</td>
            <td style={tableCellStyle('right')}>{player.batting.fours}</td>
            <td style={tableCellStyle('right')}>{player.batting.sixes}</td>
            <td style={tableCellStyle('right')}>{calculateSR(player.batting.runs, player.batting.balls)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Sub-component for Bowling Table
  const BowlingTable = ({ bowlers }) => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#e0e7ff' }}> {/* Light blue for header */}
          <th style={tableHeaderStyle('left')}>Bowler</th>
          <th style={tableHeaderStyle('right')}>O</th>
          <th style={tableHeaderStyle('right')}>R</th>
          <th style={tableHeaderStyle('right')}>W</th>
          <th style={tableHeaderStyle('right')}>Eco</th>
        </tr>
      </thead>
      <tbody>
        {getBowlingFigures(bowlers).map((bowler, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={tableCellStyle('left', 'bold')}>{bowler.name}</td>
            <td style={tableCellStyle('right')}>{bowler.bowling.overs.toFixed(1).replace(/\.0$/, '')}</td> {/* Format overs */}
            <td style={tableCellStyle('right')}>{bowler.bowling.runs}</td>
            <td style={tableCellStyle('right', 'bold', '1rem', '#e53e3e')}>{bowler.bowling.wickets}</td> {/* Red for wickets */}
            <td style={tableCellStyle('right')}>{calculateEco(bowler.bowling.runs, bowler.bowling.overs)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Inline styles for tables
  const tableHeaderStyle = (align = 'left') => ({
    padding: '10px',
    textAlign: align,
    borderBottom: '2px solid #a7b7ec', // Darker blue for header bottom border
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#3182ce', // Blue text for headers
    textTransform: 'uppercase',
  });

  const tableCellStyle = (align = 'left', fontWeight = 'normal', fontSize = '0.95rem', color = '#1a202c') => ({
    padding: '8px 10px',
    textAlign: align,
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color,
  });

  return (
    <div 
      ref={ref} 
      style={{
        width: '900px', // Wider to accommodate full scorecards
        fontFamily: 'Roboto, sans-serif', // More modern font
        backgroundColor: '#f0f4f8', // Slightly darker background for contrast
        color: '#1a202c',
        padding: '40px',
        boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.2), 0 8px 15px -5px rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        backgroundImage: 'linear-gradient(to bottom right, #eef2f7 0%, #dbe4ee 100%)', // Elegant gradient
        border: '1px solid #c3daec'
      }}
    >
      {/* Header with Club Name and Match Title */}
      <div style={{ textAlign: 'center', borderBottom: '3px solid #639fff', paddingBottom: '20px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0A3D91', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          DBGCC
        </h1>
        <p style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2a65b3' }}>
          Match Summary & Full Scorecard
        </p>
        <p style={{ fontSize: '1.1rem', color: '#526d91', marginTop: '5px' }}>
          {matchSetup.teamA} vs {matchSetup.teamB} at {matchSetup.venue}
        </p>
      </div>

      {/* Result Banner */}
      {winner && (
        <div style={{
          padding: '28px',
          backgroundColor: '#28a745', // A strong green
          color: 'white',
          textAlign: 'center',
          borderRadius: '10px',
          boxShadow: '0 6px 12px -2px rgba(0, 0, 0, 0.3)',
          marginBottom: '20px',
          letterSpacing: '0.5px',
          fontSize: '1.2rem',
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
            <span style={{ marginRight: '12px' }}>🏆</span>
            {winner.team} Wins!
          </h2>
          <p style={{ fontSize: '1.6rem', fontWeight: '600', marginTop: '8px' }}>
            by {winner.margin}
          </p>
        </div>
      )}

      {/* Innings 1 Full Scorecard Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #cfe2f7' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0A3D91', borderBottom: '2px solid #9bbdff', paddingBottom: '10px', marginBottom: '20px' }}>
          Innings 1: {innings1.battingTeam} <span style={{ float: 'right', fontWeight: 'normal', fontSize: '1.4rem' }}>
            {innings1.score.runs}/{innings1.score.wickets} ({innings1.score.overs.toFixed(1).replace(/\.0$/, '')}.{innings1.score.balls} Overs)
          </span>
        </h3>
        
        <h4 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#2a65b3', marginBottom: '10px' }}>Batting</h4>
        <BattingTable players={innings1BattingPlayers} />

        <h4 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#2a65b3', marginBottom: '10px' }}>Bowling</h4>
        <BowlingTable bowlers={innings1BowlingPlayers} />
      </div>

      {/* Innings 2 Full Scorecard Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #cfe2f7' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#0A3D91', borderBottom: '2px solid #9bbdff', paddingBottom: '10px', marginBottom: '20px' }}>
          Innings 2: {innings2.battingTeam} <span style={{ float: 'right', fontWeight: 'normal', fontSize: '1.4rem' }}>
            {innings2.score.runs}/{innings2.score.wickets} ({innings2.score.overs.toFixed(1).replace(/\.0$/, '')}.{innings2.score.balls} Overs)
          </span>
        </h3>
        
        <h4 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#2a65b3', marginBottom: '10px' }}>Batting</h4>
        <BattingTable players={innings2BattingPlayers} />

        <h4 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#2a65b3', marginBottom: '10px' }}>Bowling</h4>
        <BowlingTable bowlers={innings2BowlingPlayers} />
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.95rem', color: '#526d91', borderTop: '1px solid #c3daec', paddingTop: '15px' }}>
        <p>&copy; 2023 DBGCC - All rights reserved.</p>
      </div>
    </div>
  );
});

MatchSummaryImage.displayName = 'MatchSummaryImage';

export default MatchSummaryImage;