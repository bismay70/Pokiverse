
import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Home, Trophy } from 'lucide-react';

const PokeCrush = () => {
  const pokemons = [
    { 
      id: 1, 
      name: 'Pikachu', 
      color: 'bg-yellow-400', 
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
    },
    { 
      id: 2, 
      name: 'Charmander', 
      color: 'bg-red-500', 
       image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
    },
    { 
      id: 3, 
      name: 'Squirtle', 
      color: 'bg-blue-500', 
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" 
    },
    { 
      id: 4, 
      name: 'Bulbasaur', 
      color: 'bg-green-500',      
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
    },
    { 
      id: 5, 
      name: 'mew2', 
      color: 'bg-purple-500',    
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png" 
    }
  ];

  const GRID_SIZE = 6;
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(10);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [matchedCells, setMatchedCells] = useState(new Set());
  const [combo, setCombo] = useState(0);

 
  const initializeGrid = useCallback(() => {
    const newGrid = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      const gridRow = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        let pokemon;
        do {
          pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        } while (
          (col >= 2 && gridRow[col - 1]?.id === pokemon.id && gridRow[col - 2]?.id === pokemon.id) ||
          (row >= 2 && newGrid[row - 1]?.[col]?.id === pokemon.id && newGrid[row - 2]?.[col]?.id === pokemon.id)
        );
        gridRow.push({ ...pokemon, key: `${row}-${col}-${Date.now()}` });
      }
      newGrid.push(gridRow);
    }
    return newGrid;
  }, []);

 
  const findMatches = useCallback((currentGrid) => {
    const matches = new Set();

   
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        const current = currentGrid[row][col];
        if (current && currentGrid[row][col + 1]?.id === current.id && currentGrid[row][col + 2]?.id === current.id) {
          matches.add(`${row}-${col}`);
          matches.add(`${row}-${col + 1}`);
          matches.add(`${row}-${col + 2}`);
          
       
          let extraCol = col + 3;
          while (extraCol < GRID_SIZE && currentGrid[row][extraCol]?.id === current.id) {
            matches.add(`${row}-${extraCol}`);
            extraCol++;
          }
        }
      }
    }

    for (let col = 0; col < GRID_SIZE; col++) {
      for (let row = 0; row < GRID_SIZE - 2; row++) {
        const current = currentGrid[row][col];
        if (current && currentGrid[row + 1]?.[col]?.id === current.id && currentGrid[row + 2]?.[col]?.id === current.id) {
          matches.add(`${row}-${col}`);
          matches.add(`${row + 1}-${col}`);
          matches.add(`${row + 2}-${col}`);
          
      
          let extraRow = row + 3;
          while (extraRow < GRID_SIZE && currentGrid[extraRow]?.[col]?.id === current.id) {
            matches.add(`${extraRow}-${col}`);
            extraRow++;
          }
        }
      }
    }

    return matches;
  }, []);

 
  const processMatches = useCallback((currentGrid, matches) => {
    if (matches.size === 0) return currentGrid;

    const newGrid = currentGrid.map(row => [...row]);
    
  
    matches.forEach(match => {
      const [row, col] = match.split('-').map(Number);
      newGrid[row][col] = null;
    });

   
    for (let col = 0; col < GRID_SIZE; col++) {
      const column = [];
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (newGrid[row][col]) {
          column.push(newGrid[row][col]);
        }
      }
      
    
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (column.length > 0) {
          newGrid[row][col] = column.shift();
        } else {
         
          let newPokemon;
          do {
            newPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
          } while (false); 
          newGrid[row][col] = { ...newPokemon, key: `${row}-${col}-${Date.now()}` };
        }
      }
    }

    return newGrid;
  }, []);

 
  const handleCellClick = (row, col) => {
    if (isAnimating || gameOver || moves <= 0) return;

    const cellKey = `${row}-${col}`;
    
    if (!selectedCell) {
      setSelectedCell({ row, col, key: cellKey });
    } else {
      const { row: selectedRow, col: selectedCol } = selectedCell;
      
    
      const isAdjacent = 
        (Math.abs(row - selectedRow) === 1 && col === selectedCol) ||
        (Math.abs(col - selectedCol) === 1 && row === selectedRow);
      
      if (isAdjacent) {
       
        const newGrid = grid.map(r => [...r]);
        const temp = newGrid[row][col];
        newGrid[row][col] = newGrid[selectedRow][selectedCol];
        newGrid[selectedRow][selectedCol] = temp;
        
       
        const matches = findMatches(newGrid);
        
        if (matches.size > 0) {
          setIsAnimating(true);
          setGrid(newGrid);
          setMoves(prev => prev - 1);
          
        
          setTimeout(() => {
            processMatchesRecursively(newGrid);
          }, 300);
        } else {
         
          setGrid(grid);
        }
      }
      
      setSelectedCell(null);
    }
  };

 
  const processMatchesRecursively = useCallback((currentGrid) => {
    const matches = findMatches(currentGrid);
    
    if (matches.size > 0) {
      setMatchedCells(matches);
      
    
      const matchPoints = matches.size * 10 * (combo + 1);
      setScore(prev => prev + matchPoints);
      setCombo(prev => prev + 1);
      
      setTimeout(() => {
        const newGrid = processMatches(currentGrid, matches);
        setGrid(newGrid);
        setMatchedCells(new Set());
        
     
        setTimeout(() => {
          processMatchesRecursively(newGrid);
        }, 300);
      }, 500);
    } else {
      setIsAnimating(false);
      setCombo(0);
    }
  }, [findMatches, processMatches, combo]);

  
  useEffect(() => {
    const initialGrid = initializeGrid();
    setGrid(initialGrid);
    
   
    setTimeout(() => {
      processMatchesRecursively(initialGrid);
    }, 500);
  }, []);

 
  useEffect(() => {
    if (moves <= 0 && !isAnimating) {
      setGameOver(true);
    }
  }, [moves, isAnimating]);

 
  const resetGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setMoves(15);
    setSelectedCell(null);
    setIsAnimating(false);
    setGameOver(false);
    setMatchedCells(new Set());
    setCombo(0);
  };

  const PokemonCell = ({ pokemon, row, col, isSelected, isMatched }) => (
    <div
      className={`
        w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 
        rounded-lg cursor-pointer transition-all duration-300 transform
        ${pokemon.color} 
        ${isSelected ? 'ring-2 sm:ring-4 ring-white scale-110' : ''}
        ${isMatched ? 'animate-pulse scale-125' : ''}
        hover:scale-105 active:scale-95
        flex items-center justify-center shadow-lg overflow-hidden
      `}
      onClick={() => handleCellClick(row, col)}
    >
      <img 
        src={pokemon.image} 
        alt={pokemon.name}
        className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
        draggable={false}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-red-950 to-red-800 p-2 sm:p-4 lg:p-6 xl:p-8">
      <div className="max-w-lg sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2">
            PokeCrush
          </h1>
          <p className="text-blue-200 text-sm sm:text-base md:text-lg lg:text-xl">
            Match 3 or more Pokemon!
          </p>
        </div>

        <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8 bg-black/30 backdrop-blur rounded-lg p-3 sm:p-4 lg:p-6">
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                {score}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm lg:text-base">Score</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                {moves}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm lg:text-base">Moves</div>
            </div>
            {combo > 0 && (
              <div className="text-center">
                <div className="text-red-400 font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl animate-bounce">
                  {combo}x
                </div>
                <div className="text-gray-300 text-xs sm:text-sm lg:text-base">Combo!</div>
              </div>
            )}
          </div>
          
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 lg:p-4 rounded-lg transition-colors"
          >
            <RotateCcw size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* Game Grid */}
        <div className="bg-black/20 backdrop-blur rounded-xl p-3 sm:p-4 lg:p-6 xl:p-8 mb-4 sm:mb-6">
          <div className="grid grid-cols-6 gap-1 sm:gap-2 lg:gap-3 xl:gap-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
            {grid.map((row, rowIndex) =>
              row.map((pokemon, colIndex) => (
                <PokemonCell
                  key={pokemon?.key || `${rowIndex}-${colIndex}`}
                  pokemon={pokemon}
                  row={rowIndex}
                  col={colIndex}
                  isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                  isMatched={matchedCells.has(`${rowIndex}-${colIndex}`)}
                />
              ))
            )}
          </div>
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 sm:p-8 lg:p-10 text-center max-w-xs sm:max-w-sm lg:max-w-md w-full">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                Game Over!
              </h2>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                Final Score: {score}
              </p>
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={resetGame}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition-colors text-sm sm:text-base lg:text-lg"
                >
                  Play Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base lg:text-lg"
                >
                  <Home size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeCrush;