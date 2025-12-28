
import { useEffect, useState, useRef } from 'react'

const initialPokemons = [
  {
    id: 1,
    name: "Pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  {
    id: 2,
    name: "Bulbasaur",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 3,
    name: "Charmander",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    id: 4,
    name: "Squirtle",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
  {
    id: 5,
    name: "Jigglypuff",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
  },
  {
    id: 6,
    name: "Meowth",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
  },
  {
    id: 7,
    name: "mew2",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
  },
  {
    id: 8,
    name: "chikorita",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png",
  },
  {
    id: 9,
    name: "duck",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
  },
  {
    id: 10,
    name: "snorlax",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
  },
]


const Card = ({ pokemon, isFlipped, onClick }) => {
  const cardRef = useRef(null)

  
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
    }
  }, [isFlipped])

  return (
    <div 
      className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 cursor-pointer"
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <div 
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-600 ease-in-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
       
        <div 
          className="absolute inset-0 w-full h-full rounded-xl flex items-center justify-center  "
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full  rounded-xl  flex items-center justify-center">
           <img src="/images/ball.png" alt="pokemons" />
          </div>
        </div>
        
       
        <div 
          className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center "
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="w-full h-full  rounded-xl  flex items-center justify-center p-2">
            <img 
              src={pokemon?.image} 
              alt={pokemon?.name} 
              className="w-full h-full object-contain scale-140 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


const Board = ({ pokemons, flippedCards, matchedPairs, handleCardClick }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-6 justify-center mx-auto p-4 bg-gradient-to-r from-black via-red-950 to-red-800 rounded-2xl shadow-xl max-w-4xl">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          isFlipped={
            flippedCards.includes(pokemon.id) || 
            matchedPairs.includes(pokemon.name)
          }
          onClick={() => handleCardClick(pokemon.id)}
        />
      ))}
    </div>
  )
}


function Memorite() {
  const [pokemons, setPokemons] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    const shuffledPokemons = [...initialPokemons, ...initialPokemons]
      .sort(() => Math.random() - 0.5)
      .map((pokemon) => ({ ...pokemon, id: Math.random() }))
    setPokemons(shuffledPokemons)
  }, [])

  const resetGame = () => {
    setFlippedCards([])
    setGameWon(false)
    setMatchedPairs([])
    setMoves(0)
    const shuffledPokemons = [...initialPokemons, ...initialPokemons]
      .sort(() => Math.random() - 0.5)
      .map((pokemon) => ({ ...pokemon, id: Math.random() }))
    setPokemons(shuffledPokemons)
  }

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards([...flippedCards, id])
    }
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards.map((id) =>
        pokemons.find((pokemon) => pokemon.id === id)
      )

      if (firstCard.name === secondCard.name) {
        setMatchedPairs([...matchedPairs, firstCard.name])
      }

      setTimeout(() => {
        setFlippedCards([])
        setMoves((prev) => prev + 1)
      }, 1000)
    }
  }, [flippedCards])

  useEffect(() => {
    if (matchedPairs.length === initialPokemons.length) {
      setGameWon(true)
    }
  }, [matchedPairs])

  const progressValue = (matchedPairs.length / initialPokemons.length) * 100

  return (
    <div className="min-h-screen  bg-gradient-to-r from-red-500 via-gray-900 to-white flex flex-col items-center justify-center p-4 md:p-6">
    
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600 mb-2 md:mb-4 drop-shadow-lg">
          Pokémon Memory Game
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 bg-white px-4 py-2 rounded-full shadow-md">
            Moves: <span className="text-blue-600">{moves}</span>
          </h3>
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 bg-white px-4 py-2 rounded-full shadow-md">
            Matched: <span className="text-green-600">{matchedPairs.length}</span>/{initialPokemons.length}
          </h3>
        </div>
      </div>

      
      <div className="w-full max-w-md mb-6 md:mb-8">
        <div className="bg-gray-200 rounded-full h-4 md:h-6 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

     
      <Board
        pokemons={pokemons}
        flippedCards={flippedCards}
        matchedPairs={matchedPairs}
        handleCardClick={handleCardClick}
      />

      
      <button
        className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg md:text-xl rounded-full shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        onClick={resetGame}
      >
        Restart Game
      </button>

    
      {gameWon && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-2xl max-w-sm md:max-w-md w-full mx-4 transform animate-bounce">
            <div className="text-6xl md:text-8xl mb-4">🎉</div>
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
              Congratulations!
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-6">
              You matched all Pokemons in <span className="font-bold text-blue-600">{moves}</span> moves!
            </p>
            <button
              onClick={resetGame}
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg md:text-xl rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
             Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Memorite
