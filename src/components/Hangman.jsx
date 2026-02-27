import React, { useEffect, useState } from "react";
import axios from "axios";

const POKEMON_LIMIT = 30;

const Figure = ({ errors }) => {
  return (
    <svg
      height="250"
      width="200"
      className="mx-auto"
      stroke="#1d4ed8"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    >
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />

      {/* HEAD */}
      {errors > 0 && <circle cx="140" cy="70" r="20" fill="transparent" />}

      {/* BODY */}
      {errors > 1 && <line x1="140" y1="90" x2="140" y2="150" />}

      {/* HANDS */}
      {errors > 2 && <line x1="140" y1="120" x2="120" y2="100" />}
      {errors > 3 && <line x1="140" y1="120" x2="160" y2="100" />}

      {/* LEGS */}
      {errors > 4 && <line x1="140" y1="150" x2="120" y2="180" />}
      {errors > 5 && <line x1="140" y1="150" x2="160" y2="180" />}
    </svg>
  );
};

const Modal = ({ title, message, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black rounded-xl p-6 shadow-xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onPlayAgain}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors min-h-[44px]"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default function Hangman() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`
        );
        const promises = res.data.results.map((p) => axios.get(p.url));
        const details = await Promise.all(promises);
        const fullList = details.map((r) => ({
          name: r.data.name,
          image: r.data.sprites.other["official-artwork"].front_default || r.data.sprites.front_default || "/images/pikachu.png",
        }));
        setPokemonList(fullList);
        pickRandomPokemon(fullList);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const letter = e.key.toLowerCase();
      if (!/^[a-z]$/.test(letter)) return;
      handleGuess(letter);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPokemon, guessedLetters, wrongGuesses, gameOver]);

  function pickRandomPokemon(list) {
    const random = list[Math.floor(Math.random() * list.length)];
    setCurrentPokemon(random);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameOver(false);
    setWin(false);
  }

  function handleGuess(letter) {
    if (!currentPokemon || gameOver || win) return;
    if (guessedLetters.includes(letter)) return;

    const newGuesses = [...guessedLetters, letter];
    setGuessedLetters(newGuesses);

    if (!currentPokemon.name.includes(letter)) {
      const mistakes = wrongGuesses + 1;
      setWrongGuesses(mistakes);
      if (mistakes >= 6) setGameOver(true);
    } else {
      const won = currentPokemon.name
        .split("")
        .every((l) => newGuesses.includes(l));
      if (won) setWin(true);
    }
  }

  function displayWord() {
    if (!currentPokemon) return "";
    return currentPokemon.name
      .split("")
      .map((l) => (guessedLetters.includes(l) ? l : "_"))
      .join(" ");
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-red-950 to-red-800 p-4">
    <div className="bg-gradient-to-r from-black via-red-950 to-red-800 p-6 rounded-2xl shadow-2xl w-full max-w-5xl">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
        Hangman: Pokemon Edition
      </h1>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

     
        <div className="flex flex-col items-center justify-center">

          {currentPokemon && (
            <img
              src={currentPokemon.image}
              alt={currentPokemon.name}
              loading="eager"
              onError={(e) => (e.target.src = "/images/pikachu.png")}
              className="w-32 h-32 md:w-40 md:h-40 object-contain mb-4 drop-shadow-lg"
            />
          )}

          <Figure errors={wrongGuesses} />
        </div>

     
        <div className="text-center">

          <div className="text-2xl md:text-3xl font-mono tracking-widest mb-6 text-white">
            {displayWord()}
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                className={`py-2 rounded text-sm font-semibold min-h-[44px] transition-all ${
                  guessedLetters.includes(letter)
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 active:scale-95"
                } text-white`}
                disabled={guessedLetters.includes(letter) || gameOver || win}
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>

          <p className="text-white mb-4">
            Wrong guesses: {wrongGuesses} / 6
          </p>

          <button
            onClick={() => pickRandomPokemon(pokemonList)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition min-h-[44px]"
          >
            Play Again
          </button>
        </div>
      </div>

      {(win || gameOver) && (
        <Modal
          title={win ? "🎉 Congratulations!" : "💀 Game Over!"}
          message={
            win
              ? "You guessed the Pokémon correctly!"
              : `The Pokémon was ${currentPokemon.name}`
          }
          onPlayAgain={() => pickRandomPokemon(pokemonList)}
        />
      )}
    </div>
  </div>
);
}