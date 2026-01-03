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

    gsap.set(".image", { y: 30 });

    gsap.utils.toArray(".image").forEach((img) => {
      gsap.to(img, {
        y: -80,
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

  const ProjectContent = [
    {
      id: 1,
      title: "Hangman",
      subtitle: "Pokemon Edition",
      imageSrc: Img1,
      content: "Guess the Pokémon before it's too late",
      bgcolor: "#8B0000",
    },
    {
      id: 2,
      title: "Memorite",
      subtitle: "Pokemon Edition",
      imageSrc: Img2,
      content: "Test your Pokémon memory skills",
      bgcolor: "#990000",
    },
    {
      id: 3,
      title: "Candy Crush",
      subtitle: "Pokemon Edition",
      imageSrc: Img3,
      content: "Match & crush Pokémon candies",
      bgcolor: "#6B0F0F",
    },
  ];

  return (
    <section className="w-full min-h-screen py-[120px] max-lg:py-[50px] bg-gradient-to-r from-black via-red-950 to-red-800 flex justify-center items-center flex-col overflow-hidden">
      <div className="w-[90%] max-sm:w-[95%] flex flex-col gap-[48px] items-center">

        <h1
          id="head"
          className="text-white font-montserrat text-[8vw] font-black leading-none"
        >
          Our Games
        </h1>

        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6 w-full">
          {ProjectContent.map((project) => (
            <div
              key={project.id}
              className="rounded-[32px] p-6 max-sm:p-4 flex flex-col justify-between"
              style={{ backgroundColor: project.bgcolor }}
            >
              <div className="flex justify-between items-center">
                <h1 className="font-montserrat font-bold text-[24px] text-white">
                  {project.title}
                </h1>
                <h3 className="font-montserrat font-bold text-[16px] text-white">
                  {project.subtitle}
                </h3>
              </div>

              <img
                src={project.imageSrc}
                alt="Project"
                className="image object-contain my-4"
              />

              <div className="flex flex-col gap-4">
                <h1 className="text-[24px] font-bold font-montserrat text-white uppercase leading-tight">
                  {project.content}
                </h1>

                <button
                  onClick={() => setCurrentRoute && setCurrentRoute('games')}
                  className="px-[24px] py-[10px] bg-black border-2 border-black rounded-[32px] text-[#bf4613] font-montserrat font-bold hover:bg-[#de7c7c] hover:text-black transition text-[16px]"
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

export default Game;
