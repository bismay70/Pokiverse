import React from "react";

const Footer = () => (
  <footer className="relative bg-gradient-to-r from-black via-red-950 to-red-800 text-white overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,0,0,0.15),_transparent_60%)] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-6 py-14">

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        <div>
          <h3 className="text-xl font-bold mb-4 text-red-400">
            About Pokiverse
          </h3>
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>🪢 Pokémon Hangman — classic word game with a Poké twist</li>
            <li>🧠 Memorite — sharpen your memory with Pokémon cards</li>
            <li>🍬 Candy Crush–style Pokémon puzzle fun</li>
            <li>⚡ Designed to challenge your mind & keep it fun</li>
          </ul>
        </div>

     
        <div className="flex flex-col items-center text-center gap-5">

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-red-800/40">
            <img
              src="/images/bismay.jpg"
              alt="Developer"
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-red-600"
            />
            <h3 className="font-semibold text-lg">Bismay Samal</h3>
            <p className="text-gray-300 text-sm mb-4">
              Full Stack Developer
            </p>

           
            <div className="flex justify-center gap-6">

            
              <a
                href="https://github.com/bismay70"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                GitHub
              </a>

              
              <a
                href="https://www.linkedin.com/in/bismay-samal-134b75312"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                LinkedIn
              </a>

            </div>
          </div>
        </div>

      
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
          <h3 className="text-xl font-bold text-red-400">
            Your Experience?
          </h3>

          <p className="text-gray-300">
            Loved the games?  
            Jump back in and catch the fun again!
          </p>

          <div className="flex items-center gap-2 text-red-400 font-semibold">
            <span>Play here</span>
            <span className="text-2xl">→</span>
          </div>

      
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Play Pokemon"
            className="w-32 h-32 object-contain opacity-90 hover:scale-105 transition animate-bounce"
          />
        </div>
      </div>

   
      <div className="mt-14 pt-4 border-t border-red-700/50 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 <span className="text-red-500 font-semibold">Pokiverse</span> • Made with ❤️ by <span className="text-white">bismay70</span>
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;
