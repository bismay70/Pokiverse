import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({
  navigation,
  currentRoute,
  setCurrentRoute,
  setSelectedGame,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => (
  <>
    <nav className="bg-gradient-to-r from-black via-red-950 to-red-800 mx-4 mt-4 shadow-lg z-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img className="w-10 h-10 animate-bounce" src="/images/ball.png" alt="logo" />
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
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white hover:text-blue-400 p-2">
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
        <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-blue-400 p-2">
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

export default Navbar;