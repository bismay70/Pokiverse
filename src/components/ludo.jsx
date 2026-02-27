import React, { useState, useEffect, useCallback } from 'react';

const COORDINATES_MAP = {
    0: [6, 13], 1: [6, 12], 2: [6, 11], 3: [6, 10], 4: [6, 9],
    5: [5, 8], 6: [4, 8], 7: [3, 8], 8: [2, 8], 9: [1, 8], 10: [0, 8],
    11: [0, 7], 12: [0, 6], 13: [1, 6], 14: [2, 6], 15: [3, 6], 16: [4, 6], 17: [5, 6],
    18: [6, 5], 19: [6, 4], 20: [6, 3], 21: [6, 2], 22: [6, 1], 23: [6, 0],
    24: [7, 0], 25: [8, 0], 26: [8, 1], 27: [8, 2], 28: [8, 3], 29: [8, 4], 30: [8, 5],
    31: [9, 6], 32: [10, 6], 33: [11, 6], 34: [12, 6], 35: [13, 6], 36: [14, 6],
    37: [14, 7], 38: [14, 8], 39: [13, 8], 40: [12, 8], 41: [11, 8], 42: [10, 8], 43: [9, 8],
    44: [8, 9], 45: [8, 10], 46: [8, 11], 47: [8, 12], 48: [8, 13], 49: [8, 14],
    50: [7, 14], 51: [6, 14],
    100: [7, 13], 101: [7, 12], 102: [7, 11], 103: [7, 10], 104: [7, 9], 105: [7, 8],
    200: [7, 1], 201: [7, 2], 202: [7, 3], 203: [7, 4], 204: [7, 5], 205: [7, 6],
    300: [1, 7], 301: [2, 7], 302: [3, 7], 303: [4, 7], 304: [5, 7], 305: [6, 7],
    400: [13, 7], 401: [12, 7], 402: [11, 7], 403: [10, 7], 404: [9, 7], 405: [8, 7],
    500: [1.5, 10.58], 501: [3.57, 10.58], 502: [1.5, 12.43], 503: [3.57, 12.43],
    600: [10.5, 1.58], 601: [12.54, 1.58], 602: [10.5, 3.45], 603: [12.54, 3.45],
    700: [1.5, 1.58], 701: [3.57, 1.58], 702: [1.5, 3.45], 703: [3.57, 3.45],
    800: [10.5, 10.58], 801: [12.54, 10.58], 802: [10.5, 12.43], 803: [12.54, 12.43],
};

const STEP_LENGTH = 6.66;
const PLAYERS = ['P1', 'P2', 'P3', 'P4'];
const BASE_POSITIONS = {
    P4: [500, 501, 502, 503], // Blue (Bottom-Left)
    P2: [700, 701, 702, 703], // Yellow (Top-Left)
    P3: [600, 601, 602, 603], // Green (Top-Right)
    P1: [800, 801, 802, 803], // Red (Bottom-Right)
};
const START_POSITIONS = { P1: 39, P2: 13, P3: 26, P4: 0 };
const HOME_ENTRANCE = {
    P4: [100, 101, 102, 103, 104], // Blue
    P2: [300, 301, 302, 303, 304], // Yellow
    P3: [200, 201, 202, 203, 204], // Green
    P1: [400, 401, 402, 403, 404]  // Red
};
const HOME_POSITIONS = { P1: 405, P2: 305, P3: 205, P4: 105 };
const TURNING_POINTS = { P1: 37, P2: 11, P3: 24, P4: 50 };
const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];
const PLAYER_COLORS = { P1: '#ff0000', P2: '#ffff00', P3: '#00ff00', P4: '#0000ff' };
const PLAYER_POKEMON = {
    P1: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', // Charmander (Red)
    P2: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', // Pikachu (Yellow)
    P3: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', // Bulbasaur (Green)
    P4: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', // Squirtle (Blue)
};

const Ludo = () => {
    const [currentPositions, setCurrentPositions] = useState(structuredClone(BASE_POSITIONS));
    const [diceValue, setDiceValue] = useState(1);
    const [turn, setTurn] = useState(0);
    const [diceRolled, setDiceRolled] = useState(false);
    const [eligiblePieces, setEligiblePieces] = useState([]);
    const [isMoving, setIsMoving] = useState(false);

    const currentPlayer = PLAYERS[turn];

    const resetGame = useCallback(() => {
        setCurrentPositions(structuredClone(BASE_POSITIONS));
        setTurn(0);
        setDiceRolled(false);
        setDiceValue(1);
        setEligiblePieces([]);
        setIsMoving(false);
    }, []);

    const onDiceRoll = (playerIndex) => {
        if (diceRolled || playerIndex !== turn || isMoving) return;

        const value = 1 + Math.floor(Math.random() * 6);
        setDiceValue(value);
        setDiceRolled(true);

        const player = PLAYERS[playerIndex];
        const eligible = [0, 1, 2, 3].filter(piece => {
            const pos = currentPositions[player][piece];
            if (pos === HOME_POSITIONS[player]) return false;
            if (BASE_POSITIONS[player].includes(pos) && value !== 6) return false;
            if (HOME_ENTRANCE[player].includes(pos) && value > (HOME_POSITIONS[player] - pos)) return false;
            return true;
        });

        if (eligible.length > 0) {
            setEligiblePieces(eligible);
        } else {
            setTimeout(() => {
                setTurn((prev) => (prev + 1) % PLAYERS.length);
                setDiceRolled(false);
                setEligiblePieces([]);
            }, 1000);
        }
    };

    const handlePieceClick = (player, pieceIndex) => {
        if (!diceRolled || player !== currentPlayer || isMoving) return;
        if (!eligiblePieces.includes(pieceIndex)) return;

        setEligiblePieces([]);
        const currentPos = currentPositions[player][pieceIndex];

        if (BASE_POSITIONS[player].includes(currentPos)) {
            const nextPositions = { ...currentPositions };
            nextPositions[player][pieceIndex] = START_POSITIONS[player];
            setCurrentPositions(nextPositions);
            if (diceValue === 6) {
                setDiceRolled(false);
            } else {
                setTurn((prev) => (prev + 1) % PLAYERS.length);
                setDiceRolled(false);
            }
        } else {
            movePiece(player, pieceIndex, diceValue);
        }
    };

    const movePiece = async (player, piece, moveBy) => {
        setIsMoving(true);
        let pos = currentPositions[player][piece];
        
        for (let i = 0; i < moveBy; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            if (pos === TURNING_POINTS[player]) pos = HOME_ENTRANCE[player][0];
            else if (pos === 51) pos = 0;
            else pos++;
            
            setCurrentPositions(prev => {
                const next = { ...prev };
                next[player][piece] = pos;
                return next;
            });
        }

        setIsMoving(false);
        
        if (pos === HOME_POSITIONS[player]) {
            const allHome = currentPositions[player].every(p => p === HOME_POSITIONS[player]);
            if (allHome) { alert(`Player ${player} Won!`); resetGame(); return; }
        }

        let killed = false;
        if (!SAFE_POSITIONS.includes(pos)) {
            const nextPositions = { ...currentPositions };
            PLAYERS.forEach(opp => {
                if (opp === player) return;
                nextPositions[opp].forEach((oppPos, idx) => {
                    if (oppPos === pos) {
                        nextPositions[opp][idx] = BASE_POSITIONS[opp][idx];
                        killed = true;
                    }
                });
            });
            if (killed) setCurrentPositions(nextPositions);
        }

        if (killed || diceValue === 6) {
            setDiceRolled(false);
        } else {
            setTurn((prev) => (prev + 1) % PLAYERS.length);
            setDiceRolled(false);
        }
    };

    return (
        <section className="w-full min-h-screen py-20 bg-gradient-to-br from-gray-950 via-red-950 to-black flex flex-col items-center">
            <style dangerouslySetInnerHTML={{ __html: `
                .ludo-board {
                    position: relative; width: 600px; height: 600px;
                    background: white url('/images/ludo.png') no-repeat center;
                    background-size: cover; border: 8px solid #222; border-radius: 12px;
                    box-shadow: 0 0 40px rgba(0,0,0,0.8);
                }
                .piece {
                    position: absolute; width: 6%; height: 6%; border-radius: 50%;
                    cursor: pointer; z-index: 100; transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                    display: flex; align-items: center; justify-content: center;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
                }
                .piece img {
                    width: 140%; height: 140%; object-fit: contain;
                    transform: translateY(-10%);
                }
                .piece.highlight { 
                    animation: ludo-float 1s infinite alternate; 
                    z-index: 101; 
                }
                @keyframes ludo-float { 
                    from { transform: scale(1) translateY(0); filter: drop-shadow(0 0 5px white); } 
                    to { transform: scale(1.2) translateY(-10%); filter: drop-shadow(0 0 15px white); } 
                }
                .p-roll { padding: 12px; border-radius: 12px; font-weight: 800; border: 2px solid rgba(255,255,255,0.1); transition: 0.2s; }
                .p-roll:disabled { opacity: 0.2; transform: scale(0.95); }
                @media (max-width: 650px) { .ludo-board { width: 350px; height: 350px; } }
            `}} />

            <h1 className="text-white font-montserrat text-6xl font-black mb-8 tracking-tighter">
                POKE<span className="text-red-600">LUDO</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 items-center bg-white/5 p-8 rounded-[40px] backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="ludo-board">
                    {PLAYERS.map(player => currentPositions[player].map((pos, idx) => {
                        const [x, y] = COORDINATES_MAP[pos];
                        const active = player === currentPlayer && eligiblePieces.includes(idx) && diceRolled;
                        return (
                            <div key={`${player}-${idx}`} className={`piece ${active ? 'highlight' : ''}`}
                                style={{ top: `${y * STEP_LENGTH}%`, left: `${x * STEP_LENGTH}%` }}
                                onClick={() => handlePieceClick(player, idx)}
                            >
                                <img src={PLAYER_POKEMON[player]} alt={player} />
                            </div>
                        );
                    }))}
                </div>

                <div className="flex flex-col items-center gap-6 min-w-[200px]">
                    <div className="text-center">
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-2">Turn</p>
                        <div className="px-6 py-2 rounded-full font-black text-xl shadow-lg border-2 border-white/20"
                             style={{ backgroundColor: PLAYER_COLORS[currentPlayer], color: turn === 1 || turn === 2 ? 'black' : 'white' }}>
                            {currentPlayer}
                        </div>
                    </div>

                    <div className="text-7xl font-black text-white bg-black/40 w-32 h-32 flex items-center justify-center rounded-3xl border border-white/10 shadow-inner">
                        {diceValue}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        {PLAYERS.map((player, idx) => (
                            <button key={player} className="p-roll" disabled={turn !== idx || diceRolled || isMoving}
                                    style={{ backgroundColor: PLAYER_COLORS[player], color: idx === 1 || idx === 2 ? 'black' : 'white' }}
                                    onClick={() => onDiceRoll(idx)}>
                                ROLL
                            </button>
                        ))}
                    </div>

                    <button onClick={resetGame} className="w-full py-3 bg-red-600/20 hover:bg-red-600/40 text-red-500 font-bold rounded-xl border border-red-500/30 transition-all uppercase tracking-tighter">
                        Reset Game
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Ludo;
