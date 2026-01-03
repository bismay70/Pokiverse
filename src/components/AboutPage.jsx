import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'  
gsap.registerPlugin(ScrollTrigger)  
    

const AboutPage = () => (
    <div className="min-h-screen py-16 px-4 font-shantell">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-8">About Pokiverse</h1>
        <div className="bg-gradient-to-r from-black via-red-950 to-red-800 rounded-lg p-8 shadow-lg">
          <p className="text-gray-300 text-lg mb-6">
            Pokiverse is a collection of engaging pokemon games designed to challenge your mind and provide endless entertainment.
          </p>
          <p className="text-gray-300 text-lg mb-6">
            From classic word games like Hangman to strategic puzzle games, I've got something for everyone.
          </p>
          <p className="text-gray-300 text-lg">
            Built with React , Pokiverse delivers smooth gameplay across all devices.
          </p>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[20px]">
          <div className="text-center bg-gradient-to-r from-gray-700 via-gray-900 to-red-500 shadow-md p-6 rounded-lg">
           <img className="animate-bounce" src="/images/pikachu.png" alt="" />
            <h3 className="text-xl font-semibold text-white">
            ⚡ Fast-Paced Fun
            </h3>
            <p className="text-white mt-2">
            Jump into rapid, addictive gameplay that keeps you hooked.
            </p>
          </div>

          <div className="text-center bg-gradient-to-r from-gray-700 via-gray-900 to-red-500 shadow-md p-6 rounded-lg">
           <img className="animate-bounce" src="/images/pikachu.png" alt="" />
            <h3 className="text-xl font-semibold text-white">
              🔥 For True Pokemon Fans
            </h3>
            <p className="text-white mt-2">
              Show love for Pokemons like never before.
            </p>
          </div>

          <div className="text-center bg-gradient-to-r from-gray-700 via-gray-900 to-red-500 shadow-md p-6 rounded-lg">
           <img className="animate-bounce" src="/images/pikachu.png" alt="" />
            <h3 className="text-xl font-semibold text-white">
              ❤️ Player Approved
            </h3>
            <p className="text-white mt-2">
             Simple. Fun. Loved by Pokefans across the board.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
export default AboutPage