
import React, { useState, useEffect, useCallback } from 'react';
import './LudoGame.css';
import { 
    COORDINATES_MAP, 
    PLAYERS, 
    BASE_POSITIONS, 
    START_POSITIONS, 
    HOME_ENTRANCE, 
    HOME_POSITIONS, 
    TURNING_POINTS, 
    SAFE_POSITIONS, 
    STATE,
    STEP_LENGTH,
    PLAYER_COLORS
} from './ludoConstants';

const LudoGame = () => {
    const [currentPositions, setCurrentPositions] = useState(structuredClone(BASE_POSITIONS));
    const [diceValue, setDiceValue] = useState(1);
    const [turn, setTurn] = useState(0); // Index of PLAYERS
    const [gameState, setGameState] = useState(STATE.DICE_NOT_ROLLED);
    const [eligiblePieces, setEligiblePieces] = useState([]);
    const [isMoving, setIsMoving] = useState(false);

    // Get the player ID (P1, P2, P3, P4)
    const currentPlayer = PLAYERS[turn];

    // Reset Game
    const resetGame = useCallback(() => {
        setCurrentPositions(structuredClone(BASE_POSITIONS));
        setTurn(0);
        setGameState(STATE.DICE_NOT_ROLLED);
        setDiceValue(1);
        setEligiblePieces([]);
        setIsMoving(false);
    }, []);

    // Roll Dice
    const onDiceClick = (playerIndex) => {
        if (gameState !== STATE.DICE_NOT_ROLLED || playerIndex !== turn || isMoving) return;

        const value = 1 + Math.floor(Math.random() * 6);
        setDiceValue(value);
        setGameState(STATE.DICE_ROLLED);

        // Check for eligible pieces
        const player = PLAYERS[playerIndex];
        const eligible = [0, 1, 2, 3].filter(piece => {
            const currentPosition = currentPositions[player][piece];
            
            if (currentPosition === HOME_POSITIONS[player]) return false;
            
            if (BASE_POSITIONS[player].includes(currentPosition) && value !== 6) return false;
            
            if (HOME_ENTRANCE[player].includes(currentPosition) && value > (HOME_POSITIONS[player] - currentPosition)) return false;
            
            return true;
        });

        if (eligible.length > 0) {
            setEligiblePieces(eligible);
        } else {
            // No moves possible, next turn
            setTimeout(() => {
                incrementTurn();
            }, 1000);
        }
    };

    const incrementTurn = () => {
        setTurn((prev) => (prev + 1) % PLAYERS.length);
        setGameState(STATE.DICE_NOT_ROLLED);
        setEligiblePieces([]);
    };

    const handlePieceClick = (player, pieceIndex) => {
        if (gameState !== STATE.DICE_ROLLED || player !== currentPlayer || isMoving) return;
        if (!eligiblePieces.includes(pieceIndex)) return;

        setEligiblePieces([]);
        const currentPos = currentPositions[player][pieceIndex];

        if (BASE_POSITIONS[player].includes(currentPos)) {
            // Take out of base
            setPiecePosition(player, pieceIndex, START_POSITIONS[player]);
            // If rolled 6, get another turn or just roll again
            if (diceValue === 6) {
                setGameState(STATE.DICE_NOT_ROLLED);
            } else {
                incrementTurn();
            }
        } else {
            movePiece(player, pieceIndex, diceValue);
        }
    };

    const setPiecePosition = (player, piece, newPos) => {
        setCurrentPositions(prev => {
            const next = { ...prev };
            next[player][piece] = newPos;
            return next;
        });
    };

    const movePiece = async (player, piece, moveBy) => {
        setIsMoving(true);
        let currentMoveBy = moveBy;
        
        const moveOneStep = (player, piece) => {
            setCurrentPositions(prev => {
                const next = { ...prev };
                const currentPos = next[player][piece];
                let nextPos;

                if (currentPos === TURNING_POINTS[player]) {
                    nextPos = HOME_ENTRANCE[player][0];
                } else if (currentPos === 51) {
                    nextPos = 0;
                } else {
                    nextPos = currentPos + 1;
                }
                
                next[player][piece] = nextPos;
                return next;
            });
        };

        for (let i = 0; i < currentMoveBy; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            moveOneStep(player, piece);
        }

        setIsMoving(false);
        
        // Final position check
        const finalPos = await new Promise(resolve => {
            setCurrentPositions(prev => {
                resolve(prev[player][piece]);
                return prev;
            });
        });

        // Check Win
        if (finalPos === HOME_POSITIONS[player]) {
            const hasWon = await new Promise(resolve => {
                setCurrentPositions(prev => {
                    resolve(prev[player].every(p => p === HOME_POSITIONS[player]));
                    return prev;
                });
            });
            if (hasWon) {
                alert(`Player ${player} won!`);
                resetGame();
                return;
            }
        }

        // Check Kill
        const isKill = checkForKill(player, piece, finalPos);
        
        if (isKill || diceValue === 6) {
            setGameState(STATE.DICE_NOT_ROLLED);
        } else {
            incrementTurn();
        }
    };

    const checkForKill = (player, piece, position) => {
        if (SAFE_POSITIONS.includes(position)) return false;

        let kill = false;
        PLAYERS.forEach(opponent => {
            if (opponent === player) return;
            
            currentPositions[opponent].forEach((oppPos, oppPieceIndex) => {
                if (oppPos === position) {
                    setPiecePosition(opponent, oppPieceIndex, BASE_POSITIONS[opponent][oppPieceIndex]);
                    kill = true;
                }
            });
        });
        return kill;
    };

    return (
        <section className="w-full min-h-screen py-20 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
            <h1 className="text-white font-montserrat text-5xl font-black mb-10 tracking-tighter">
                POKEMON <span className="text-red-600">LUDO</span>
            </h1>

            <div className="ludo-container">
                <div className="ludo">
                    <div className="player-pieces">
                        {PLAYERS.map(player => (
                            currentPositions[player].map((pos, idx) => {
                                const [x, y] = COORDINATES_MAP[pos];
                                const isHighlight = currentPlayer === player && eligiblePieces.includes(idx) && gameState === STATE.DICE_ROLLED;
                                
                                return (
                                    <div 
                                        key={`${player}-${idx}`}
                                        className={`player-piece ${isHighlight ? 'highlight' : ''}`}
                                        player-id={player}
                                        style={{
                                            top: `${y * STEP_LENGTH}%`,
                                            left: `${x * STEP_LENGTH}%`,
                                            backgroundColor: PLAYER_COLORS[player]
                                        }}
                                        onClick={() => handlePieceClick(player, idx)}
                                    ></div>
                                );
                            })
                        ))}
                    </div>
                </div>

                <div className="dice-container">
                    <div className="active-player-info">
                        <p className="text-xs uppercase tracking-widest opacity-60">Active Player</p>
                        <h2 className="active-player-name" style={{ backgroundColor: PLAYER_COLORS[currentPlayer], color: turn === 1 || turn === 3 ? 'black' : 'white' }}>
                            {currentPlayer}
                        </h2>
                    </div>
                    
                    <div className="dice-value">{diceValue}</div>
                    
                    <div className="controls">
                        {PLAYERS.map((player, idx) => (
                            <button
                                key={player}
                                className="roll-btn"
                                player-id={player}
                                disabled={turn !== idx || gameState !== STATE.DICE_NOT_ROLLED || isMoving}
                                onClick={() => onDiceClick(idx)}
                            >
                                {player} Roll
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={resetGame}
                        className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition-colors border border-white/10"
                    >
                        Reset Game
                    </button>
                </div>
            </div>
            
            <button 
                onClick={() => window.location.reload()} // Quick way to go back to list
                className="mt-12 text-white/50 hover:text-white transition-colors flex items-center gap-2"
            >
                ← Back to Games
            </button>
        </section>
    );
};

export default LudoGame;
