
import React, { useState } from 'react';
import { Menu, X,  } from 'lucide-react';
import PokeCrush from './components/PokeCrush';
import Hangman from './components/Hangman'; 
import Memorite from './components/Memorite';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import Footer from './components/Footer'; 
import Clients from './components/clients';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Games from './components/games';
import Ludo from './components/ludo';


const App = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const navigation = [
    { name: 'Home', route: 'home' },
    { name: 'Games', route: 'games' },
    { name: 'About', route: 'about' }
  ];

  const games = [
    { name: 'Hangman', component: Hangman, color: 'blue',img:"/images/hangman.png",p:<p className="text-gray-300 mb-8">Classic pokemon name guessing game </p> },
    { name: 'PokeCrush', component: PokeCrush, color: 'purple',img:"/images/candy.jpeg",p: <p className="text-gray-300 mb-8">Match Pokemon in this exciting puzzle game!</p>},
    { name: 'Memorite', component: Memorite, color: 'green',img:"/images/ball.png" ,p: <p className="text-gray-300 mb-8">Challenge your memory with this engaging game!</p>},
    { name: 'Pokemon Ludo', component: Ludo, color: 'red', img: "/images/ludo.png", p: <p className="text-gray-300 mb-8">Play the classic Ludo game with a Pokemon twist!</p> }
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };



  const HomePage = () => (
    <Home setCurrentRoute={setCurrentRoute} />
  );

const GamesPage = () => {
  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return <GameComponent />;
  }

  return (
    <section className="w-full min-h-screen py-[150px] max-lg:py-[80px] bg-gradient-to-r from-black via-red-950 to-red-800 flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-[48px] items-center">
        <h1 className="text-white font-montserrat text-[8vw] font-black leading-none text-center">
          Choose Your Game
        </h1>

        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-8 w-full">
          {games.map((game) => (
            <div
              key={game.name}
              className="rounded-[32px] p-6 flex flex-col justify-between shadow-lg"
              style={{ backgroundColor: game.color === 'blue' ? '#8B0000' : game.color === 'purple' ? '#990000' : '#6B0F0F' }}
            >
           
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-montserrat font-bold text-[24px] text-white">
                  {game.name}
                </h1>
                <h3 className="font-montserrat font-bold text-[16px] text-white">
                  Pokemon Edition
                </h3>
              </div>

    
              <img
                src={game.img}
                alt={game.name}
                className="w-full h-32 object-contain my-4 image"
              />

              <div className="flex flex-col gap-4">
                <p className="text-white text-[18px]">{game.p.props.children}</p>
                <button
                  onClick={() => handleGameSelect(game)}
                  className="px-[24px] py-[10px] bg-black border-2 border-black rounded-[32px] text-[#bf4613] font-montserrat font-bold hover:bg-[#de7c7c] hover:text-black transition text-[16px] w-fit"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'games':
        return <GamesPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-red-950 to-red-800 flex flex-col">
      <Navbar
        navigation={navigation}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        setSelectedGame={setSelectedGame}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
