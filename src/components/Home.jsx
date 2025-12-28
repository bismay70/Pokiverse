import React from 'react';
import Hero from './Hero';
import Clients from './clients';
import Games from './games';

const Home = ({ setCurrentRoute }) => (
  <>
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Hero />
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
    {/* Render Games before Clients on the Home page */}
    <Games setCurrentRoute={setCurrentRoute} />
    <Clients setCurrentRoute={setCurrentRoute} />
  </>
);

export default Home;