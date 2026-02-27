import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const AboutPage = () => {
  const pokedexRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".about-title", { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      delay: 0.2 
    })
    .from(".about-text", { 
      y: 30, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.1 
    }, "-=0.5")
    .from(".about-btn", { 
      scale: 0.8, 
      opacity: 0, 
      duration: 0.5 
    }, "-=0.3")
    .from(pokedexRef.current, { 
      x: 100, 
      rotate: 15, 
      opacity: 0, 
      duration: 1.2 
    }, "-=1");

    gsap.to(pokedexRef.current, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full min-h-screen pt-32 pb-20 bg-gradient-to-r from-black via-red-950 to-red-800 flex items-center justify-center overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-shantell">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h3 className="text-red-500 font-black tracking-[0.3em] uppercase text-sm border-l-4 border-red-600 pl-4">
              Join Us!
            </h3>
            <h1 className="about-title text-white text-7xl max-md:text-5xl font-black leading-[0.9] tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              ABOUT <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">POKIVERSE</span>
            </h1>
          </div>

          <div className="space-y-6 max-w-xl">
            <p className="about-text text-gray-400 text-xl max-md:text-lg leading-relaxed border-l border-white/10 pl-6">
              Pokiverse is a collection of engaging pokemon games designed to challenge your mind and provide endless entertainment.
            </p>
            <p className="about-text text-gray-400 text-xl max-md:text-lg leading-relaxed border-l border-white/10 pl-6">
              From classic word games like Hangman to strategic puzzle games, I've got something for everyone.
            </p>
            <p className="about-text text-gray-400 text-xl max-md:text-lg leading-relaxed border-l border-white/10 pl-6">
              Built with React, Pokiverse delivers smooth gameplay across all devices.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="about-btn px-10 py-5 cursor-pointer bg-[#8B0000] text-white font-black rounded-[20px] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,0,122,0.4)] active:scale-95 uppercase">
              Start Now
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-red-600/10 blur-[100px] rounded-full animate-pulse"></div>
          <img 
            ref={pokedexRef}
            src="/images/pokedex.png" 
            alt="Pokedex" 
            className="w-full max-w-[600px] drop-shadow-[0_0_50px_rgba(255,0,0,0.3)] relative z-10"
          />
          
          <div className="absolute -top-10 -right-10 w-20 h-20 border-2 border-white/10 rounded-full animate-ping opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-red-500/20 rounded-full animate-pulse opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
