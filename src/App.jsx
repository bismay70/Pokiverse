
import React, { useState } from 'react';
import { Menu, X,  } from 'lucide-react';
import PokeCrush from './components/PokeCrush';
import Hangman from './components/Hangman'; 
import Memorite from './components/Memorite';
import Hero from './assets/Hero';
import AboutPage from './assets/AboutPage';
import Footer from './assets/Footer'; 


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
    { name: 'Memorite', component: Memorite, color: 'green',img:"/images/ball.png" ,p: <p className="text-gray-300 mb-8">Challenge your memory with this engaging game!</p>}
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };


  const Navbar = () => (
  <>
  
    <nav className="bg-gradient-to-r from-black via-red-950 to-red-800
  mx-4 mt-4 shadow-lg z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      
          <div className="flex items-center space-x-3">
            <img
              className="w-10 h-10 animate-bounce"
              src="/images/ball.png"
              alt="logo"
            />
            <span className="text-blue-700 font-bold text-2xl">Pokiverse</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.route}
                onClick={() => {
                  setCurrentRoute(item.route);
                  setSelectedGame(null);
                }}
                className={`text-white hover:text-blue-400 px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                  currentRoute === item.route ? 'text-blue-400' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

         
          <div className="md:hidden z-50">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-blue-400 p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </nav>


    <div
      className={`fixed top-0 right-0 h-full w-[70%] bg-gradient-to-r from-black via-red-950 to-red-800 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center space-x-2">
          <img className="w-8 h-8 animate-bounce" src="/images/ball.png" alt="logo" />
          <span className="text-blue-700 font-bold text-xl">Pokiverse</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-white hover:text-blue-400 p-2"
        >
          <X size={28} />
        </button>
      </div>

      <div className="flex flex-col space-y-6 px-6 mt-8">
        {navigation.map((item) => (
          <button
            key={item.route}
            onClick={() => {
              setCurrentRoute(item.route);
              setSelectedGame(null);
              setIsMobileMenuOpen(false);
            }}
            className={`text-white text-left text-lg font-semibold hover:text-blue-400 transition-colors ${
              currentRoute === item.route ? 'text-blue-400' : ''
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  </>
);



  const HomePage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Hero/>
      <p className="text-gray-300 text-xl md:text-2xl text-center max-w-2xl mb-12">
        Welcome to POKIVERSE! Explore my collection of fun and easy games.
      </p>
      <button
        onClick={() => setCurrentRoute('games')}
        className="bg-red-600 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
      >
        Start Playing
      </button>
    </div>
  );

  const GamesPage = () => {
    if (selectedGame) {
      const GameComponent = selectedGame.component;
      return <GameComponent />;
    }

    return (
      <div className="min-h-screen py-16 px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-12">Choose Your Game</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.name}
              className="bg-gradient-to-r from-red-950 via-red-900 to-red-800 rounded-lg p-8 text-center hover:transform hover:scale-105 transition-all cursor-pointer shadow-lg"
              onClick={() => handleGameSelect(game)}
            >
              <div className={`w-30 h-30 bg-${game.color}-500 rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                <img src={game.img} alt={game.name} className="w-20 h-20 object-contain" />

              </div>
              <h3 className="text-white text-2xl font-bold mb-4">{game.name}</h3>
              <p className="text-gray-300 mb-6">{game.p}</p>
              <button className=' text-white font-bold py-2 px-6 rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all transform hover:scale-105'>
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
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
  // bg-radial-[at_25%_25%] from-black to-blue-800 to-75%
  // bg-gradient-to-r from-red-500 via-gray-900 to-white

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-red-950 to-red-800
 flex flex-col">
      
      <Navbar />
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
     
      <Footer />
    </div>
  );
};

export default App;
