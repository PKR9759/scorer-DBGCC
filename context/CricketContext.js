// File: context/CricketContext.js

"use client";

import React, { createContext, useContext, useReducer } from 'react';

// Cricket Match Context
export const CricketContext = createContext();

// Initial state
export const initialState = {
  matchSetup: {
    teamA: '',
    teamB: '',
    venue: '',
    totalOvers: 20,
    playersTeamA: 11,
    playersTeamB: 11
  },
  gameState: 'setup', // 'setup', 'innings1', 'innings2', 'finished'
  currentInnings: 1,
  innings1: {
    battingTeam: '',
    bowlingTeam: '',
    score: { runs: 0, wickets: 0, overs: 0, balls: 0 },
    currentBatsman: '',
    currentBowler: '',
    currentOver: [],
    overHistory: [],
    ballCommentary: [],
    playersOut: 0
  },
  innings2: {
    battingTeam: '',
    bowlingTeam: '',
    score: { runs: 0, wickets: 0, overs: 0, balls: 0 },
    currentBatsman: '',
    currentBowler: '',
    target: 0,
    currentOver: [],
    overHistory: [],
    ballCommentary: [],
    playersOut: 0
  },
  secondaryInput: null,
  winner: null,
  needsNewBatsman: false,
  needsNewBowler: false,
  history: [] // Stores a history of states for undo functionality
};

// Reducer
export const cricketReducer = (state, action) => {
  switch (action.type) {
    case 'SETUP_MATCH': {
      const { teamA, teamB, battingFirst, totalOvers, playersTeamA, playersTeamB, venue } = action.payload;
      const bowlingFirst = battingFirst === teamA ? teamB : teamA;

      return {
        ...state,
        matchSetup: { teamA, teamB, venue, totalOvers, playersTeamA, playersTeamB },
        innings1: {
          ...state.innings1,
          battingTeam: battingFirst,
          bowlingTeam: bowlingFirst
        },
        innings2: {
          ...state.innings2,
          battingTeam: bowlingFirst,
          bowlingTeam: battingFirst,
          target: 0
        },
        gameState: 'innings1',
        history: [], // Ensure history is empty at the start of a new match
      };
    }

    case 'SET_BATSMAN_BOWLER': {
      // Snapshot the state before the change
      const historySnapshot = [...state.history, state];
      const currentInningsKey = state.currentInnings === 1 ? 'innings1' : 'innings2';
      return {
        ...state,
        [currentInningsKey]: {
          ...state[currentInningsKey],
          currentBatsman: action.payload.batsman,
          currentBowler: action.payload.bowler
        },
        history: historySnapshot, // Save the snapshot
      };
    }

    case 'ADD_DELIVERY': {
      // Snapshot the state before the change
      const historySnapshot = [...state.history, state];
  
      const currentInnings = state.currentInnings === 1 ? 'innings1' : 'innings2';
      const currentInningsData = state[currentInnings];
      
      const { type, runs = 0, isWicket = false, isExtra = false } = action.payload;
      
      let newScore = { ...currentInningsData.score };
      let newCurrentOver = [...currentInningsData.currentOver];
      let newCommentary = [...currentInningsData.ballCommentary];
      let newOverHistory = [...currentInningsData.overHistory];
      let newPlayersOut = currentInningsData.playersOut;
      let newGameState = state.gameState;
      let newWinner = state.winner;
      
      const battingTeamPlayers = state.currentInnings === 1 ? state.matchSetup.playersTeamA : state.matchSetup.playersTeamB;
      const isInningsComplete = 
        newScore.wickets >= battingTeamPlayers || 
        newScore.overs >= state.matchSetup.totalOvers || 
        (state.currentInnings === 2 && newScore.runs > state.innings1.score.runs); 
      
      let commentaryText = '';
      
      // Handle runs and balls
      if (isExtra) {
        if (type === 'wide') {
          newScore.runs += 1;
          commentaryText = `Wide ball (+1 run)`;
        } else if (type === 'noball') {
          newScore.runs += runs; 
          commentaryText = `No ball (+${runs} run${runs !== 1 ? 's' : ''})`;
        }
      } else {
        newScore.runs += runs;
        newScore.balls += 1;
        
        if (isWicket) {
          commentaryText = `OUT! +${runs} run${runs !== 1 ? 's' : ''}`;
        } else {
          commentaryText = `${runs} run${runs !== 1 ? 's' : ''}`;
        }
      }
  
      // THIS IS THE KEY FIX: Calculate ballNumber AFTER the score updates, but BEFORE the over completion logic
      // This ensures the correct ball number (e.g., 4.6) is used before it's reset to 5.0
      const ballNumber = `${newScore.overs}.${newScore.balls === 0 && !isExtra ? 6 : newScore.balls}`;
      let fullCommentaryText = `${ballNumber}: ${currentInningsData.currentBatsman} - ` + commentaryText;
  
      // Update current over and history
      newCurrentOver.push({ type, runs, isWicket, isExtra, batsman: currentInningsData.currentBatsman });
      
      // Check for over completion (only for legal deliveries)
      if (!isExtra && newScore.balls === 6) {
        newScore.overs += 1;
        newScore.balls = 0;
        
        const overRuns = newCurrentOver.reduce((sum, ball) => sum + ball.runs, 0);
        const overWickets = newCurrentOver.filter(ball => ball.isWicket).length;
        
        newOverHistory.push({
          overNumber: newScore.overs,
          runs: overRuns,
          wickets: overWickets,
          bowler: currentInningsData.currentBowler,
          balls: newCurrentOver
        });
        
        newCurrentOver = [];
        state.needsNewBowler = true;
      }
      
      // Add wicket
      if (isWicket) {
        newScore.wickets += 1;
        newPlayersOut += 1;
        
        if (newScore.wickets < battingTeamPlayers) {
          state.needsNewBatsman = true;
        }
      }
      
      // Prepend commentary text
      newCommentary.unshift(fullCommentaryText);

      // Check innings completion conditions
      if (isInningsComplete) {
        if (state.currentInnings === 1) {
          newGameState = 'innings2';
          const target = newScore.runs + 1;
          return {
            ...state,
            [currentInnings]: {
              ...currentInningsData,
              score: newScore,
              currentOver: newCurrentOver,
              overHistory: newOverHistory,
              ballCommentary: newCommentary.slice(0, 100),
              playersOut: newPlayersOut
            },
            innings2: {
              ...state.innings2,
              target: target
            },
            currentInnings: 2,
            gameState: newGameState,
            secondaryInput: null,
            history: historySnapshot // Save the snapshot
          };
        } else {
          newGameState = 'finished';
          const team1Score = state.innings1.score.runs;
          const team2Score = newScore.runs;

          if (team2Score > team1Score) {
            const team2Players = state.matchSetup.playersTeamB;
            newWinner = {
              team: state.innings2.battingTeam,
              margin: `${team2Players - 1 - newScore.wickets} wickets`,
              type: 'wickets'
            };
          } else if (team1Score > team2Score) {
            newWinner = {
              team: state.innings1.battingTeam,
              margin: `${team1Score - team2Score} runs`,
              type: 'runs'
            };
          } else {
            newWinner = { team: 'Tie', margin: 'Match Tied', type: 'tie' };
          }
        }
      }

      return {
        ...state,
        [currentInnings]: {
          ...currentInningsData,
          score: newScore,
          currentOver: newCurrentOver,
          overHistory: newOverHistory,
          ballCommentary: newCommentary.slice(0, 100),
          playersOut: newPlayersOut
        },
        gameState: newGameState,
        secondaryInput: null,
        winner: newWinner,
        needsNewBatsman: state.needsNewBatsman,
        needsNewBowler: state.needsNewBowler,
        history: historySnapshot, // Save the snapshot
      };
    }

    case 'SET_SECONDARY_INPUT':
      return {
        ...state,
        secondaryInput: action.payload
      };

    case 'SET_NEW_BATSMAN': {
      // Snapshot the state before the change
      const historySnapshot = [...state.history, state];
      const currentInningsForBatsman = state.currentInnings === 1 ? 'innings1' : 'innings2';
      return {
        ...state,
        [currentInningsForBatsman]: {
          ...state[currentInningsForBatsman],
          currentBatsman: action.payload
        },
        needsNewBatsman: false,
        history: historySnapshot, // Save the snapshot
      };
    }

    case 'SET_NEW_BOWLER': {
      // Snapshot the state before the change
      const historySnapshot = [...state.history, state];
      const currentInningsForBowler = state.currentInnings === 1 ? 'innings1' : 'innings2';
      return {
        ...state,
        [currentInningsForBowler]: {
          ...state[currentInningsForBowler],
          currentBowler: action.payload
        },
        needsNewBowler: false,
        history: historySnapshot, // Save the snapshot
      };
    }

    case 'UNDO':
      if (state.history.length > 0) {
        const previousState = state.history[state.history.length - 1];
        const newHistory = state.history.slice(0, -1);

        // Return the previous state but specifically clear the flags
        // that trigger secondary input screens to prevent re-displaying them.
        return {
          ...previousState,
          secondaryInput: null, // Clear the secondary input flag
          needsNewBatsman: false, // Clear the new batsman flag
          needsNewBowler: false, // Clear the new bowler flag
          history: newHistory,
        };
      }
      return state;

    case 'RESET_MATCH':
      return initialState;

    default:
      return state;
  }
};

// Cricket Provider Component
export const CricketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cricketReducer, initialState);

  return (
    <CricketContext.Provider value={{ state, dispatch }}>
      {children}
    </CricketContext.Provider>
  );
};