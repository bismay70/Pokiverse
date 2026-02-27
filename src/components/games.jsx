import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Img1 from "/images/hangman.png";
import Img2 from "/images/memorite.png";
import Img3 from "/images/candy.png";

gsap.registerPlugin(ScrollTrigger);

const Game = ({ setCurrentRoute }) => {
  useGSAP(() => {
    gsap.from("#head", {
      scale: 1.3,
      scrollTrigger: {
        trigger: "#head",
        scrub: true,
      },
    });

    gsap.utils.toArray(".game-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        x: i % 2 === 0 ? -100 : 100,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    gsap.utils.toArray(".game-image").forEach((img) => {
      gsap.to(img, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  const games = [
    {
      id: 1,
      title: "Hangman",
      subtitle: "Pokemon Edition",
      imageSrc: "/images/hangman.png",
      content: "Guess the Pokémon before it's too late. Challenge your knowledge of the Pokedex in this classic word game.",
      route: "games",
      accent: "#ef4444"
    },
    {
      id: 2,
      title: "Memorite",
      subtitle: "Pokemon Edition",
      imageSrc: "/images/memorite.png",
      content: "Test your Pokémon memory skills! Match pairs of iconic Pokémon and climb the leaderboard.",
      route: "games",
      accent: "#3b82f6"
    },
    {
      id: 3,
      title: "PokeCrush",
      subtitle: "Pokemon Edition",
      imageSrc: "/images/candy.png",
      content: "Match & crush Pokémon candies in this addictive puzzle adventure. Unleash powerful combos!",
      route: "games",
      accent: "#a855f7"
    },
    {
      id: 4,
      title: "Pokemon Ludo",
      subtitle: "Pokemon Edition",
      imageSrc: "/images/ludo.png",
      content: "Play the classic Ludo game with a Pokemon twist! Choose your starter and race to the finish line.",
      route: "games",
      accent: "#eab308"
    },
  ];

  return (
    <section className="w-full min-h-screen py-[150px] max-lg:py-[80px] bg-gradient-to-r from-black via-red-950 to-red-800 flex justify-center items-center flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/30 blur-[150px] rounded-full"></div>
      </div>

      <div className="w-[1200px] max-xl:w-[90%] max-sm:w-[95%] flex flex-col gap-[100px] items-center relative z-10">
        <div className="text-center">
          <h1
            id="head"
            className="text-white font-montserrat text-[7vw] max-lg:text-[10vw] font-black leading-none tracking-tighter uppercase"
          >
            Level <span className="text-red-600">Up</span>
          </h1>
          <p className="text-white/60 font-montserrat text-xl max-sm:text-lg mt-4 font-medium tracking-widest uppercase">Select your next challenge</p>
        </div>

        <div className="flex flex-col gap-10 w-full">
          {games.map((game) => (
            <div
              key={game.id}
              className="game-card group relative w-full h-[350px] max-lg:h-auto rounded-[40px] overflow-hidden flex max-lg:flex-col bg-white/5 backdrop-blur-xl border border-white/10 hover:border-red-500/50 transition-all duration-500 shadow-2xl"
            >
              <div className="w-[40%] max-lg:w-full h-full relative overflow-hidden bg-black/40">
                <img
                  src={game.imageSrc}
                  alt={game.title}
                  className="game-image absolute inset-0 w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden"></div>
              </div>

              <div className="flex-1 p-12 max-sm:p-8 flex flex-col justify-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-red-600"></span>
                    <h3 className="text-red-500 font-montserrat font-bold text-sm tracking-[0.3em] uppercase">
                      {game.subtitle}
                    </h3>
                  </div>
                  <h2 className="text-white font-montserrat text-5xl max-sm:text-3xl font-black tracking-tighter">
                    {game.title}
                  </h2>
                </div>

                <p className="text-white/70 font-montserrat text-lg max-sm:text-base leading-relaxed max-w-xl">
                  {game.content}
                </p>

                <button
                  onClick={() => setCurrentRoute && setCurrentRoute(game.route)}
                  className="w-fit flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-montserrat font-black text-lg transition-all duration-300 hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 shadow-xl group/btn"
                >
                  PLAY NOW
                  <span className="transition-transform group-hover/btn:translate-x-2">→</span>
                </button>
              </div>

              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${game.accent}, transparent)` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Game;
